<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <table class="openingHours table w-full">
                <tr v-for="(intervals, dayNameIndex) in openingHours">
                    <td>{{ dayNameIndex }}</td>
                    <td>
                        <div v-for="(interval, intervalIndex) in intervals" class="interval">
                            <input class="form-control form-input form-input-bordered" v-model="openingHours[dayNameIndex][intervalIndex]">
                            <!--<input class="form-control form-input form-input-bordered" type="time">-->
                            <!-- - -->
                            <!--<input class="form-control form-input form-input-bordered" type="time">-->
                            <button class="btn btn-default btn-danger" @click.prevent="removeInterval(dayNameIndex, intervalIndex)">-
                            </button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-default btn-primary" @click.prevent="addInterval(dayNameIndex)">+
                        </button>
                    </td>
                </tr>
            </table>
        </template>
    </default-field>
</template>

<script>
    import {FormField, HandlesValidationErrors} from 'laravel-nova'
    import {WEEKDAYS} from "../const";
    import * as _ from "lodash";

    export default {
        mixins: [FormField, HandlesValidationErrors],

        data: () => ({
            openingHours: [],
            exceptions: [],
            weekDays: WEEKDAYS
        }),

        props: ['resourceName', 'resourceId', 'field'],

        methods: {
            /*
             * Set the initial, internal value for the field.
             */
            setInitialValue() {
                this.value = this.field.value || []

                // console.log(this.field.value.(word => word.length > 6));

                this.openingHours = _.omit(this.value, ['exceptions'])
                this.exceptions = _.pick(this.value, ['exceptions'])

                // console.log(this)
            },

            /**
             * Fill the given FormData object with the field's internal value.
             */
            fill(formData) {
                // formData.append(this.field.attribute, this.value || [])
                formData.append(
                    this.field.attribute,
                    JSON.stringify({
                        ...this.openingHours,
                        exceptions: this.exceptions,
                    }) || [])
            },

            /**
             * Update the field's internal value.
             */
            handleChange(value) {
                this.value = value
            },

            addInterval(dayName) {
                this.openingHours[dayName.toLowerCase()].push("08:00-16:00")
                // this.handleChange(this.value)
            },

            removeInterval(dayName, index) {
                this.openingHours[dayName.toLowerCase()].splice(index, 1)
            },

            // changeInterval(dayName, index, value) {
            //     this.openingHours[dayName.toLowerCase()][index] = value;
            // }
        },
    }
</script>
