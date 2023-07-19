<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    protected $fillable = [
        'name', 'parent_id'
    ];

    public function images(){
        return $this->hasMany(Image::class, 'folder_id', 'id');
    }
}
