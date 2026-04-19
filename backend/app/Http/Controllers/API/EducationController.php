<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\EducationRepository;
use App\Http\Resources\EducationResource;

class EducationController extends Controller
{
    private EducationRepository $educationRepository;

    public function __construct(EducationRepository $educationRepository)
    {
        $this->educationRepository = $educationRepository;
    }

    public function index()
    {
        $perPage = request()->get('per_page', 10);

        $filters = [
            'per_page' => $perPage
        ];

        $educations = $this->educationRepository->getAll($filters);

        return EducationResource::collection($educations);
    }

    public function show($id)
    {
        $education = $this->educationRepository->getById($id);

        if (!$education) {
            return response()->json([
                'success' => false,
                'message' => 'Education not found'
            ], 404);
        }

        return new EducationResource($education);
    }
}