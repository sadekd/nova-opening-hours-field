<?php

namespace SadekD\NovaOpeningHoursField;

use Illuminate\Validation\ValidationException;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Fields\SupportsDependentFields;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\OpeningHours\Exceptions\Exception as OpeningHoursException;
use Spatie\OpeningHours\OpeningHours;

class NovaOpeningHoursField extends Field
{
    use SupportsDependentFields;

    public $component = 'nova-opening-hours-field';

    private $allowOverflowMidnight;
//    private $allowMergeOverlapping;

    public function __construct($name, $attribute = null, $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);

        $this->allowExceptions(TRUE);
        $this->allowOverflowMidnight(FALSE);
        $this->useTextInputs(FALSE);
//        $this->allowMergeOverlapping(TRUE);
    }

    protected function fillAttributeFromRequest(NovaRequest $request, $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $value = json_decode($request[$requestAttribute], TRUE);

            $data = array_merge([
                'overflow' => (bool)$this->allowOverflowMidnight,
            ], $value);

//            if ($this->allowMergeOverlapping) {
//                $data = OpeningHours::mergeOverlappingRanges($data);
//            }

            try {
                OpeningHours::create($data);
            } catch (OpeningHoursException $exception) {
                throw ValidationException::withMessages([$requestAttribute => $exception->getMessage()]);
            }

            $model->{$attribute} = $this->isNullValue($request[$requestAttribute]) ? NULL : $value;
        }
    }

    public function allowExceptions(bool $value)
    {
        return $this->withMeta(['allowExceptions' => $value]);
    }

    public function allowOverflowMidnight(bool $value)
    {
        $this->allowOverflowMidnight = $value;
        return $this->withMeta(['allowOverflowMidnight' => $value]);
    }

    public function useTextInputs(bool $value)
    {
        return $this->withMeta(['useTextInputs' => $value]);
    }

//    public function allowMergeOverlapping(bool $allowMergeOverlapping)
//    {
//        $this->allowMergeOverlapping = $allowMergeOverlapping;
//        return $this->withMeta(['allowMergeOverlapping' => $this->allowMergeOverlapping]);
//    }
}
