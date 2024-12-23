<template>
    <div :class="`text-${field.textAlign}`">
        <IconBoolean
            v-for="day in normalizedWeek"
            :key="day.day"
            :value="Object.values(day.intervals).length > 0"
        />
    </div>
</template>

<script>
import {WeekMixin} from "../../src/mixins";

export default {
    mixins: [WeekMixin],

    props: ['resourceName', 'field'],
}
</script>
