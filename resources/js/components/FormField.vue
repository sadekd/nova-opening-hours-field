<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <week-table
                :week="week"
                :editable="true"
                @updateInterval="updateInterval"
                @addInterval="addInterval"
                @removeInterval="removeInterval"
                @removeAllIntervals="removeAllIntervals"
            />
            <exceptions-table
                v-if="field.allowExceptions"
                :exceptions="exceptions"
                :editable="true"
                @updateInterval="updateInterval"
                @addInterval="addInterval"
                @removeInterval="removeInterval"
                @addException="addException"
                @removeException="removeException"
                @renameException="renameException"
            />
        </template>
    </default-field>
</template>

<script>
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import WeekTable from "./OpeningHours/WeekTable";
import ExceptionsTable from "./OpeningHours/ExceptionsTable";
import {getFieldData, getRandomDate, getRandomTimeInterval} from "../func";

export default {
    components: {WeekTable, ExceptionsTable},

    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getFieldData(this.field.value),
        }
    },

    methods: {
        fill(formData) {
            formData.set(
                this.field.attribute,
                JSON.stringify({
                    ...this.week,
                    exceptions: this.exceptions,
                })
            )
        },

        updateInterval(weekOrExceptions, dayOrDate, index, value) {
            this[weekOrExceptions][dayOrDate][index] = value
            // this.$set(this[weekOrExceptions][dayOrDate], index, value)
        },

        removeInterval(weekOrExceptions, dayOrDate, index) {
            this[weekOrExceptions][dayOrDate].splice(index, 1)
        },

        addInterval(weekOrExceptions, dayOrDate) {
            this[weekOrExceptions][dayOrDate].push(getRandomTimeInterval())
        },

        removeAllIntervals(weekOrExceptions, dayOrDate) {
            this[weekOrExceptions][dayOrDate] = []
        },

        addException() {
            this.$set(this.exceptions, getRandomDate(), [getRandomTimeInterval()])
        },

        removeException(date) {
            this.$delete(this.exceptions, date)
        },

        renameException(oldDate, newDate) {
            let exception = this.exceptions[oldDate]

            this.$delete(this.exceptions, oldDate)
            this.$set(this.exceptions, newDate, exception)
        },
    },

    // watch: {
    //     week: {
    //         handler(value) {
    //             console.log('week data updated', value)
    //         },
    //         deep: true,
    //     },
    //     exceptions: {
    //         handler(value) {
    //             console.log('exceptions data updated', value)
    //         },
    //         deep: true,
    //     },
    // },

}
</script>
