# Nova Opening Hours Field

[![Latest Stable Version](https://poser.pugx.org/sadekd/nova-opening-hours-field/v)](https://packagist.org/packages/sadekd/nova-opening-hours-field)
[![Total Downloads](https://poser.pugx.org/sadekd/nova-opening-hours-field/downloads)](https://packagist.org/packages/sadekd/nova-opening-hours-field)
[![License](https://poser.pugx.org/sadekd/nova-opening-hours-field/license)](https://packagist.org/packages/sadekd/nova-opening-hours-field)
[![PHP Version Require](https://poser.pugx.org/sadekd/nova-opening-hours-field/require/php)](https://packagist.org/packages/sadekd/nova-opening-hours-field)

[Laravel](https://laravel.com) [Nova](https://nova.laravel.com) custom field for [Spatie Opening Hours](https://github.com/spatie/opening-hours)

### Index

![Screenshot Index](screenshot-index.png)

### Form

![Screenshot Form](screenshot-form.png)

### Detail

![Screenshot Detail](screenshot-detail.png)

## Installation

You can install the package in to a [Laravel](https://laravel.com) app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require sadekd/nova-opening-hours-field
```

## Usage

Laravel Migration

```php
$table->json('opening_hours');  // can be ->nullable()
```

Laravel Model

```php
protected $casts = [
    'opening_hours' => 'array',
];
```

Nova Resource

```php
NovaOpeningHoursField::make(__('Opening Hours'), 'opening_hours'),
// ->allowExceptions(FALSE)    // TRUE by default
// ->allowOverflowMidnight(TRUE)  // FALSE by default
// ->useTextInputs(TRUE)  // FALSE by default
```

## Known issues

- Lazy validation on time field - losing focus when live(help needed)
- Editing date in exceptions causes row jumping - key from date(help needed)
- Browser time input does not support 24:00
- Browser date input does not support recurring format

## TODO

- [x] Explode interval input => time fields
- [x] Validation
- [x] Localization
- [x] Exceptions
- [ ] Tests

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
