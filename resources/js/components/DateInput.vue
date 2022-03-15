<template>
    <input
        :type="useTextInputs ? 'text' : 'date'"
        class="form-control form-input form-input-bordered"
        :class="{ 'border-danger': !isValid }"
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

    computed: {
        isValid: function () {
            const re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            // console.log(this.date, re.test(this.date))
            return re.test(this.date);
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
