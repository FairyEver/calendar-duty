import dayjs from 'dayjs'
import ww from 'chinese-workday'

/**
 * @description 判断是不是周六
 * @description 用于 EXCLUDE_SATURDAY
 * @param {Dayjs} day 日期
 * @returns {Boolean} is or not
 */
export function isSaturday (day) {
  return day.day() === 6
}

/**
 * @description 判断是不是周日
 * @description 用于 EXCLUDE_SUNDAY
 * @param {Dayjs} day 日期
 * @returns {Boolean} is or not
 */
export function isSunday (day) {
  return day.day() === 0
}

/**
 * @description 判断是不是工作日
 * @description EXCLUDE_HOLIDAY
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
      current[setting.POSITION] = setting.TITLE
      if (result[formated] === undefined) result[formated] = current
      else result[formated] = Object.assign({}, result[formated], current)
      previousMatchDistance = 1
    }
    else previousMatchDistance += 1
    // 判断是否还要继续递归
    if (next === 'add' && day.isSame(maxDate, 'day')) return
    if (next === 'subtract' && day.isSame(minDate, 'day')) return
    comparison({
      day: day[next](1, 'day'),
      next,
      previousMatchDistance,
      setting
    })
  }
  plan.filter(e => e.ACTIVE).forEach(setting => {
    const day = dayjs(setting.START)
    comparison({ day, setting, next: 'add' })
    comparison({ day, setting, next: 'subtract' })
  })
  return result
}
