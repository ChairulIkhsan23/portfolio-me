<?php

use App\Http\Controllers\API\CertificateController;
use App\Http\Controllers\API\EducationController;
use App\Http\Controllers\API\ExperienceController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Projects
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

// Experiences
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{id}', [ExperienceController::class, 'show']);

// Educations
Route::get('/educations', [EducationController::class, 'index']);
Route::get('/educations/{id}', [EducationController::class, 'show']);

// Certificates
Route::get('/certificates/featured', [CertificateController::class, 'featured']);
Route::get('/certificates/category/{category}', [CertificateController::class, 'byCategory']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/certificates/{id}', [CertificateController::class, 'show']);

// Contact Form (kirim pesan)
Route::post('/messages', [MessageController::class, 'store']);