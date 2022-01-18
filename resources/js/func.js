import {EMPTY_WEEK} from "./const";

export function getFieldData(openingHoursData) {
    return {
        week: getWeekData(openingHoursData),
        exceptions: getExceptionsData(openingHoursData),
    }
}

export function getWeekData(openingHoursData) {
    return {
        ...EMPTY_WEEK,
        ..._.pick(openingHoursData, Object.keys(EMPTY_WEEK)),
    }
}

function getExceptionsData(openingHoursData) {
    return openingHoursData && openingHoursData['exceptions']
        ? Object.keys(openingHoursData['exceptions']).length ? openingHoursData['exceptions'] : {}
        : {}
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}

export function getTodayDate() {
    return sliceDate(new Date())
}

function sliceDate(date) {
    return date.toISOString().slice(0, 10)
}

export function getRandomDate() {
    let date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * 365))

    return sliceDate(date)
}

export function getRandomTimeInterval() {
    let fromHour = Math.floor(Math.random() * 24)   // 0-23
    let toHour = fromHour + Math.floor(Math.random() * (24 - fromHour))

    let padZeroFn = _hour => _hour.toString().padStart(2, '0')  // prepend 0, if needed

    return padZeroFn(fromHour) + ':00-' + padZeroFn(toHour) + ':00'
}
