<?php

namespace App\Http\Requests\Api\User;

use App\Http\Requests\BaseFormRequest;

class UpdateUserRequest  extends BaseFormRequest
{
    protected $modelName = 'atualizar Usuário';

    public function rules(): array
    {

        return [
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$this->uuid},uuid",
            'password' => 'nullable|min:8',
            'birth' => 'required|date',
        ];
    }
}
