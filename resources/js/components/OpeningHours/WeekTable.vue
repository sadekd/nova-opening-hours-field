<template>
    <table class="openingHours weekTable table w-full">
        <tr>
            <th class="text-left font-bold" :colspan="editable ? 3 : 2">{{ __('Week') }}</th>
        </tr>
        <tr v-for="(intervals, day) in week" :key="day">
            <td>{{ translateDayName(day) }}</td>
            <td>
                <div v-if="Object.values(intervals).length">
                    <div v-for="(interval, index) in intervals" :key="index + '_' + interval">
                        <div v-if="editable">
                            <interval-input
                                :interval-prop="interval"
                                @updateInterval="$emit('updateInterval', 'week', day, index, $event)"
                                @removeInterval="$emit('removeInterval', 'week', day, index)"
                            />
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="$emit('addInterval', 'week', day)">+</button>
                <button class="btn btn-default btn-danger" v-if="Object.values(intervals).length" @click.prevent="$emit('removeAllIntervals', 'week', day)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import {capitalizeFirstLetter} from "../../func";
import {editableProp, weekProp} from "../../const";
import IntervalInput from "./IntervalInput";

export default {
    components: { IntervalInput },

    props: {
        week: weekProp,
        editable: editableProp,
    },

    emits: ['updateInterval', 'removeInterval', 'addInterval', 'removeAllIntervals'],

    methods: {
        translateDayName(day) {
            return this.__(capitalizeFirstLetter(day))
        },
    },
}
</script>
