<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['free', 'premium']);
        $status = $this->faker->randomElement(['active', 'inactive', 'cancelled']);
        $startDate = $this->faker->dateTimeBetween('-6 months', 'now');
        
        return [
            'user_id' => User::factory(),
            'type' => $type,
            'status' => $status,
            'price' => $type === 'premium' ? 99000 : null, // IDR 99,000
            'starts_at' => $startDate,
            'ends_at' => $type === 'premium' && $status === 'active' 
                ? $this->faker->dateTimeBetween($startDate, '+1 year') 
                : null,
            'payment_provider' => $type === 'premium' ? $this->faker->randomElement(['xendit', 'midtrans']) : null,
            'payment_id' => $type === 'premium' ? $this->faker->uuid : null,
            'payment_data' => $type === 'premium' ? [
                'payment_method' => $this->faker->randomElement(['credit_card', 'bank_transfer', 'e_wallet']),
                'transaction_id' => $this->faker->uuid,
            ] : null,
        ];
    }

    /**
     * Indicate that the subscription is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'premium',
            'price' => 99000,
            'payment_provider' => $this->faker->randomElement(['xendit', 'midtrans']),
            'payment_id' => $this->faker->uuid,
            'payment_data' => [
                'payment_method' => $this->faker->randomElement(['credit_card', 'bank_transfer', 'e_wallet']),
                'transaction_id' => $this->faker->uuid,
            ],
        ]);
    }

    /**
     * Indicate that the subscription is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'ends_at' => $this->faker->dateTimeBetween('now', '+1 year'),
        ]);
    }
}