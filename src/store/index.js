// https://github.com/yize/chinese-workday

import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { set } from 'lodash'

Vue.use(Vuex)

// SUN = SUNDAY
// SAT = SATURDAY
// HOL = HOLIDAY

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  state: {
    SETTING: {
      // 日历从当前月开始
      START_FROM_CURRENT_MONTH: true,
      // 日历结束于当前月
      END_AT_CURRENT_MONTH: false,
      // EX = EXCLUDE
      PLAN: [
        {
          ACT: true,
          NAME: '上班',
          DATE: '2020-02-11',
          INTERVAL: 6,
          P: 'top',
          C: 'red',
          EX_SAT: false,
          EX_SUN: false,
          EX_HOL: true
        },
        {
          ACT: true,
          NAME: '执勤',
          DATE: '2020-02-12',
          INTERVAL: 6,
          P: 'bottom',
          C: 'blue',
          EX_SAT: false,
          EX_SUN: false,
          EX_HOL: false
        }
      ],
      DISPLAY: {
        // HL = HIGHLIGHT_SHOW 高亮显示
        // N_H = NOT_HOL 非法定节假日
        CALENDAR: {
          // 突出周六
          HL_SAT: false,
          // 突出非法定节假日的周六
          HL_SAT_N_H: false,
          // 突出周日
          HL_SUN: false,
          // 突出非法定节假日的周日
          HL_SUN_N_H: false,
          // 突出法定节假日
          HL_HOL: true
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
