<template>
    <table class="openingHours weekTable table-default w-full">
        <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
                <table-header :colspan="editable ? 3 : 2">
                    {{ __('Week') }}
                </table-header>
            </tr>
        </thead>
        <tbody>
            <tr v-for="day in week" :key="day.day" class="group">
                <table-column>
                    {{ __(capitalizeFirstLetter(day.day)) }}
                </table-column>
                <table-column>
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
                    <div
                        v-else
                        :class="{'closed': editable}"
                    >
                        {{ __('Closed') }}
                    </div>
                </table-column>
                <table-column v-if="editable" class="text-right">
                    <add-button @click.prevent="$emit('addInterval', 'week', day.day)" />
                    <span v-if="Object.values(day.intervals).length" class="ml-2">
                        <remove-button @click.prevent="$emit('removeAllIntervals', 'week', day.day)" />
                    </span>
                </table-column>
            </tr>
        </tbody>
    </table>
</template>

<script>
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import IntervalInput from "./IntervalInput";
import TableColumn from "./TableColumn";
import TableHeader from "./TableHeader";
import {editableProp, useTextInputsProp, weekProp} from "../src/props";
import {capitalizeFirstLetter} from "../src/func";

export default {
    components: { AddButton, RemoveButton, IntervalInput, TableColumn, TableHeader },

    props: {
        ...weekProp,
        ...editableProp,
        ...useTextInputsProp,
    },

    emits: ['updateInterval', 'removeInterval', 'addInterval', 'removeAllIntervals'],

    methods: {
        capitalizeFirstLetter,
    },
}
</script>
