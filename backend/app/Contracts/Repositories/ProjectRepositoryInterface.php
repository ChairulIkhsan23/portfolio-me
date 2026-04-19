<?php

namespace App\Contracts\Repositories;

use App\Models\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface ProjectRepositoryInterface
{
    public function getPublishedProjects(
        int $perPage = 10,
        array $filters = []
    ): LengthAwarePaginator;

    public function getProjectBySlug(string $slug): ?Project;

    public function getFeaturedProjects(int $limit = 6): Collection;

    public function getRecentProjects(int $limit = 6): Collection;
}