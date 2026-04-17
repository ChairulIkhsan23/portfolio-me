<?php

namespace Tests\Feature;

use App\Models\Experience;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExperienceApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_experiences(): void
    {
        Experience::factory()->count(3)->create();

        $response = $this->getJson('/api/experiences');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'company', 'position', 'description', 'start_date', 'is_current']
                ],
                'links',
                'meta'
            ]);
    }

    public function test_can_get_single_experience(): void
    {
        $experience = Experience::factory()->create([
            'company' => 'Tech Corp',
            'position' => 'Senior Developer'
        ]);

        $response = $this->getJson('/api/experiences/' . $experience->id);

        $response->assertStatus(200)
            ->assertJsonPath('data.company', 'Tech Corp')
            ->assertJsonPath('data.position', 'Senior Developer');
    }

    public function test_returns_404_for_non_existent_experience(): void
    {
        $response = $this->getJson('/api/experiences/99999');

        $response->assertStatus(404);
    }

    public function test_pagination_works(): void
    {
        Experience::factory()->count(15)->create();

        $response = $this->getJson('/api/experiences?per_page=5');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('meta.per_page', 5)
            ->assertJsonPath('meta.total', 15);
    }

    public function test_current_experience_appears_first(): void
    {
        Experience::factory()->current()->create([
            'start_date' => '2023-01-01',
            'company' => 'Current Job'
        ]);

        Experience::factory()->create([
            'start_date' => '2022-01-01',
            'company' => 'Past Job'
        ]);

        $response = $this->getJson('/api/experiences');
        $data = $response->json('data');

        $this->assertEquals('Current Job', $data[0]['company']);
    }

    public function test_can_limit_results_with_per_page(): void
    {
        Experience::factory()->count(10)->create();

        $response = $this->getJson('/api/experiences?per_page=3');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('meta.per_page', 3);
    }
}