<template>
    <table class="openingHours weekTable table w-full">
        <tr v-for="(intervals, dayName) in openingHours">
            <td>{{ translateDayName(dayName) }}</td>
            <td>
                <div v-if="openingHours[dayName].length">
                    <div v-for="(interval, intervalIndex) in intervals" class="interval">
                        <div v-if="editable">
                            <input class="form-control form-input form-input-bordered"
                                   v-model="openingHours[dayName][intervalIndex]"
                                   pattern="^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])-(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$"
                                   required
                            >
                            <button class="btn btn-default btn-danger" @click.prevent="removeInterval(dayName, intervalIndex)">-</button>
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="addInterval(dayName)">+</button>
            </td>
        </tr>
    </table>
</template>

<script>
import {capitalizeFirstLetter} from "../func";

export default {
    props: ['openingHours', 'editable'],

    methods: {
        translateDayName(dayName) {
            return this.__(capitalizeFirstLetter(dayName))
        },

        addInterval(dayName) {
            let openingHoursForDay = this.openingHours[dayName] || []
            openingHoursForDay.push("08:00-16:00")

            this.openingHours[dayName] = openingHoursForDay
        },

        removeInterval(dayName, index) {
            this.openingHours[dayName].splice(index, 1)
        },
    }
}
</script>
