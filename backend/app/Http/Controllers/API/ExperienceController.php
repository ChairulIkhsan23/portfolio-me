<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\ExperienceRepository;
use App\Http\Resources\ExperienceResource;

class ExperienceController extends Controller
{
    private ExperienceRepository $experienceRepository;

    public function __construct(ExperienceRepository $experienceRepository)
    {
        $this->experienceRepository = $experienceRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);

        $filters = [
            'per_page' => $perPage
        ];

        $experiences = $this->experienceRepository->getAll($filters);

        return ExperienceResource::collection($experiences);
    }

    public function show($id)
    {
        $experience = $this->experienceRepository->getById($id);

        if (!$experience) {
            return response()->json([
                'success' => false,
                'message' => 'Experience not found'
            ], 404);
        }

        return new ExperienceResource($experience);
    }
}