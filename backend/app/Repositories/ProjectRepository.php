<?php

namespace App\Repositories;

use App\Models\Project;
use App\Contracts\Repositories\ProjectRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function getPublishedProjects(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return Project::query()
            ->select([
                'id',
                'title',
                'slug',
                'description',
                'image',
                'category',
                'technologies',
                'completion_date',
                'is_featured'
            ])
            ->where('is_published', true)
            ->when($filters['category'] ?? null, function ($query, $category) {
                $query->where('category', $category);
            })
            ->orderByDesc('is_featured')
            ->orderByDesc('completion_date')
            ->paginate($perPage);
    }

    public function getProjectBySlug(string $slug): ?Project
    {
        return Project::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->first();
    }

    public function getFeaturedProjects(int $limit = 6): Collection
    {
        return Project::query()
            ->select([
                'id',
                'title',
                'slug',
                'image',
                'category'
            ])
            ->where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get();
    }

    public function getRecentProjects(int $limit = 6): Collection
    {
        return Project::query()
            ->select([
                'id',
                'title',
                'slug',
                'image',
                'completion_date'
            ])
            ->where('is_published', true)
            ->orderByDesc('completion_date')
            ->limit($limit)
            ->get();
    }
}