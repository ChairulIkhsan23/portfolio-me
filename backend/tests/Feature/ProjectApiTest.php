<?php

namespace Tests\Feature;

use App\Models\Project;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    public function test_can_get_all_projects()
    {
        Project::factory()->create([
            'title' => 'Test Project',
            'slug' => 'test-project',
            'is_published' => true
        ]);

        $response = $this->getJson('/api/projects');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'slug', 'description']
                ]
            ]);
    }

    public function test_can_get_single_project()
    {
        $project = Project::factory()->create([
            'slug' => 'test-single',
            'is_published' => true
        ]);

        $response = $this->getJson('/api/projects/test-single');

        $response->assertStatus(200)
            ->assertJsonPath('data.slug', 'test-single');
    }

    public function test_returns_404_for_non_existent_project()
    {
        $response = $this->getJson('/api/projects/not-exist');

        $response->assertStatus(404);
    }

    public function test_only_published_projects_are_returned()
    {
        Project::factory()->create([
            'title' => 'Published Project',
            'slug' => 'published',
            'is_published' => true
        ]);

        Project::factory()->create([
            'title' => 'Draft Project',
            'slug' => 'draft',
            'is_published' => false
        ]);

        $response = $this->getJson('/api/projects');

        $response->assertStatus(200);
        $response->assertSee('Published Project');
        $response->assertDontSee('Draft Project');
    }
}