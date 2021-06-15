<template>
    <div :class="`text-${field.textAlign}`">
        <boolean-icon v-for="(intervals, dayName) in openingHours" :key="dayName" :value="intervals.length"/>
    </div>
</template>

<script>
import {getOpeningHoursData} from "../func";

export default {

    props: ['resourceName', 'field'],

    data: function () {
        return {
            ...getOpeningHoursData(this.field.value)
        }
    },
}
</script>
