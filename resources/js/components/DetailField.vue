<template>
    <panel-item :field="field">
        <template slot="value">
            <table class="table w-full">
                <tr v-for="(intervals, dayNameAsKey) in openingHours">
                    <td>{{ __(dayNameAsKey) }}</td>
                    <td v-if="intervals.length">{{ intervals.join(', ') }}</td>
                    <td v-else>{{ __('closed')}}</td>
                </tr>
            </table>
        </template>
    </panel-item>
</template>

<script>
    import {EMPTY_WEEK} from "../const";

    export default {

        props: ['resource', 'resourceName', 'resourceId', 'field'],

        data: () => ({
            openingHours: {},
            // exceptions: {},
        }),

        created() {
            this.field.value = this.field.value || {}

            this.openingHours = {...EMPTY_WEEK, ..._.omit(this.field.value, 'exceptions')}
            // this.exceptions = this.field.value.exceptions || {}
        },
    }
</script>
