<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Repositories
use App\Repositories\ProjectRepository;
use App\Repositories\CertificateRepository;
use App\Repositories\ExperienceRepository;
use App\Repositories\EducationRepository;
use App\Repositories\MessageRepository;

// Interfaces
use App\Contracts\Repositories\ProjectRepositoryInterface;
use App\Contracts\Repositories\CertificateRepositoryInterface;
use App\Contracts\Repositories\ExperienceRepositoryInterface;
use App\Contracts\Repositories\EducationRepositoryInterface;
use App\Contracts\Repositories\MessageRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Project
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);

        // Certificate
        $this->app->bind(CertificateRepositoryInterface::class, CertificateRepository::class);

        // Experience
        $this->app->bind(ExperienceRepositoryInterface::class, ExperienceRepository::class);

        // Education
        $this->app->bind(EducationRepositoryInterface::class, EducationRepository::class);

        // Message
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
    }

    public function boot(): void
    {
        //
    }
}