<template>
    <div :class="`text-${field.textAlign}`">
        <boolean-icon v-for="(intervals, day) in week" :key="day" :value="Object.values(intervals).length"/>
    </div>
</template>

<script>
import {getWeekData} from "../func";

export default {
    props: ['resourceName', 'field'],

    data: function () {
        return {
            week: getWeekData(this.field.value),
        }
    },
}
</script>
