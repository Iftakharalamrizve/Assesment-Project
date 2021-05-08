<?php

namespace Api\v1\User\Controllers;

use Api\v1\User\Requests\LoginRequest;
use Illuminate\Http\Request;
use Api\v1\Traits\ResponseJsonAble;
use Illuminate\Support\Facades\Auth;
use Response;
use Illuminate\Http\Response as Res;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
class AuthController extends Controller
{
    use ResponseJsonAble;

    public function login(LoginRequest $request)
    {
        $credentials=$request->only(['email','password']);

        if(!Auth::attempt($credentials))
        {
            return response()->json([
                'status_code'=>401,
                'message'=>'Invalid user credentials'
            ],401);
        }
        $loggedInUser=Auth::user();
        return response()->json([
            'status_code'=>200,
            'access_token'=>$loggedInUser->createToken('admin')->plainTextToken,
            'user_info'=>$loggedInUser,
            'token_type'=>'Bearer'
        ]);
    }

    public function createAccount(Request $request)
    {
        
    }

    public function logout(Request $request)
    {
        $user = request()->user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        return $this->respond(['message'=>'Successfully logged out']);
    }
}
