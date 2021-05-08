<?php


namespace Api\v1\User\Repositories;

use Api\v1\User\Interfaces\UserInterface;
use App\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class UserRepositories implements  UserInterface
{
    //model property declared
    protected  $model;

    //constructor  define
    public function __construct(User $model)
    {
        $this->model=$model;
    }


    public function all()
    {

    }

    public function create(array $data)
    {

    }

    public function update( $data, $id)
    {

    }

    public function delete ( $id )
    {

    }

    public function show($id)
    {

    }

    public function userLogin($loginCredential)
    {

        $user = User::where('phone', $loginCredential->phone)->first();

        if (! $user || ! Hash::check($loginCredential->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone' => ['The provided credentials are incorrect.'],
            ]);
        }
        return [
            'token'=>$user->createToken('Rent A Car')->plainTextToken,
            'user'=>[
                'type'=>$user->userable_type,
                'name'=>$user->name,
                'image'=>$user->userable->profile_image
            ]
        ];
    }

    public function userLogout()
    {
        $user = Auth::user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        return $user;

    }


    public  function  getModel(){
        return $this->model;
    }
}
