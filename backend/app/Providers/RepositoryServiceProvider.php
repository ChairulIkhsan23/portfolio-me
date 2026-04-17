<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\RedisCacheService;
use App\Repositories\ProjectRepository;
use App\Contracts\Services\CacheServiceInterface;
use App\Contracts\Repositories\ProjectRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(CacheServiceInterface::class, RedisCacheService::class);
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
    }

    public function boot(): void
    {
        //
    }
}