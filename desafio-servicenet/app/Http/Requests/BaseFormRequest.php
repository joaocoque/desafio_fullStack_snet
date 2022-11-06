<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseFormRequest extends FormRequest
{
    protected $modelName;
    protected $validationAction;

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => "Falha ao {$this->validationAction} {$this->modelName}",
            'data' => $validator->getMessageBag(),
        ], 400));
    }

}
