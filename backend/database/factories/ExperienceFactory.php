<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExperienceFactory extends Factory
{
    protected $model = Experience::class;

    public function definition(): array
    {
        $startYear = $this->faker->numberBetween(2015, 2023);
        $endYear = $startYear + $this->faker->numberBetween(1, 3);
        $isCurrent = $this->faker->boolean(20);

        return [
            'company' => $this->faker->company(),
            'position' => $this->faker->jobTitle(),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'company_logo' => $this->faker->imageUrl(100, 100, 'business', true),
            'description' => $this->faker->paragraphs(3, true),
            'technologies' => json_encode($this->faker->randomElements([
                'Laravel', 'React', 'Vue', 'Node.js', 'PHP', 'JavaScript',
                'Python', 'Docker', 'MySQL', 'PostgreSQL', 'Redis', 'AWS'
            ], 4)),
            'achievements' => json_encode([
                $this->faker->sentence(),
                $this->faker->sentence(),
            ]),
            'start_date' => "{$startYear}-01-01",
            'end_date' => $isCurrent ? null : "{$endYear}-12-31",
            'is_current' => $isCurrent,
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
}