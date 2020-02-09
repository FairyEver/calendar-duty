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
import { isSaturday, isSunday, isHoliday, recalculation } from '@/util/time.js'

const today = dayjs()

// 日历显示需要
// 计算计划安排需要
const minDate = today.startOf('year').toDate()
const maxDate = today.endOf('year').toDate()

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
        minDate: minDate,
        maxDate: maxDate
      }
    }
  },
  computed: {
    settingCalendar () {
      return this.$store.getters['SETTING'].DISPLAY.CALENDAR
    }
  },
  created () {
    // 计算计划日期安排到缓存
    this.cache = recalculation({
      plan: this.$store.getters['SETTING'].PLAN,
      minDate: minDate,
      maxDate: maxDate
    })
  },
  methods: {
    /**
     * @description 日历组件的格式化方法
     */
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
