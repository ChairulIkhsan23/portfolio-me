<?php

namespace Tests\Feature;

use App\Models\Certificate;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CertificateApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_certificates(): void
    {
        Certificate::factory()->count(3)->create();

        $response = $this->getJson('/api/certificates');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'issuer', 'issued_date', 'category']
                ],
                'links',
                'meta'
            ]);
    }

    public function test_can_get_single_certificate(): void
    {
        $certificate = Certificate::factory()->create([
            'title' => 'Laravel Certification',
            'issuer' => 'Laravel Academy'
        ]);

        $response = $this->getJson('/api/certificates/' . $certificate->id);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'Laravel Certification')
            ->assertJsonPath('data.issuer', 'Laravel Academy');
    }

    public function test_returns_404_for_non_existent_certificate(): void
    {
        $response = $this->getJson('/api/certificates/99999');

        $response->assertStatus(404);
    }

    public function test_pagination_works(): void
    {
        Certificate::factory()->count(15)->create();

        $response = $this->getJson('/api/certificates?per_page=5');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('meta.per_page', 5)
            ->assertJsonPath('meta.total', 15);
    }

    public function test_can_get_featured_certificates(): void
    {
        Certificate::factory()->featured()->count(3)->create();
        Certificate::factory()->count(5)->create();

        $response = $this->getJson('/api/certificates/featured?limit=3');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_filter_by_category(): void
    {
        Certificate::factory()->category('course')->count(2)->create();
        Certificate::factory()->category('bootcamp')->count(3)->create();

        $response = $this->getJson('/api/certificates?category=course');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    public function test_can_get_certificates_by_category_endpoint(): void
    {
        Certificate::factory()->category('course')->count(2)->create();

        $response = $this->getJson('/api/certificates/category/course');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    public function test_can_limit_results_with_per_page(): void
    {
        Certificate::factory()->count(10)->create();

        $response = $this->getJson('/api/certificates?per_page=3');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('meta.per_page', 3);
    }

    public function test_certificates_sorted_by_featured_and_date(): void
    {
        Certificate::factory()->featured()->create([
            'issued_date' => '2023-01-01',
            'title' => 'Featured Old'
        ]);
        
        Certificate::factory()->create([
            'issued_date' => '2024-01-01',
            'title' => 'New Normal'
        ]);

        Certificate::factory()->featured()->create([
            'issued_date' => '2025-01-01',
            'title' => 'Featured New'
        ]);

        $response = $this->getJson('/api/certificates');
        $data = $response->json('data');

        $this->assertEquals('Featured New', $data[0]['title']);
        $this->assertEquals('Featured Old', $data[1]['title']);
        $this->assertEquals('New Normal', $data[2]['title']);
    }
}