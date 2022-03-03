<template>
    <div class="interval">
        <input
               :type="useTextInputs ? 'text' : 'time'"
               class="form-control form-input form-input-bordered"
               v-model.lazy="from"
               minlength="5"
               maxlength="5"
               required
        >
        -
        <input
               :type="useTextInputs ? 'text' : 'time'"
               class="form-control form-input form-input-bordered"
               v-model.lazy="to"
               minlength="5"
               maxlength="5"
               required
        >
        <button class="btn btn-default btn-danger" @click.prevent="$emit('removeInterval')">-</button>
    </div>
</template>

<script>
import {useTextInputsProp} from "../src/props";

export default {

    props:  {
        intervalProp: String,
        ...useTextInputsProp,
    },

    emits: ['updateInterval', 'removeInterval'],

    data: function () {
        return {
            interval: this.intervalProp,
            error: false,
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

input[type="text"] {
    width: 75px;
}
</style>
