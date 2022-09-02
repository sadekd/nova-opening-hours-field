<template>
    <default-field :field="currentField" :errors="errors">
        <template #field>
<!--            <week-table :week="normalizedWeek"/>-->
            <week-table
                :week="normalizedWeek"
                :editable="true"
                :use-text-inputs="currentField.useTextInputs"
                @updateInterval="updateInterval"
                @addInterval="addInterval"
                @removeInterval="removeInterval"
                @removeAllIntervals="removeAllIntervals"
            />
<!--            <exceptions-table :exceptions="normalizedExceptions"/>-->
            <exceptions-table
                v-if="currentField.allowExceptions"
                :exceptions="normalizedExceptions"
                :editable="true"
                :use-text-inputs="currentField.useTextInputs"
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
import { DependentFormField, HandlesValidationErrors } from 'laravel-nova';
import WeekTable from "./../WeekTable";
import ExceptionsTable from "./../ExceptionsTable";
import {ExceptionsMixin, WeekMixin} from "../../src/mixins";
import {getRandomDate, getRandomTimeInterval} from "../../src/func";
export default {
    components: {WeekTable, ExceptionsTable},

    mixins: [DependentFormField, HandlesValidationErrors, WeekMixin, ExceptionsMixin],

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
            this[weekOrExceptions][dayOrDate][index] = value;
        },

        removeInterval(weekOrExceptions, dayOrDate, index) {
            this[weekOrExceptions][dayOrDate].splice(index, 1)
            this.$forceUpdate()
        },

        addInterval(weekOrExceptions, dayOrDate) {
            this[weekOrExceptions] = {
                ...this[weekOrExceptions],
                [dayOrDate]: [
                    ...this[weekOrExceptions][dayOrDate] || [],
                    getRandomTimeInterval()
                ],
            };
        },

        removeAllIntervals(weekOrExceptions, dayOrDate) {
            this[weekOrExceptions][dayOrDate] = []
        },

        addException() {
            this.exceptions[getRandomDate()] = [getRandomTimeInterval()];
        },

        removeException(date) {
            delete this.exceptions[date];
        },

        renameException(oldDate, newDate) {
            let exception = this.exceptions[oldDate]

            // this.$delete(this.exceptions, oldDate)
            delete this.exceptions[oldDate]
            this.exceptions[newDate] = exception;
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
