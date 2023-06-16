<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = ['title', 'description', 'expire_date', 'status', 'created_at', 'updated_at', 'user_id', 'image'];

    public function getSlugOptions(): SlugOptions
    {
       return SlugOptions::create()
           ->generateSlugsFrom('title')
           ->saveSlugsTo('slug');
    }

    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }
}
