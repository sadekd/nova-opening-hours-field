<template>
    <div class="interval">
        <input
            type="time"
            class="form-control form-input form-input-bordered"
            v-model="from"
            required
        >
        -
        <input
            type="time"
            class="form-control form-input form-input-bordered"
            v-model="to"
            required
        >
        <button class="btn btn-default btn-danger" @click.prevent="$emit('removeInterval')">-</button>
    </div>
</template>

<script>
export default {

    props: ['intervalProp'],

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
