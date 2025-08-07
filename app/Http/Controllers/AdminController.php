<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use App\Models\Subscription;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Admin access required.');
        }
        
        $stats = [
            'total_articles' => Article::count(),
            'published_articles' => Article::published()->count(),
            'premium_articles' => Article::premium()->count(),
            'total_users' => User::count(),
            'premium_subscribers' => Subscription::active()->premium()->count(),
            'total_revenue' => Subscription::active()->premium()->sum('price'),
        ];
        
        $recent_articles = Article::with(['author', 'tags'])
            ->latest()
            ->take(5)
            ->get();
            
        $recent_users = User::latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/index', [
            'stats' => $stats,
            'recent_articles' => $recent_articles,
            'recent_users' => $recent_users,
        ]);
    }


}