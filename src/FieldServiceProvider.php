<?php

namespace Sadekd\NovaOpeningHoursField;

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
        });
    }

    public function register()
    {
        //
    }
}
