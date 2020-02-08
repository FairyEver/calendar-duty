<style lang="scss">
.page-index {
  height: 100%;
  .van-calendar__header-title {
    display: none;
  }
  .is-holiday {
    background-color: rgba(#000, .03);
  }
}
</style>

<template>
  <van-calendar
    class="page-index"
    :formatter="formatter"
    v-bind="calendar"/>
</template>

<script>
import dayjs from 'dayjs'
import { isSaturday, isSunday, isHoliday } from '@/util/day.js'

const today = dayjs()

const start = today.startOf('year').toDate()
const end = today.endOf('year').toDate()

export default {
  name: 'page-index',
  data () {
    return {
      // 计划计算缓存
      cache: {},
      // 日历设置
      calendar: {
        poppable: false,
        showConfirm: false,
        defaultDate: today.toDate(),
        minDate: start,
        maxDate: end
      }
    }
  },
  computed: {
    settingCalendar () {
      return this.$store.getters['SETTING'].DISPLAY.CALENDAR
    }
  },
  created () {
    // 重新计算计划缓存
    this.recalculation()
  },
  methods: {
    /**
     * @description 重新计算计划缓存
     */
    recalculation () {
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
      this.$store.getters['SETTING'].PLAN.filter(e => e.ACTIVE).forEach(setting => {
        const day = dayjs(setting.START)
        const min = day.startOf('year')
        const max = day.endOf('year')
        comparison({ min, max, day, setting, next: 'add' })
        comparison({ min, max, day, setting, next: 'subtract' })
      })
      this.cache = result
    },
    formatter (element) {
      const day = dayjs(element.date)
      const formated = day.format('YYYY-MM-DD')
      const info = this.cache[formated]
      // [ 计划显示 ]
      if (info) {
        element.topInfo = info.top
        element.bottomInfo = info.bottom
      }
      // [ 假期突出显示 ]
      // function isSaturday
      // function isSunday
      // function isHoliday
      // - 突出周六
      // - HIGHLIGHT_SHOW_SATURDAY
      // - 突出非法定节假日的周六
      // - HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY
      // - 突出周日
      // - HIGHLIGHT_SHOW_SUNDAY
      // - 突出非法定节假日的周日
      // - HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY
      // - 突出法定节假日
      // - HIGHLIGHT_SHOW_HOLIDAY
      let highlight = false
      const className = 'is-holiday'
      const dayIsSaturday = isSaturday(day)
      const dayIsSunday = isSunday(day)
      const dayIsHoliday = isHoliday(day)
      // 周六
      if (this.settingCalendar.HIGHLIGHT_SHOW_SATURDAY && dayIsSaturday) {
        // 这天也是法定节假日 || 这天不是法定节假日 + 设置了高亮非法定节假日的周六
        if (dayIsHoliday || this.settingCalendar.HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY) {
          element.className = className
        }
      }
      // 周日
      else if (this.settingCalendar.HIGHLIGHT_SHOW_SUNDAY && dayIsSunday) {
        // 这天也是法定节假日 || 这天不是法定节假日 + 设置了高亮非法定节假日的周日
        if (dayIsHoliday || this.settingCalendar.HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY) {
          element.className = className
        }
      }
      // 法定节假日 日历中间的五列
      else if (this.settingCalendar.HIGHLIGHT_SHOW_HOLIDAY && dayIsHoliday) {
        element.className = className
      }
      return element
    }
  }
}
</script>
