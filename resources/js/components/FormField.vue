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
                    <td v-else>{{ __('closed')}}</td>
                    <td>
                        <button class="btn btn-default btn-primary" @click.prevent="addInterval(dayNameAsKey)">+
                        </button>
                    </td>
                </tr>
            </table>
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
            // exceptions: {},
        }),

        created() {
            this.field.value = this.field.value || {}

            this.openingHours = {...EMPTY_WEEK, ..._.omit(this.field.value, 'exceptions')}
            // this.exceptions = this.field.value.exceptions || {}
        },

        methods: {
            fill(formData) {
                formData.set(
                    this.field.attribute,
                    JSON.stringify({
                        ...this.openingHours,
                        // exceptions: this.exceptions,
                    }))
            },

            addInterval(dayName) {
                this.openingHours[dayName].push("08:00-16:00")
            },

            removeInterval(dayName, index) {
                this.openingHours[dayName].splice(index, 1)
            },
        },
    }
</script>
