<?php

namespace SadekD\NovaOpeningHoursField;

use Laravel\Nova\Nova;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\ServiceProvider;

class FieldServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Nova::serving(function (ServingNova $event) {
            Nova::script('nova-opening-hours-field', __DIR__ . '/../dist/js/field.js');
            Nova::style('nova-opening-hours-field', __DIR__ . '/../dist/css/field.css');
            Nova::translations(__DIR__ . '/../resources/lang/' . app()->getLocale() . '.json');
        });
    }

    public function register()
    {
        //
    }
}
