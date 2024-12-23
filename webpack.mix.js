let mix = require('laravel-mix')
let path = require('path')

mix.extend('nova', new require('laravel-nova-devtool'))

mix.setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .sass('resources/sass/field.scss', 'css')
    .vue({ version: 3 })
    .nova('sadekd/nova-opening-hours-field')
