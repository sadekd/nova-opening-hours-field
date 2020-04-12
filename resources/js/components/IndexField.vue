<template>
    <div :class="`text-${field.textAlign}`">
        <boolean-icon v-for="k in openingsForWeek" :key="k.name" :value="k.value" />
    </div>
</template>

<script>
    import {EMPTY_WEEK} from "../const";

    export default {

        props: ['resourceName', 'field'],

        data: () => ({
            openingHours: {},
        }),

        created() {
            this.field.value = this.field.value || {}

            this.openingHours = {...EMPTY_WEEK, ..._.omit(this.field.value, 'exceptions')}
        },
        computed: {
            openingsForWeek() {
                return _.map(this.openingHours, (i, k) => {
                    return {
                        name: k,
                        label: k,
                        value: i.length > 0 || false,
                    }
                })

                // return {
                //     value: _.map(this.openingHours, (i, k) => {
                //         return {
                //             [k]: i.length > 0 || false,
                //         }
                //     }),
                //     options: _.map(this.openingHours, (i, k) => {
                //         return {
                //             name: k,
                //             label: k,
                //         }
                //     })
                // };
            },
        },
    }
</script>
