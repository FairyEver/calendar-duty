import Dayjs from 'dayjs'
import ww from 'chinese-workday'
import zh from 'dayjs/locale/zh-cn'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
const customizedLocale = {
  ...zh,
  meridiem: (hour, minute, isLowercase) => hour > 12 ? '下午' : '上午'
}
Dayjs.locale(customizedLocale)
Dayjs.extend(LocalizedFormat)
Dayjs.extend(relativeTime)

export const dayjs = Dayjs

export function format (value, config = 'YYYY年M月D日') {
  let currentValue = value
  if (!dayjs.isDayjs(value)) {
    if (dayjs(value).isValid()) {
      currentValue = dayjs(value)
    } else {
      currentValue = {
        format () {
          return ''
        }
      }
    }
  }
  return currentValue.format(config)
}

/**
 * @description 判断是不是周六
 * @description 用于 EX_SAT
 * @param {Dayjs} day 日期
 * @returns {Boolean} is or not
 */
export function isSaturday (day) {
  return day.day() === 6
}

/**
 * @description 判断是不是周日
 * @description 用于 EX_SUN
 * @param {Dayjs} day 日期
 * @returns {Boolean} is or not
 */
export function isSunday (day) {
  return day.day() === 0
}

/**
 * @description 判断是不是工作日
 * @description EX_HOL
 * @param {Dayjs} day 日期
 * @returns {Boolean} is or not
 */
export function isHoliday (day) {
  return ww.isHoliday(day.format('YYYY-MM-DD'))
}

/**
 * @description 计算计划日期安排
 * @param {Object} config {Array} plan 计划任务
 * @param {Object} config {Dayjs} minDate 最小日期
 * @param {Object} config {Dayjs} maxDate 最大日期
 * @returns {Object} 日期安排
 */
export function recalculation ({
  plan = [],
  minDate,
  maxDate
}) {
  const result = {}
  /**
   * @description 判断日期是否需要排除
   * @param {Dayjs} day 日期
   * @param {Object} setting 设置
   * @returns {Boolean} is or not
   */
  function IS_EXCLUDE (day, setting = {}) {
    if (setting.EX_SAT && isSaturday(day)) return true
    if (setting.EX_SUN && isSunday(day)) return true
    if (setting.EX_HOL && isHoliday(day)) return true
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
    day,
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
      current[setting.P] = setting.NAME
      current[`${setting.P}-color`] = setting.C
      if (result[formated] === undefined) result[formated] = current
      else result[formated] = Object.assign({}, result[formated], current)
      previousMatchDistance = 1
    }
    else previousMatchDistance += 1
    // 判断是否还要继续递归
    if (next === 'add' && day.isAfter(maxDate, 'day')) return
    if (next === 'subtract' && day.isBefore(minDate, 'day')) return
    comparison({
      day: day[next](1, 'day'),
      next,
      previousMatchDistance,
      setting
    })
  }
  plan.filter(e => e.ACT).forEach(setting => {
    const day = dayjs(setting.DATE)
    comparison({ day, setting, next: 'add' })
    comparison({ day, setting, next: 'subtract' })
  })
  return result
}
