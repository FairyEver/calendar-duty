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

console.log(today.utcOffset())

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
    setting () {
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
      let highlight = false
      const className = 'is-holiday'
      const dayIsSaturday = isSaturday(day)
      const dayIsSunday = isSunday(day)
      const dayIsHoliday = isHoliday(day)
      // (高亮周六 && 是周六) && (是法定节假日 || 不是法定节假日 + 高亮非法定节假日周六)
      if ((this.setting.HL_SATURDAY && dayIsSaturday) && (dayIsHoliday || this.setting.HL_SATURDAY_N_H)) {
        element.className = className
      }
      // (高亮周日 && 是周日) && (是法定节假日 || 不是法定节假日 + 高亮非法定节假日周日)
      else if ((this.setting.HL_SUNDAY && dayIsSunday) && (dayIsHoliday || this.setting.HL_SUNDAY_N_H)) {
        element.className = className
      }
      // 高亮法定节假日 && 是法定节假日
      else if (this.setting.HL_HOLIDAY && dayIsHoliday) {
        element.className = className
      }
      return element
    }
  }
}
</script>
