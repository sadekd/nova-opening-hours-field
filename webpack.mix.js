let mix = require('laravel-mix')
let path = require('path')

mix.setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .sass('resources/sass/field.scss', 'css')
    .vue({ version: 3 })
    .webpackConfig({
        externals: {
            vue: 'Vue',
        },
        output: {
            uniqueName: 'optimistdigital/nova-multiselect-filter',
        },
    })
    .alias({
        'laravel-nova-dependent-form-field': path.join(__dirname, 'vendor/laravel/nova/resources/js/mixins/DependentFormField.js'),
        'laravel-nova-handles-validation-errors': path.join(__dirname, 'vendor/laravel/nova/resources/js/mixins/HandlesValidationErrors.js'),
    })
