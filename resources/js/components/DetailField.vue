<template>
    <panel-item :field="field">
        <template slot="value">
            <week-table :week="week"/>
            <exceptions-table v-if="field.allowExceptions && Object.keys(exceptions).length" :exceptions="exceptions"/>
        </template>
    </panel-item>
</template>

<script>
import WeekTable from "./OpeningHours/WeekTable";
import ExceptionsTable from "./OpeningHours/ExceptionsTable";
import {getFieldData} from "../func";

export default {
    components: {WeekTable, ExceptionsTable},

    props: ['resource', 'resourceName', 'resourceId', 'field'],

    data: function () {
        return {
            ...getFieldData(this.field.value),
        }
    },
}
</script>
