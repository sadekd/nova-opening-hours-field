let mix = require('laravel-mix')
let path = require('path')

mix.setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .sass('resources/sass/field.scss', 'css')
    .vue({ version: 3 })
    .webpackConfig({
        externals: {
            vue: 'Vue',
            'laravel-nova': 'LaravelNova'
        },
        output: {
            uniqueName: 'sadekd/nova-opening-hours-field',
        },
    })
