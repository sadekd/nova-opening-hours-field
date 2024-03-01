<template>
    <table class="openingHours exceptionsTable table-default mt-6 w-full">
        <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
                <table-header colspan="2">
                    {{ __('Exceptions') }}
                </table-header>
                <table-header v-if="editable" class="text-right">
                    <add-button @click.prevent="$emit('addException')" />
                </table-header>
            </tr>
        </thead>
        <tbody>
            <tr v-for="exception in exceptions" class="group">
                <table-column>
                    <div v-if="editable">
                        <date-input
                            :date-prop="exception.date"
                            :use-text-inputs="useTextInputs"
                            @updateDate="$emit('renameException', exception.date, $event)"
                        />
                    </div>
                    <div v-else>{{ exception.date }}</div>
                </table-column>
                <table-column>
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
                </table-column>
                <table-column v-if="editable" class="text-right">
                    <add-button @click.prevent="$emit('addInterval', 'exceptions', exception.date)" />
                    &nbsp;
                    <remove-button @click.prevent="$emit('removeException', exception.date)"/>
                </table-column>
            </tr>
        </tbody>
    </table>
</template>

<script>
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import IntervalInput from "./IntervalInput";
import DateInput from "./DateInput";
import TableColumn from "./TableColumn";
import TableHeader from "./TableHeader";
import {editableProp, exceptionsProp, useTextInputsProp} from "../src/props";

export default {
    components: { AddButton, RemoveButton, IntervalInput, DateInput, TableColumn, TableHeader },

    props: {
        ...exceptionsProp,
        ...editableProp,
        ...useTextInputsProp,
    },

    emits: ['updateInterval', 'removeInterval', 'addInterval', 'removeException', 'addException', 'renameException'],
}
</script>
