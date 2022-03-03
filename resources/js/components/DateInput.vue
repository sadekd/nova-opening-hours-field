<template>
    <input
        :type="useTextInputs ? 'text' : 'date'"
        class="form-control form-input form-input-bordered"
        v-model="date"
        :min="getMinDate()"
        minlength="7"
        maxlength="10"
        required
    />
</template>

<script>
import {getTodayDate} from "../src/func";
import {useTextInputsProp} from "../src/props";

export default {
    props:  {
        dateProp: String,
        ...useTextInputsProp,
    },

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

<style scoped>
input[type="text"] {
    width: 125px;
}

input[type="date"] {
    width: 175px;
}
</style>
