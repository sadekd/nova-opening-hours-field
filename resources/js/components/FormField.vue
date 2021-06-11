<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <table class="openingHours table w-full">
                <tr v-for="(intervals, dayNameAsKey) in openingHours">
                    <td>{{ __(dayNameAsKey) }}</td>
                    <td v-if="intervals.length">
                        <div v-for="(interval, intervalIndex) in intervals" class="interval">
                            <input class="form-control form-input form-input-bordered"
                                   v-model="openingHours[dayNameAsKey][intervalIndex]"
                                   pattern="^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])-(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$"
                                   required
                            >
                            <button class="btn btn-default btn-danger"
                                    @click.prevent="removeInterval(dayNameAsKey, intervalIndex)">-
                            </button>
                        </div>

                    </td>
                    <td v-else>{{ __('closed') }}</td>
                    <td>
                        <button class="btn btn-default btn-primary" @click.prevent="addInterval(dayNameAsKey)">+
                        </button>
                    </td>
                </tr>
                <tr class="exceptions">
                    <td class="align-text-top pt-3">
                        <p >{{ __('Exceptions') }}</p>
                    </td>
                    <td>
                        <div v-if="Object.keys(exceptions).length">

                            <table v-for="(exceptionIntervals, exceptionDateAsKey) in exceptions"
                                   :key="'exceptions' + exceptionDateAsKey" class="exceptions">
                                <tr>
                                    <td class="border-t-0">
                                        <p>{{ exceptionDateAsKey }}</p>
                                    </td>
                                    <td>
                                        <button class="btn btn-default btn-primary" title="Add exception interval"
                                                @click.prevent="addExceptionInterval(exceptionDateAsKey)">+
                                        </button>
                                        <button class="btn btn-default btn-danger" title="Remove exception"
                                                @click.prevent="removeExceptionDate(exceptionDateAsKey)">
                                            -
                                        </button>
                                    </td>
                                </tr>
                                <tr v-for="(exceptionInterval, exceptionIntervalIndex) in exceptionIntervals"
                                    :key="exceptionDateAsKey + exceptions[exceptionDateAsKey].length">
                                    <td>
                                        <input class="form-control form-input form-input-bordered"
                                               v-model="exceptions[exceptionDateAsKey][exceptionIntervalIndex]"
                                               pattern="^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])-(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$"
                                               required
                                        >
                                    </td>
                                    <td>
                                        <button class="btn btn-default btn-danger" title="Remove exception interval"
                                                @click.prevent="removeExceptionInterval(exceptionDateAsKey, exceptionIntervalIndex)">
                                            -
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-default btn-primary" @click.prevent="toggleExceptionDateModal()">+
                        </button>
                    </td>
                </tr>
            </table>
            <transition name="fade">
                <modal v-if="exceptionDateModal">
                    <form class="bg-white rounded-lg shadow-lg overflow-hidden" style="min-width: 24rem"
                          @submit.prevent="addExceptionDate(newExceptionDate)">
                        <div class="px-6 py-3">
                            <p class="text-2xl text-center pb-4">Add new exception date</p>
                            <date-time-picker
                                class="w-full form-control form-input form-input-bordered"
                                :value="newExceptionDate"
                                :placeholder="newExceptionDate"
                                date-format="Y-m-d"
                                alt-ormat="Y-m-d"
                                :enable-time="false"
                                :enable-seconds="false"
                                :first-day-of-week="1"
                                @change="handleExceptionDateChange"
                            />
                        </div>
                        <div class="btn-wrapper bg-30 px-6 py-3 text-right">
                            <button @click.prevent="toggleExceptionDateModal()" type="button"
                                    class="btn text-80 font-normal h-9 px-3 btn-link">
                                {{ __('Cancel') }}
                            </button>
                            <button :disabled="newExceptionDate === null" type="submit"
                                    class="btn btn-default btn-primary ml-3">{{
                                    __('Save')
                                }}
                            </button>
                        </div>
                    </form>
                </modal>
            </transition>
        </template>
    </default-field>
</template>

<script>
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import {EMPTY_WEEK} from "../const";

export default {

    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: () => ({
        openingHours: {},
        exceptions: {},
        exceptionDateModal: false,
        exceptionDatePlaceholder: moment().format('YYYY-MM-DD'),
        newExceptionDate: null,
    }),

    created() {
        this.field.value = this.field.value || {}

        this.openingHours = {...EMPTY_WEEK, ..._.omit(this.field.value, 'exceptions')}
        this.exceptions = this.field.value.exceptions || {}
    },

    computed: {
        exceptionDates: () => {
            return this.exceptions.filter(()=> {return true})
        }
    },

    methods: {
        fill(formData) {
            formData.set(
                this.field.attribute,
                JSON.stringify({
                    ...this.openingHours,
                    exceptions: this.exceptions,
                }))
        },

        addInterval(dayName) {
            this.openingHours[dayName].push("08:00-16:00")
        },

        removeInterval(dayName, index) {
            this.openingHours[dayName].splice(index, 1)
        },

        toggleExceptionDateModal() {
            this.exceptionDateModal = !this.exceptionDateModal
        },

        handleExceptionDateChange(date) {
            console.log(date)
            this.newExceptionDate = date
        },

        addExceptionDate(date) {
            if (!this.exceptions[date]) {
                this.$set(this.exceptions, date, [])
            }
            this.exceptionDateModal = false;
        },

        removeExceptionDate(date) {
            if (this.exceptions[date]) {
                this.$delete(this.exceptions, date)
            }
        },

        addExceptionInterval(date) {
            let intervals = this.exceptions[date];
            intervals.push("10:00-13:00")
            this.$set(this.exceptions, date, intervals)
        },

        removeExceptionInterval(date, index) {
            let intervals = this.exceptions[date];
            intervals.splice(index, 1)
            this.$set(this.exceptions, date, intervals)
        },
    },
}
</script>

<style scoped>
table.exceptions td {
    border-top-width: 0 !important;
}
.align-text-top{
    vertical-align: text-top !important;
}
</style>
