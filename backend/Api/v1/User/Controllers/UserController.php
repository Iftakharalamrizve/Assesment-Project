<?php

namespace Api\v1\User\Controllers;

use Api\v1\User\Requests\LoginRequest;
use Illuminate\Http\Request;
use Api\v1\Traits\ResponseJsonAble;
use Api\v1\Traits\FileUpload;
use Response;
use Illuminate\Http\Response as Res;
use Api\v1\User\Requests\UserRequest;
use App\User;
use File;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Api\v1\Users\Repositories\UserRepositories;
class UserController extends Controller
{
    use ResponseJsonAble , FileUpload;
    /**
     * @var UserRepositories
     */
    private $userModel;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        // $this -> userModel     = new UserRepositories( $user );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        $data = User::all();
        return Response::json($data,Res::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = [];
        return Response::json($data,Res::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $validator = $request->validate([
            'mobile' => 'unique:users,mobile',
            'email' => 'unique:users,email',
        ]);
        if($request->hasfile('image_file')){
            
            $imageLocation=$this->saveSingleImage($request->image_file,'user');
            $request->merge(['image'=>$imageLocation]);
        }

        try{
            $user = new User();
            $data = $request->only($user->getFillable());
            $user->fill($data)->save();
            return Response::json($data,Res::HTTP_CREATED);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry, Operation Failed',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try
        {
            $data = User::findOrFail($id);
            return Response::json($data,Res::HTTP_OK);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry the data is not found',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try
        {
            $data['user'] = User::findOrFail($id);
            return Response::json($data,Res::HTTP_OK);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry the data is not found',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        
        
        try
        {
            $user = User::findOrFail($id);
           
            if($request->hasfile('image_file')){
                File::delete($user->image);
                $imageLocation=$this->saveSingleImage($request->image_file,'user');
                $request->merge(['image'=>$imageLocation]);
            }elseif($request->filedelete != 'false'){
                 File::delete($user->image);
                 $request->merge(['image'=>null]);
            }else{
                $request->merge(['image'=>$user->image]);
            }
            $data = $request->only($user->getFillable());
            $user->update($data);
            return Response::json($data,Res::HTTP_CREATED);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry, Operation Failed',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try
        {
            $user = User::findOrFail($id);
            if($user->delete()){
                File::delete($user->image);
                return Response::json([
                    'message' => 'Succefully Deleted',
                    'status' => true
                ],Res::HTTP_OK);
            }else{
                return Response::json([
                    'message' => "Cannot be deleted",
                    'status' => false
                ],Res::HTTP_NOT_FOUND );
            }
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry, Operation Failed',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Login A user via authenticated information .
     *
     * @param  Request  $reqeust
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(LoginRequest $request)
    {
        try
        {
            $info = $this->userModel->userLogin($request);
            return  $this->respondWithToken($info['token'],$info['user']);
        }
        catch(ModelNotFoundException $e)
        {
            return $this->respondInternalError('Sorry, Operation Failed');
        }
    }
    /**
     *User logout  use phone number and password.
     *
     * @param  object $request
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {

        try
        {
            $info = $this->userModel->userLogout();
            if(isset($info)){
                return  $this->respondCreated("Logout Successfully Complete");
            }else{
                return $this->respondNotFound('Logout Not Successfull');
            }

        }
        catch(ModelNotFoundException $e)
        {
            return $this->respondInternalError('Sorry, Operation Failed');
        }


    }

}
