<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\ProjectRepository;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    private ProjectRepository $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $filters = request()->only(['category']);

        $projects = $this->projectRepository->getPublishedProjects($perPage, $filters);

        return ProjectResource::collection($projects);
    }

    public function show(string $slug)
    {
        $project = $this->projectRepository->getProjectBySlug($slug);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found'
            ], 404);
        }

        return new ProjectResource($project);
    }

    public function featured()
    {
        $limit = request()->get('limit', 6);

        return response()->json([
            'success' => true,
            'data' => $this->projectRepository->getFeaturedProjects($limit)
        ]);
    }

    public function recent()
    {
        $limit = request()->get('limit', 6);

        return response()->json([
            'success' => true,
            'data' => $this->projectRepository->getRecentProjects($limit)
        ]);
    }
}