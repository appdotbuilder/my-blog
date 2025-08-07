import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    tags: Tag[];
    [key: string]: unknown;
}

export default function ArticlesCreate({ tags }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        is_premium: boolean;
        is_published: boolean;
        tag_ids: number[];
    }>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        is_premium: false,
        is_published: true,
        tag_ids: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    const handleTagToggle = (tagId: number) => {
        const newTagIds = data.tag_ids.includes(tagId)
            ? data.tag_ids.filter(id => id !== tagId)
            : [...data.tag_ids, tagId];
        setData('tag_ids', newTagIds);
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/articles" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 block">
                            ← Back to Articles
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">✍️ Create New Article</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>📝 Article Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter article title..."
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Slug */}
                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                    URL Slug
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="leave-blank-for-auto-generation"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Leave blank to auto-generate from title
                                </p>
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    rows={3}
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Brief summary of the article..."
                                />
                                {errors.excerpt && (
                                    <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <textarea
                                    id="content"
                                    rows={15}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    placeholder="Write your article content here... You can use HTML tags for formatting."
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
                                </p>
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>🏷️ Tags & Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant={data.tag_ids.includes(tag.id) ? 'default' : 'outline'}
                                            className="cursor-pointer"
                                            onClick={() => handleTagToggle(tag.id)}
                                        >
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Settings */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_premium"
                                        checked={data.is_premium}
                                        onChange={(e) => setData('is_premium', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_premium" className="ml-2 block text-sm text-gray-900">
                                        💎 Premium article (requires subscription)
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_published"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                                        📢 Publish immediately
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <Link href="/articles">
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        
                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setData('is_published', false);
                                    setTimeout(() => post(route('articles.store')), 100);
                                }}
                                disabled={processing}
                            >
                                💾 Save Draft
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Creating...
                                    </>
                                ) : (
                                    '🚀 Publish Article'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}