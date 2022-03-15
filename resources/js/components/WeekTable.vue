<template>
    <table class="openingHours weekTable table w-full">
        <tr>
            <th class="text-left font-bold" :colspan="editable ? 3 : 2">{{ __('Week') }}</th>
        </tr>
        <tr v-for="day in week" :key="day.day">
            <td>{{ __(capitalizeFirstLetter(day.day)) }}</td>
            <td>
                <div v-if="Object.values(day.intervals).length">
                    <div v-for="(interval, index) in day.intervals" :key="interval.key">
                        <div v-if="editable">
                            <interval-input
                                :interval-prop="interval.interval"
                                :use-text-inputs="useTextInputs"
                                @updateInterval="$emit('updateInterval', 'week', day.day, index, $event)"
                                @removeInterval="$emit('removeInterval', 'week', day.day, index)"
                            />
                        </div>
                        <div v-else>{{ interval.interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="$emit('addInterval', 'week', day.day)">+</button>
                <button class="btn btn-default btn-danger" v-if="Object.values(day.intervals).length" @click.prevent="$emit('removeAllIntervals', 'week', day.day)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import IntervalInput from "./IntervalInput";
import {editableProp, useTextInputsProp, weekProp} from "../src/props";
import {capitalizeFirstLetter} from "../src/func";

export default {
    components: { IntervalInput },

    props: {
        ...weekProp,
        ...editableProp,
        ...useTextInputsProp,
        // ...identifierProp,
    },

    emits: ['updateInterval', 'removeInterval', 'addInterval', 'removeAllIntervals'],

    methods: {
        capitalizeFirstLetter,
    },
}
</script>
