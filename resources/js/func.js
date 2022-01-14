import {EMPTY_WEEK, WEEK_DAYS} from "./const";

export function getOpeningHoursData(openingHoursData) {
    return {
        openingHours: {
            ...EMPTY_WEEK,
            ..._.pick(openingHoursData, WEEK_DAYS),
        }
    }
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}
