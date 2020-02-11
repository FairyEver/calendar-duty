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
    :row-height="70"
    :safe-area-inset-bottom="false"
    :min-date="minDate"
    :max-date="maxDate"
    v-bind="calendar"/>
</template>

<script>
import dayjs from 'dayjs'
import { isSaturday, isSunday, isHoliday, recalculation } from '@/util/time.js'

const today = dayjs()

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
        defaultDate: today.toDate()
      }
    }
  },
  computed: {
    setting () {
      return this.$store.getters['SETTING'].DISPLAY.CALENDAR
    },
    minDate () {
      if (this.$store.getters['SETTING'].START_FROM_CURRENT_MONTH) {
        return today.startOf('month').toDate()
      }
      return today.startOf('year').toDate()
    },
    maxDate () {
      if (this.$store.getters['SETTING'].END_AT_CURRENT_MONTH) {
        return today.endOf('month').toDate()
      }
      return today.endOf('year').toDate()
    }
  },
  created () {
    // 计算计划日期安排到缓存
    this.cache = recalculation({
      plan: this.$store.getters['SETTING'].PLAN,
      minDate: this.minDate,
      maxDate: this.maxDate
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
      let classNameArray = []
      // [ 计划显示 ]
      if (info) {
        if (info.top) {
          element.topInfo = info.top
          classNameArray.push(`is-top-${info['top-color']}`)
        }
        if (info.bottom) {
          element.bottomInfo = info.bottom
          classNameArray.push(`is-bottom-${info['bottom-color']}`)
        }
      }
      // [ 今天 ]
      if (today.isSame(day, 'date')) {
        classNameArray.push('is-today')
      }
      // [ 假期突出显示 ]
      let highlight = false
      const className = 'is-holiday'
      const dayIsSaturday = isSaturday(day)
      const dayIsSunday = isSunday(day)
      const dayIsHoliday = isHoliday(day)
      // (高亮周六 && 是周六) && (是法定节假日 || 不是法定节假日 + 高亮非法定节假日周六)
      if ((this.setting.HL_SAT && dayIsSaturday) && (dayIsHoliday || this.setting.HL_SAT_N_H)) {
        classNameArray.push('is-holiday')
        element.className = classNameArray.join(' ')
      }
      // (高亮周日 && 是周日) && (是法定节假日 || 不是法定节假日 + 高亮非法定节假日周日)
      else if ((this.setting.HL_SUN && dayIsSunday) && (dayIsHoliday || this.setting.HL_SUN_N_H)) {
        classNameArray.push('is-holiday')
        element.className = classNameArray.join(' ')
      }
      // 高亮法定节假日 && 是法定节假日
      else if (this.setting.HL_HOL && dayIsHoliday) {
        classNameArray.push('is-holiday')
        element.className = classNameArray.join(' ')
      }
      else {
        element.className = classNameArray.join(' ')
      }
      return element
    }
  }
}
</script>
