<template>
    <table class="openingHours exceptionsTable table mt-6 w-full">
        <tr>
            <th class="text-left font-bold" colspan="2">{{ __('Exceptions') }}</th>
            <th v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="$emit('addException')">+</button>
            </th>
        </tr>
        <tr v-for="(intervals, date) in exceptions">
            <td>
                <div v-if="editable">
                    <date-input
                        :date-prop="date"
                        @updateDate="$emit('renameException', date, $event)"
                    />
                </div>
                <div v-else>{{ date }}</div>
            </td>
            <td>
                <div v-if="Object.values(intervals).length">
                    <div v-for="(interval, index) in intervals" :key="index + '_' + interval">
                        <div v-if="editable">
                            <interval-input
                                :interval-prop="interval"
                                @updateInterval="$emit('updateInterval', 'exceptions', date, index, $event)"
                                @removeInterval="$emit('removeInterval', 'exceptions', date, index)"
                            />
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="$emit('addInterval', 'exceptions', date)">+</button>
                <button class="btn btn-default btn-danger" @click.prevent="$emit('removeException', date)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import {editableProp} from "../../const"
import IntervalInput from "./IntervalInput";
import DateInput from "./DateInput";

export default {
    components: { IntervalInput, DateInput },

    emits: ['updateInterval', 'removeInterval', 'addInterval', 'removeException', 'addException', 'renameException'],

    props: {
        exceptions: Object,
        editable: editableProp,
    },
}
</script>
