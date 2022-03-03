<template>
    <table class="openingHours exceptionsTable table mt-6 w-full">
        <tr>
            <th class="text-left font-bold" colspan="2">{{ __('Exceptions') }}</th>
            <th v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="$emit('addException')">+</button>
            </th>
        </tr>
        <tr v-for="exception in exceptions">
            <td>
                <div v-if="editable">
                    <date-input
                        :date-prop="exception.date"
                        :use-text-inputs="useTextInputs"
                        @updateDate="$emit('renameException', exception.date, $event)"
                    />
                </div>
                <div v-else>{{ exception.date }}</div>
            </td>
            <td>
                <div v-if="Object.values(exception.intervals).length">
                    <div v-for="(interval, index) in exception.intervals">
                        <div v-if="editable">
                            <interval-input
                                :interval-prop="interval"
                                :use-text-inputs="useTextInputs"
                                @updateInterval="$emit('updateInterval', 'exceptions', exception.date, index, $event)"
                                @removeInterval="$emit('removeInterval', 'exceptions', exception.date, index)"
                            />
                        </div>
                        <div v-else>{{ interval }}</div>
                    </div>
                </div>
                <div v-else>{{ __('Closed') }}</div>
            </td>
            <td v-if="editable">
                <button class="btn btn-default btn-primary" @click.prevent="$emit('addInterval', 'exceptions', exception.date)">+</button>
                <button class="btn btn-default btn-danger" @click.prevent="$emit('removeException', exception.date)">-</button>
            </td>
        </tr>
    </table>
</template>

<script>
import IntervalInput from "./IntervalInput";
import DateInput from "./DateInput";
import {editableProp, exceptionsProp, useTextInputsProp} from "../src/props";

export default {
    components: { IntervalInput, DateInput },

    props: {
        ...exceptionsProp,
        ...editableProp,
        ...useTextInputsProp,
    },

    emits: ['updateInterval', 'removeInterval', 'addInterval', 'removeException', 'addException', 'renameException'],
}
</script>
