<template>
    <panel-item :field="field">
        <template slot="value">
            <week-table :openingHours="openingHours" :editable="false"/>
        </template>
    </panel-item>
</template>

<script>
import WeekTable from "./WeekTable"
import {getOpeningHoursData} from "../func";

export default {
    components: {WeekTable},

    props: ['resource', 'resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value)
        }
    },
}
</script>
