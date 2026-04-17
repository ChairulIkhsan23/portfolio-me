<?php

namespace App\Models;

use App\Enums\ProjectCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'images',
        'category',
        'technologies',
        'project_url',
        'github_url',
        'completion_date',
        'is_featured',
        'is_published',
        'sort_order'
    ];

    protected $casts = [
        'images' => 'array',
        'technologies' => 'array',
        'completion_date' => 'date',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'category' => ProjectCategory::class
    ];

    // Accessor untuk URL project
    public function getProjectUrlAttribute($value)
    {
        return $value ?: null;
    }

    // Accessor untuk format tanggal
    public function getFormattedDateAttribute()
    {
        return $this->completion_date->format('M Y');
    }

    // Scope untuk featured projects
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope untuk published projects
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    // Scope untuk filter by category
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}