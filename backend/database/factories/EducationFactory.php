<?php

namespace Database\Factories;

use App\Models\Education;
use Illuminate\Database\Eloquent\Factories\Factory;

class EducationFactory extends Factory
{
    protected $model = Education::class;

    public function definition(): array
    {
        $startYear = $this->faker->numberBetween(2010, 2022);
        $endYear = $startYear + $this->faker->numberBetween(2, 5);
        $isCurrent = $this->faker->boolean(10);

        return [
            'institution' => $this->faker->company() . ' University',
            'degree' => $this->faker->randomElement(['Sarjana Komputer', 'Sarjana Teknik', 'Magister Ilmu Komputer', 'Diploma Informatika']),
            'field_of_study' => $this->faker->randomElement(['Teknik Informatika', 'Sistem Informasi', 'Ilmu Komputer', 'Teknologi Informasi']),
            'grade' => $this->faker->randomElement(['3.85 GPA', '3.90 GPA', '4.00 GPA', '90.5', 'Cumlaude']),
            'logo' => $this->faker->imageUrl(100, 100, 'education', true),
            'start_date' => "{$startYear}-08-01",
            'end_date' => $isCurrent ? null : "{$endYear}-06-30",
            'is_current' => $isCurrent,
            'description' => $this->faker->paragraph(2),
            'sort_order' => $this->faker->numberBetween(0, 10),
        ];
    }

    public function current(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_current' => true,
            'end_date' => null,
        ]);
    }

    public function graduated(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_current' => false,
        ]);
    }
}
