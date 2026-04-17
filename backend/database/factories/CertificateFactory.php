<?php

namespace Database\Factories;

use App\Models\Certificate;
use Illuminate\Database\Eloquent\Factories\Factory;

class CertificateFactory extends Factory
{
    protected $model = Certificate::class;

    public function definition(): array
    {
        $categories = ['course', 'bootcamp', 'competition', 'professional', 'language', 'workshop', 'academic'];
        $hasExpiry = $this->faker->boolean(20);
        
        return [
            'title' => $this->faker->sentence(3),
            'issuer' => $this->faker->randomElement(['Dicoding', 'Coursera', 'Udemy', 'Google', 'AWS', 'Microsoft', 'Harver']),
            'issuer_logo' => $this->faker->imageUrl(100, 100, 'logo', true),
            'credential_id' => strtoupper($this->faker->bothify('???#???###')),
            'credential_url' => $this->faker->url(),
            'image' => $this->faker->imageUrl(400, 300, 'certificate', true),
            'issued_date' => $this->faker->dateTimeBetween('-3 years', 'now'),
            'expiry_date' => $hasExpiry ? $this->faker->dateTimeBetween('now', '+2 years') : null,
            'skills' => json_encode($this->faker->randomElements([
                'Laravel', 'React', 'Node.js', 'Python', 'Machine Learning',
                'Cloud Computing', 'DevOps', 'Docker', 'Kubernetes'
            ], 3)),
            'category' => $this->faker->randomElement($categories),
            'is_featured' => $this->faker->boolean(20),
            'sort_order' => $this->faker->numberBetween(0, 10),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    public function category(string $category): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => $category,
        ]);
    }
}