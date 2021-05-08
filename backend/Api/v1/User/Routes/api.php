<?php
use Api\v1\User\Controllers\AuthController;
use Api\v1\User\Controllers\UserController;
Route::prefix('api/v1/')
->namespace('Api\v1\User\Controllers')
->group(function () {
    // ->middleware("throttle:1,5")
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[UserController::class,'store']);
    Route::get('users',[UserController::class,'index']);
    Route::get('user/{id}',[UserController::class,'show']);
    Route::post('user/{id}',[UserController::class,'update']);
    Route::delete('user/{id}',[UserController::class,'destroy']);
    Route::post('logout',[AuthController::class,'logout'])->middleware(['auth:sanctum']);
});
