import {EMPTY_WEEK} from "./const";
import pick from 'lodash/pick';

export function getWeekData(openingHoursData) {
    return {
        ...EMPTY_WEEK,
        ...pick(openingHoursData, Object.keys(EMPTY_WEEK)),
    }
}

export function getExceptionsData(openingHoursData) {
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

// function getRandomTime() {
//     let hour = Math.floor(Math.random() * 24)
//     let min = 0
//
//     return padStartZero(hour) + ':' + padStartZero(min)
// }

function padStartZero(value) {
    return value.toString().padStart(2, '0')
}

export function getRandomTimeInterval() {
    let fromHour = Math.floor(Math.random() * 24)   // 0-23
    let toHour = fromHour + Math.floor(Math.random() * (24 - fromHour))

    return padStartZero(fromHour) + ':00-' + padStartZero(toHour) + ':00'
}

export function randomString() {
    return Math.random().toString(36).substr(2, 5)
}
