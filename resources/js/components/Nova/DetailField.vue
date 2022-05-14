<template>
    <panel-item :field="field">
        <template #value>
            <week-table :week="normalizedWeek"/>
            <exceptions-table v-if="showExceptionsTable" :exceptions="normalizedExceptions"/>
        </template>
    </panel-item>
</template>

<script>
import WeekTable from "../WeekTable";
import ExceptionsTable from "../ExceptionsTable";
import {ExceptionsMixin, WeekMixin} from "../../src/mixins";

export default {
    components: {WeekTable, ExceptionsTable},

    mixins: [WeekMixin, ExceptionsMixin],

    props: ['resource', 'resourceName', 'resourceId', 'field'],

    computed: {
        showExceptionsTable() {
            return this.field.allowExceptions
                && Object.keys(this.normalizedExceptions).length
        },
    },
}
</script>
