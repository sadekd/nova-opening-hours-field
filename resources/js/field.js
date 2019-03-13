Nova.booting((Vue, router, store) => {
    Vue.component('index-nova-opening-hours-field', require('./components/IndexField'))
    Vue.component('detail-nova-opening-hours-field', require('./components/DetailField'))
    Vue.component('form-nova-opening-hours-field', require('./components/FormField'))
})
