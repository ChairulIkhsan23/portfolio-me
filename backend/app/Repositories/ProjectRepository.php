<?php

namespace App\Repositories;

use App\Models\Project;
use App\Contracts\Repositories\ProjectRepositoryInterface;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function getPublishedProjects(int $perPage = 10, array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Project::select([
            'id', 'title', 'slug', 'description', 'image', 'category',
            'technologies', 'completion_date', 'is_featured'
        ])
        ->where('is_published', true)
        ->orderBy('is_featured', 'desc')
        ->orderBy('completion_date', 'desc');

        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        return $query->paginate($perPage);
    }

    public function getProjectBySlug(string $slug): ?object
    {
        return Project::select([
            'id', 'title', 'slug', 'description', 'content', 'image',
            'category', 'technologies', 'completion_date', 'github_url', 'project_url'
        ])
        ->where('slug', $slug)
        ->where('is_published', true)
        ->first();
    }

    public function getFeaturedProjects(int $limit = 6): array
    {
        return Project::select(['id', 'title', 'slug', 'image', 'category'])
            ->where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    public function getRecentProjects(int $limit = 6): array
    {
        return Project::select(['id', 'title', 'slug', 'image', 'completion_date'])
            ->where('is_published', true)
            ->orderBy('completion_date', 'desc')
            ->limit($limit)
            ->get()
            ->toArray();
    }
}