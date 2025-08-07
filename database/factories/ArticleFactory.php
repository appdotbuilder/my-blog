<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(random_int(4, 8));
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => $this->faker->paragraph(2),
            'content' => $this->generateArticleContent(),
            'is_premium' => $this->faker->boolean(30), // 30% chance of being premium
            'is_published' => true,
            'published_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Generate realistic article content.
     */
    protected function generateArticleContent(): string
    {
        $paragraphs = [];
        
        // Introduction
        $paragraphs[] = '<p>' . $this->faker->paragraph(4) . '</p>';
        
        // Main content sections
        for ($i = 0; $i < random_int(3, 6); $i++) {
            $paragraphs[] = '<h2>' . $this->faker->sentence(3) . '</h2>';
            $paragraphs[] = '<p>' . $this->faker->paragraph(5) . '</p>';
            $paragraphs[] = '<p>' . $this->faker->paragraph(4) . '</p>';
        }
        
        // Conclusion
        $paragraphs[] = '<h2>Conclusion</h2>';
        $paragraphs[] = '<p>' . $this->faker->paragraph(3) . '</p>';
        
        return implode("\n\n", $paragraphs);
    }

    /**
     * Indicate that the article is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_premium' => true,
        ]);
    }

    /**
     * Indicate that the article is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => false,
            'published_at' => null,
        ]);
    }
}