<?php

namespace Api\v1\User\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasApiTokens, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'dob',
        'mobile',
        'password',
        'image',
    ];

    protected $hidden=[
        'password'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function($model){
            //you can save any field value on inserting data into a table
            //for example $model->created_by=Auth::user()->id
        });

        static::updating(function($model){
            //you can save any field value on updating data into a table
            //for example $model->updated_by=Auth::user()->id
        });
    }
}
