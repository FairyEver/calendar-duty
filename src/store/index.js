// https://github.com/yize/chinese-workday

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import dayjs from 'dayjs'
import { isSaturday, isSunday, isHoliday } from '@/util/day.js'
import { set } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  state: {
    SETTING: {
      PLAN: [
        {
          ACTIVE: true,
          TITLE: '上班',
          START: '2020-02-11',
          INTERVAL: 6,
          POSITION: 'top',
          EXCLUDE_SATURDAY: false,
          EXCLUDE_SUNDAY: false,
          EXCLUDE_HOLIDAY: true
        },
        {
          ACTIVE: true,
          TITLE: '执勤',
          START: '2020-02-12',
          INTERVAL: 6,
          POSITION: 'bottom',
          EXCLUDE_SATURDAY: false,
          EXCLUDE_SUNDAY: false,
          EXCLUDE_HOLIDAY: false
        }
      ],
      DISPLAY: {
        // 突出周六
        HIGHLIGHT_SHOW_SATURDAY: true,
        // 突出非法定节假日的周六
        HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY: false,
        // 突出周日
        HIGHLIGHT_SHOW_SUNDAY: true,
        // 突出非法定节假日的周日
        HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY: false,
        // 突出法定节假日
        HIGHLIGHT_SHOW_HOLIDAY: true
      }
    },
    // 任务计算结果
    CACHE_PLAN: {}
  },
  getters: {
    /**
     * @description 设置中的日期计划
     * @example $store.getters['SETTING']
     * @example this.$store.getters['SETTING']
     */
    SETTING (state, getters, rootState, rootGetters) {
      return state.SETTING
    },
    /**
     * @description 计算完的日期安排
     * @example $store.getters['CACHE_PLAN']
     * @example this.$store.getters['CACHE_PLAN']
     */
    CACHE_PLAN (state, getters, rootState, rootGetters) {
      return state.CACHE_PLAN
    }
  },
  mutations: {
    /**
     * @description 设置计算缓存
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('SET_CACHE_PLAN')
     * @example this.$store.commit('SET_CACHE_PLAN')
     */
    SET_CACHE_PLAN (state, payload) {
      state.CACHE_PLAN = payload
    },
    /**
     * @description 设置显示设置
     * @param {Object} state state
     * @param {Any} payload payload
     * @example $store.commit('SET_SETTING')
     * @example this.$store.commit('SET_SETTING')
     */
    SET_SETTING (state, {
      path = '',
      value = ''
    }) {
      set(state.SETTING, path, value)
    }
  },
  actions: {
    /**
     * @description 重新计算日期设置
     * @param {Object} context context
     * @param {Any} payload payload
     * @example $store.dispatch('RECALCULATION')
     * @example this.$store.dispatch('RECALCULATION')
     */
    async RECALCULATION ({ state, rootState, commit, dispatch, getters, rootGetters }) {
      const result = {}
      /**
       * @description 判断日期是否需要排除
       * @param {Dayjs} day 日期
       * @param {Object} setting 设置
       * @returns {Boolean} is or not
       */
      function IS_EXCLUDE (day, setting = {}) {
        if (setting.EXCLUDE_SATURDAY && isSaturday(day)) return true
        if (setting.EXCLUDE_SUNDAY && isSunday(day)) return true
        if (setting.EXCLUDE_HOLIDAY && isHoliday(day)) return true
        return false
      }
      /**
       * @description 计算一个日期
       * @param {Object} param {Dayjs} min 最小日期
       * @param {Object} param {Dayjs} max 最大日期
       * @param {Object} param {Dayjs} day 当前日期
       * @param {Object} param {String} next 下一个日期相差 add:下一天 subtract:上一天
       * @param {Object} param {Number} previousMatchDistance 距离上一个匹配的日期多少天
       * @param {Object} param {Object} setting 设置
       */
      function comparison ({
        min = undefined,
        max = undefined,
        day = undefined,
        next = 'add',
        previousMatchDistance = 0,
        setting = {}
      }) {
        const formated = day.format('YYYY-MM-DD')
        // 只计算工作日
        // 今天是工作日
        if (IS_EXCLUDE(day, setting)) {}
        else if (previousMatchDistance === 0 || previousMatchDistance === setting.INTERVAL) {
          let current = {}
          current[setting.POSITION] = setting.TITLE
          if (result[formated] === undefined) result[formated] = current
          else result[formated] = Object.assign({}, result[formated], current)
          previousMatchDistance = 1
        }
        else previousMatchDistance += 1
        // 判断是否还要继续递归
        if (next === 'add' && day.isSame(max, 'day')) return
        if (next === 'subtract' && day.isSame(min, 'day')) return
        comparison({
          min,
          max,
          day: day[next](1, 'day'),
          next,
          previousMatchDistance,
          setting
        })
      }
      getters.SETTING.PLAN.filter(e => e.ACTIVE).forEach(setting => {
        const day = dayjs(setting.START)
        const min = day.startOf('year')
        const max = day.endOf('year')
        comparison({ min, max, day, setting, next: 'add' })
        comparison({ min, max, day, setting, next: 'subtract' })
      })
      commit('SET_CACHE_PLAN', result)
    }
  },
  modules: {
  }
})
