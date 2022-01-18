<?php

namespace SadekD\NovaOpeningHoursField;

use Illuminate\Validation\ValidationException;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\OpeningHours\Exceptions\Exception as OpeningHoursException;
use Spatie\OpeningHours\OpeningHours;

class NovaOpeningHoursField extends Field
{
    public $component = 'nova-opening-hours-field';

    private $allowOverflowMidnight;
//    private $allowMergeOverlapping;

    public function __construct($name, $attribute = null, $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);

        $this->allowExceptions(TRUE);
        $this->allowOverflowMidnight(FALSE);
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

    public function allowExceptions(bool $allowExceptions)
    {
        return $this->withMeta(['allowExceptions' => $allowExceptions]);
    }

    public function allowOverflowMidnight(bool $allowOverflowMidnight)
    {
        $this->allowOverflowMidnight = $allowOverflowMidnight;
        return $this->withMeta(['allowOverflowMidnight' => $this->allowOverflowMidnight]);
    }

//    public function allowMergeOverlapping(bool $allowMergeOverlapping)
//    {
//        $this->allowMergeOverlapping = $allowMergeOverlapping;
//        return $this->withMeta(['allowMergeOverlapping' => $this->allowMergeOverlapping]);
//    }
}
