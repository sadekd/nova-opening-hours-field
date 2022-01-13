<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
            <week-table :openingHours="openingHours" :editable="true" :randomIdentifier="field.randomIdentifier"/>
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

    computed: {
        filteredOpeningHours() {
            return Object.entries(this.openingHours)
        }
    },

    created() {
        console.log(this.filteredOpeningHours)
    },

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value, this.field.randomIdentifier)
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
