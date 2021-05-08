<?php


namespace Api\v1\User\Repositories;

use Api\v1\User\Interfaces\AdminInterface;
use Api\v1\User\Models\Admin;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AdminRepositories implements  AdminInterface
{
    //model property declared
    protected  $model;

    //constructor  define
    public function __construct(Admin $model)
    {
        $this->model=$model;
    }


    public function create(array $data)
    {
        $admin = $this->model->create($data);
        return $admin;
    }




    public  function  getModel(){
        return $this->model;
    }
}
