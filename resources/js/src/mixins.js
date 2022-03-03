import {getExceptionsData, getWeekData, randomString} from "./func";

export var WeekMixin = {
    data: function () {
        return {
            week: getWeekData(this.field.value),
        }
    },
    computed: {
        normalizedWeek() {
            let res = []
            for (let [day, intervals] of Object.entries(this.week)) {
                res.push({
                    day: day,
                    intervals: normalizeIntervals(intervals),
                })
            }

            return res
        },
    },
}

export var ExceptionsMixin = {
    data: function () {
        return {
            exceptions: getExceptionsData(this.field.value),
        }
    },
    computed: {
        normalizedExceptions() {
            let res = []
            for (let [date, intervals] of Object.entries(this.exceptions)) {
                res.push({
                    date: date,
                    intervals: intervals,
                })
            }

            return res
        },
    },
}

function normalizeIntervals(intervals) {
    let res = []

    for (let [index, interval] of Object.entries(intervals)) {
        res.push({
            key: randomString(),
            interval: interval,
        })
    }

    return res
}
