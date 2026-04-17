<?php

namespace Tests\Feature;

use App\Models\Education;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EducationApiTest extends TestCase
{
    use RefreshDatabase;  // ← Tambahkan ini!

    public function test_can_get_all_educations(): void
    {
        Education::factory()->count(3)->create();

        $response = $this->getJson('/api/educations');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'institution', 'degree', 'field_of_study', 'start_date', 'end_date', 'is_current', 'description']
                ],
                'links',
                'meta'
            ]);
    }

    public function test_can_get_single_education(): void
    {
        $education = Education::factory()->create([
            'institution' => 'Test University',
            'degree' => 'Sarjana Komputer'
        ]);

        $response = $this->getJson('/api/educations/' . $education->id);

        $response->assertStatus(200)
            ->assertJsonPath('data.institution', 'Test University')
            ->assertJsonPath('data.degree', 'Sarjana Komputer');
    }

    public function test_returns_404_for_non_existent_education(): void
    {
        $response = $this->getJson('/api/educations/99999');

        $response->assertStatus(404);
    }

    public function test_pagination_works(): void
    {
        Education::factory()->count(15)->create();

        $response = $this->getJson('/api/educations?per_page=5');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('meta.per_page', 5)
            ->assertJsonPath('meta.total', 15);
    }

    public function test_educations_sorted_correctly(): void
    {
        Education::factory()->current()->create([
            'start_date' => '2023-08-01',
            'institution' => 'Current University'
        ]);

        Education::factory()->graduated()->create([
            'start_date' => '2022-08-01',
            'institution' => 'Graduated University'
        ]);

        $response = $this->getJson('/api/educations');
        $response->assertStatus(200);
        
        $data = $response->json('data');
        $this->assertEquals('Current University', $data[0]['institution']);
    }

    public function test_can_limit_results_with_per_page(): void
    {
        Education::factory()->count(10)->create();

        $response = $this->getJson('/api/educations?per_page=3');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('meta.per_page', 3);
    }
}