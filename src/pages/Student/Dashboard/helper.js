export function getCurrentWeek(statusName) {
  var dt = new Date() //current date of week
  var currentWeekDay = dt.getDay()
  var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1
  var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays))
  var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))

  let currentWeek = {
    dateFrom: `${wkStart.getUTCFullYear()}-${wkStart.getUTCMonth() + 1}-${wkStart.getUTCDate()}`,
    dateTo: `${wkEnd.getUTCFullYear()}-${wkEnd.getUTCMonth() + 1}-${wkEnd.getUTCDate()}`,
    statusName: statusName,
  }

  return currentWeek
}
