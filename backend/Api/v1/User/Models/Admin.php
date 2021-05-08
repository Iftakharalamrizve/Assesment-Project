<?php

namespace Api\v1\User\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'profile_image','warehouse_id','address',
    ];
    /**
     * Get all The user which of relationship of admin.
     */
    public function user()
    {
        return $this->morphOne('App\User', 'userable');
    }
}
