<?php

namespace App\Http\Requests\Api\User;

use App\Http\Requests\BaseFormRequest;

class StoreUserRequest  extends BaseFormRequest
{
    protected $modelName = 'adicionar Usuário';

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'birth' => 'required|date',
        ];
    }
}
