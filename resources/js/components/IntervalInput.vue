<template>
    <div class="interval">
        <time-input
            :time-prop="from"
            :use-text-inputs="useTextInputs"
            @blur="this.interval = [this.from, this.to].join('-');"
            v-model="from"
        />
        -
        <time-input
            :time-prop="to"
            :use-text-inputs="useTextInputs"
            @blur="this.interval = [this.from, this.to].join('-');"
            v-model="to"
        />
        <span class="ml-2">
            <remove-button @click.prevent="$emit('removeInterval')" />
        </span>
    </div>
</template>

<script>
import {useTextInputsProp} from "../src/props";
import RemoveButton from './RemoveButton';
import TimeInput from "./TimeInput";

export default {
    components: { RemoveButton, TimeInput},

    props:  {
        intervalProp: String,
        ...useTextInputsProp,
    },

    emits: ['updateInterval', 'removeInterval'],

    data: function () {
        return {
            interval: this.intervalProp,
            from: this.intervalProp.split('-')[0],
            to: this.intervalProp.split('-')[1]
        }
    },


    watch: {
        interval(value) {
            // if (value.length !== 11 || value === this.interval) return
            this.$emit('updateInterval', value)
        },
    },
}
</script>

<style scoped>
.interval {
    margin: 10px 0;
}
</style>
