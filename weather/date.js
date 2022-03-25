const formats = {
    HHMM: {timeStyle: "short"},
    MonthDay: {day: 'numeric', month: 'long'},
}

function getMillisecondsFromUnixTime(unixTime) {
    return unixTime * 1000
}

function getDateToTimeZone(date, timeZone) {
    const diffWithUTCTime = timeZone / 3600
    date.setHours((date.getUTCHours() + diffWithUTCTime) % 24)
    return date
}

function getFormatString(lang, format, date) {
    return new Intl.DateTimeFormat(lang, formats[format]).format(date)
}

export function getFormatDate(lang, format, unixTime, timeZone) {
    const milliseconds = getMillisecondsFromUnixTime(unixTime)
    let date = new Date(milliseconds)
    date = getDateToTimeZone(date, timeZone)

    const ansString =  getFormatString(lang, format, date)
    return ansString
}