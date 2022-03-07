<template>
    <div class="interval">
        <time-input
            :time-prop="from"
            :use-text-inputs="useTextInputs"
            @updateTime="from = $event"
        />
        -
        <time-input
            :time-prop="to"
            :use-text-inputs="useTextInputs"
            @updateTime="to = $event"
        />
        <button class="btn btn-default btn-danger" @click.prevent="$emit('removeInterval')">-</button>
    </div>
</template>

<script>
import {useTextInputsProp} from "../src/props";
import TimeInput from "./TimeInput";

export default {
    components: {TimeInput},

    props:  {
        intervalProp: String,
        ...useTextInputsProp,
    },

    emits: ['updateInterval', 'removeInterval'],

    data: function () {
        return {
            interval: this.intervalProp,
        }
    },

    computed: {
        from: {
            get() {
                return this.interval.split('-')[0]
            },
            set(value) {
                this.interval = [value, this.to].join('-')
            },
        },

        to: {
            get() {
                return this.interval.split('-')[1]
            },
            set(value) {
                this.interval = [this.from, value].join('-')
            },
        },
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
