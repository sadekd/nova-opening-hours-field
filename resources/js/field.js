Nova.booting((Vue) => {
    Vue.component('index-nova-opening-hours-field', require('./components/Nova/IndexField').default)
    Vue.component('detail-nova-opening-hours-field', require('./components/Nova/DetailField').default)
    Vue.component('form-nova-opening-hours-field', require('./components/Nova/FormField').default)
})
