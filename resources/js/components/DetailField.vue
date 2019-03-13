<template>
    <panel-item :field="field">
        <template slot="value">
            <table class="table w-full">
                <tr v-for="day in weekDays">
                    <td>{{ day }}</td>
                    <td>
                        {{ openingHours[day].join(', ') }}
                    </td>
                </tr>
            </table>
        </template>
    </panel-item>
</template>

<script>
    import "../field"
    import {WEEKDAYS} from "../const";

    export default {
        props: ['resource', 'resourceName', 'resourceId', 'field'],

        data: () => ({
            // openingHours: [],
            // exceptions: [],
            weekDays: WEEKDAYS
        })
    }
</script>
