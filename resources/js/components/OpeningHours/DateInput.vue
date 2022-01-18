<template>
    <input
        type="date"
        class="form-control form-input form-input-bordered"
        v-model="date"
        :min="getMinDate()"
        required
    />
</template>

<script>
import {getTodayDate} from "../../func";

export default {

    props: ['dateProp'],

    emits: ['updateDate'],

    data: function () {
        return {
            date: this.dateProp,
        }
    },

    methods: {
        getMinDate() {
            return getTodayDate()
        },
    },

    watch: {
        date(value) {
            this.$emit('updateDate', value)
        },
    },
}
</script>
