<?php

namespace App\Http\Controllers\API;

use App\Services\RedisCacheService;
use App\Http\Controllers\Controller;
use App\Repositories\ProjectRepository;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    private RedisCacheService $cacheService;
    private ProjectRepository $projectRepository;

    public function __construct(
        RedisCacheService $cacheService,
        ProjectRepository $projectRepository
    ) {
        $this->cacheService = $cacheService;
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $filters = request()->only(['category']);
        
        return $this->cacheService
            ->tags(['projects', 'list'])
            ->remember('projects:list:' . md5(json_encode([$perPage, $filters])), function () use ($perPage, $filters) {
                $projects = $this->projectRepository->getPublishedProjects($perPage, $filters);
                return ProjectResource::collection($projects);
            });
    }

    public function show(string $slug)
    {
        return $this->cacheService
            ->tags(['projects', 'detail'])
            ->remember('projects:show:' . $slug, function () use ($slug) {
                $project = $this->projectRepository->getProjectBySlug($slug);
                
                if (!$project) {
                    return response()->json(['success' => false, 'message' => 'Project not found'], 404);
                }
                
                return new ProjectResource($project);
            });
    }

    public function featured()
    {
        $limit = request()->get('limit', 6);
        
        return $this->cacheService
            ->tags(['projects', 'featured'])
            ->remember('projects:featured:' . $limit, function () use ($limit) {
                return response()->json([
                    'success' => true,
                    'data' => $this->projectRepository->getFeaturedProjects($limit)
                ]);
            });
    }

    public function recent()
    {
        $limit = request()->get('limit', 6);
        
        return $this->cacheService
            ->tags(['projects', 'recent'])
            ->remember('projects:recent:' . $limit, function () use ($limit) {
                return response()->json([
                    'success' => true,
                    'data' => $this->projectRepository->getRecentProjects($limit)
                ]);
            });
    }
}