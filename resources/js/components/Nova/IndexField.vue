<template>
    <div :class="`text-${field.textAlign}`">
        <icon-boolean v-for="day in normalizedWeek" :key="day.day" :value="Object.values(day.intervals).length"/>
    </div>
</template>

<script>
import {WeekMixin} from "../../src/mixins";

export default {
    mixins: [WeekMixin],

    props: ['resourceName', 'field'],
}
</script>
