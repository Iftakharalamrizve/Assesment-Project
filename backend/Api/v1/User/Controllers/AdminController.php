<?php

namespace Api\v1\User\Controllers;

use Api\v1\Users\Repositories\AdminRepositories;
use Api\v1\User\Requests\LoginRequest;
use Illuminate\Http\Request;
use Api\v1\Traits\ResponseJsonAble;
use Response;
use Illuminate\Http\Response as Res;
use Api\v1\User\Requests\AdminRequest;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Api\v1\Users\Repositories\UserRepositories;
use Api\v1\User\Models\Admin;
use Illuminate\Support\Facades\DB;
class AdminController extends Controller
{
    use ResponseJsonAble;
    /**
     * @var UserRepositories
     */
    public $userModel;
    /**
     * @var AdminRepositories
     */
    public  $adminModel;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Admin $admin , User $user)
    {
        $this -> adminModel    = new AdminRepositories( $admin );
        $this -> userModel     = new UserRepositories( $user );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( AdminRequest $request )
    {
        DB ::beginTransaction();
        try {
            
            $admin = $this -> adminModel -> create( $request -> only( $this -> adminModel -> getModel() -> getFillable() ) );
            $user  = $admin -> user() -> create( $request -> only( $this -> userModel -> getModel() -> getFillable() ) );
            DB ::commit();
            return $this -> respondCreated( 'Admin  Successfully Created' , $user );

        } catch ( ModelNotFoundException $e ) {
            DB ::rollback();
            return $this -> respondInternalError( 'Sorry, Operation Failed' );
        }
    }





}
