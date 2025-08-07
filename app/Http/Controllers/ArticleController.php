<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\Tag;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with(['author', 'tags'])
            ->published()
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('articles/index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Only admins can create articles.');
        }
        
        $tags = Tag::all();
        
        return Inertia::render('articles/create', [
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        if (!auth()->user()->is_admin) {
            abort(403, 'Only admins can create articles.');
        }
        
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        
        $article = Article::create($validated);
        
        // Attach tags
        if (!empty($validated['tag_ids'])) {
            $article->tags()->attach($validated['tag_ids']);
        }

        return redirect()->route('articles.show', $article->slug)
            ->with('success', 'Article created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $article = Article::with(['author', 'tags'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Check if article is published
        if (!$article->is_published && (!auth()->check() || !auth()->user()->is_admin)) {
            abort(404);
        }

        // Check premium access
        if ($article->is_premium && (!auth()->check() || !auth()->user()->canAccessPremiumContent())) {
            return Inertia::render('articles/premium-required', [
                'article' => [
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'published_at' => $article->published_at,
                    'author' => $article->author,
                    'tags' => $article->tags,
                ]
            ]);
        }

        return Inertia::render('articles/show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        if (!auth()->user()->is_admin && auth()->id() !== $article->user_id) {
            abort(403, 'You can only edit your own articles.');
        }
        
        $tags = Tag::all();
        $article->load('tags');
        
        return Inertia::render('articles/edit', [
            'article' => $article,
            'tags' => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        if (!auth()->user()->is_admin && auth()->id() !== $article->user_id) {
            abort(403, 'You can only edit your own articles.');
        }
        
        $validated = $request->validated();
        $article->update($validated);
        
        // Sync tags
        if (isset($validated['tag_ids'])) {
            $article->tags()->sync($validated['tag_ids']);
        }

        return redirect()->route('articles.show', $article->slug)
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        if (!auth()->user()->is_admin && auth()->id() !== $article->user_id) {
            abort(403, 'You can only delete your own articles.');
        }
        
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article deleted successfully.');
    }
}