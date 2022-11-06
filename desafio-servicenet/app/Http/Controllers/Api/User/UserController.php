<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;
use App\Models\User\User;
use App\Http\Resources\Api\Users\UsersResource;
use App\Http\Resources\Api\Users\UserResource;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Api\User\StoreUserRequest;
use App\Http\Requests\Api\User\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{
    private $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function index(Request $request)
    {
        $query = $this->users->orderBy('name', 'ASC');

        if ($request->filled('name')) {
            $query = $query->where('name', 'LIKE', '%' . $request->name . '%');
        }

        $results = $query->get();

        return ($results->count() == 0) ?
            $this->notFoundResponse() :
            UsersResource::collection($results);
    }

    public function show($uuid)
    {
        $result = $this->users->findByUuid($uuid);

        return new UserResource($result);
    }

    public function store(StoreUserRequest $request)
    {
        try {

            $request->merge([
                'password' => Hash::make($request->password),
                'registration' => $this->generateUniqueRegistration()
            ]);

            $this->users->create($request->all());

            return response()->json([
                'message' => 'Usuário criado com sucesso!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Falha ao criar novo usuário'
            ], 500);
        }
    }

    public function update(UpdateUserRequest  $request, $uuid)
    {
        $result = $this->users->findByUuid($uuid);

        try {

            $request->merge([
                'password' => Hash::make($request->password)
            ]);

            $result->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Usuário atualizado com sucesso!'
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Falha ao atualizar usuário'
            ], 500);
        }
    }

    public function destroy($uuid)
    {
        $result = $this->users->findByUuid($uuid);

        try {

            $result->delete();

            return response()->json([
                'success' => true,
                'message' => 'Usuário excluida com sucesso!'
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Falha ao excluir usuário'
            ], 500);
        }
    }

    public function generateUniqueRegistration()
    {
        do {
            $registration = random_int(10000000, 99999999);
        } while (User::where("registration", "=", $registration)->first());

        return $registration;
    }
}
