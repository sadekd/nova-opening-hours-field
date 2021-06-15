<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <week-table :openingHours="openingHours" :editable="true"/>
        </template>
    </default-field>
</template>

<script>
import {FormField, HandlesValidationErrors} from 'laravel-nova'
import WeekTable from "./WeekTable"
import {getOpeningHoursData} from "../func";

export default {
    components: {WeekTable},

    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value)
        }
    },

    methods: {
        fill(formData) {
            formData.set(
                this.field.attribute,
                JSON.stringify({
                    ...this.openingHours,
                    // exceptions: this.exceptions,
                })
            )
        },
    },
}
</script>
