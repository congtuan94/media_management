<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'name', 'folder_id', 'thumbnail'
    ];

    public function folder()
    {
        return $this->belongsTo(Folder::class, 'folder_id', 'id');
    }

    public function getThumbnailAttribute()
    {
        $folder = $this->folder()->first();

        return asset('storage/images/'.$folder->name.'/'.$this->name);
        // return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CtaDk3U49ukzwQTk5h6n1mwtWT9HULw-piOF2eF4&s';
    }

    /**
     * Interact with the user's first name.
     */
    protected function thumbnail(): Attribute
    {
        $folder = $this->folder()->first(); //name
        return Attribute::make(
            get: fn (string $value) =>  asset('storage/images/'.$folder->name.'/'.$this->name),
            // set: fn (string $value) => strtolower($value),
        );
    }
}
