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
