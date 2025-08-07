<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Display subscription plans.
     */
    public function index()
    {
        $current_subscription = auth()->check() 
            ? auth()->user()->activeSubscription 
            : null;

        return Inertia::render('subscriptions/index', [
            'current_subscription' => $current_subscription
        ]);
    }

    /**
     * Show the premium subscription form.
     */
    public function create()
    {
        return Inertia::render('subscriptions/create');
    }

    /**
     * Process subscription payment.
     */
    public function store(Request $request)
    {
        $request->validate([
            'payment_provider' => 'required|in:xendit,midtrans',
            'payment_data' => 'required|array',
        ]);

        // Create subscription
        $subscription = Subscription::create([
            'user_id' => auth()->id(),
            'type' => 'premium',
            'status' => 'active',
            'price' => 99000, // IDR 99,000 per month
            'starts_at' => now(),
            'ends_at' => now()->addMonth(),
            'payment_provider' => $request->payment_provider,
            'payment_id' => $request->payment_data['payment_id'] ?? null,
            'payment_data' => $request->payment_data,
        ]);

        return redirect()->route('subscriptions.index')
            ->with('success', 'Premium subscription activated successfully!');
    }

    /**
     * Cancel subscription.
     */
    public function destroy(Subscription $subscription)
    {
        if (auth()->id() !== $subscription->user_id) {
            abort(403, 'You can only cancel your own subscription.');
        }
        
        $subscription->update(['status' => 'cancelled']);

        return redirect()->route('subscriptions.index')
            ->with('success', 'Subscription cancelled successfully.');
    }
}