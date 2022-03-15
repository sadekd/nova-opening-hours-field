Nova.booting((Vue, router, store) => {
    Vue.component('index-nova-opening-hours-field', require('./components/Nova/IndexField'))
    Vue.component('detail-nova-opening-hours-field', require('./components/Nova/DetailField'))
    Vue.component('form-nova-opening-hours-field', require('./components/Nova/FormField'))
})
