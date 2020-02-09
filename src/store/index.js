// https://github.com/yize/chinese-workday

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import dayjs from 'dayjs'
import { isSaturday, isSunday, isHoliday } from '@/util/time.js'
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
        CALENDAR: {
          // 突出周六
          HIGHLIGHT_SHOW_SATURDAY: false,
          // 突出非法定节假日的周六
          HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY: false,
          // 突出周日
          HIGHLIGHT_SHOW_SUNDAY: false,
          // 突出非法定节假日的周日
          HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY: false,
          // 突出法定节假日
          HIGHLIGHT_SHOW_HOLIDAY: true
        }
      }
    }
  },
  getters: {
    /**
     * @description 设置中的日期计划
     * @example $store.getters['SETTING']
     * @example this.$store.getters['SETTING']
     */
    SETTING (state, getters, rootState, rootGetters) {
      return state.SETTING
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
     * @description description
     * @param {Object} context context
     * @param {Any} payload payload
     * @example $store.dispatch('NAME')
     * @example this.$store.dispatch('NAME')
     */
    // async NAME ({ state, rootState, commit, dispatch, getters, rootGetters }) {
    // }
  },
  modules: {
  }
})
