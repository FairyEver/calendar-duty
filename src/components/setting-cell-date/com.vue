<template>
  <div class="setting-cell-date">
    <van-cell :title="title" :value="currentValue" @click="openCalendar"/>
    <!-- 这里的空 div 是为了解决下边框丢失问题 -->
    <div></div>
    <van-calendar
      ref="calendar"
      v-model="calendar.show"
      v-bind="calendar"
      :default-date="calendarDefaultDate"
      @confirm="onCalendarConfirm"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import settingCell from '@/mixin/setting-cell.js'

const today = dayjs()
const minDate = today.startOf('year').toDate()
const maxDate = today.endOf('year').toDate()

export default {
  name: 'setting-cell-date',
  mixins: [settingCell],
  data () {
    return {
      calendar: {
        show: false,
        minDate,
        maxDate
      },
      currentValue: ''
    }
  },
  computed: {
    calendarDefaultDate () {
      if (this.currentValue) return dayjs(this.currentValue).toDate()
      else return dayjs().toDate()
    }
  },
  methods: {
    /**
     * @description 打开日历
     */
    openCalendar () {
      this.calendar.show = true
      this.$nextTick(() => {
        this.resetCalendar()
      })
    },
    /**
     * @description 关闭日历
     */
    closeCalendar () {
      this.calendar.show = false
    },
    /**
     * @description 重置日历到默认日期
     */
    resetCalendar () {
      const calendar = this.$refs.calendar
      if (calendar) calendar.reset()
    },
    /**
     * @description 日历选择点击确定按钮
     */
    onCalendarConfirm (date) {
      const formated = dayjs(date).format('YYYY-MM-DD')
      this.currentValue = formated
      this.commit(this.currentValue)
      this.closeCalendar()
    }
  }
}
</script>
