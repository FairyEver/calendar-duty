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
  <van-calendar class="page-index" :formatter="formatter" v-bind="calendar"/>
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
    settingDisplay () {
      return this.$store.getters['SETTING'].DISPLAY
    },
    cache () {
      return this.$store.getters['CACHE_PLAN']
    }
  },
  methods: {
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
      if (this.settingDisplay.HIGHLIGHT_SHOW_SATURDAY && dayIsSaturday) {
        // 这天也是法定节假日 || 这天不是法定节假日 + 设置了高亮非法定节假日的周六
        if (dayIsHoliday || this.settingDisplay.HIGHLIGHT_SHOW_SATURDAY_NOT_HOLIDAY) {
          element.className = className
        }
      }
      // 周日
      else if (this.settingDisplay.HIGHLIGHT_SHOW_SUNDAY && dayIsSunday) {
        // 这天也是法定节假日 || 这天不是法定节假日 + 设置了高亮非法定节假日的周日
        if (dayIsHoliday || this.settingDisplay.HIGHLIGHT_SHOW_SUNDAY_NOT_HOLIDAY) {
          element.className = className
        }
      }
      // 法定节假日 日历中间的五列
      else if (this.settingDisplay.HIGHLIGHT_SHOW_HOLIDAY && dayIsHoliday) {
        element.className = className
      }
      return element
    }
  }
}
</script>
