import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    is_premium: boolean;
    published_at: string;
    author: {
        id: number;
        name: string;
    };
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

interface Props {
    article: Article;
    [key: string]: unknown;
}

export default function ArticleShow({ article }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; is_admin: boolean } | null } }>().props;

    const canEdit = auth?.user && (auth.user.is_admin || auth.user.id === article.author.id);

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/articles" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            ← Back to Articles
                        </Link>
                        {canEdit && (
                            <div className="flex space-x-2">
                                <Link href={`/articles/${article.slug}/edit`}>
                                    <Button variant="outline" size="sm">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                        {article.is_premium && (
                            <Badge variant="secondary">💎 Premium</Badge>
                        )}
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {article.title}
                    </h1>
                    
                    <div className="flex items-center text-gray-600 mb-6">
                        <span className="font-medium">By {article.author.name}</span>
                        <span className="mx-3">•</span>
                        <span>
                            {new Date(article.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                    
                    {/* Tags */}
                    {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {article.tags.map((tag) => (
                                <Badge key={tag.id} variant="outline">
                                    🏷️ {tag.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <div 
                        className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-lg">
                                    {article.author.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{article.author.name}</p>
                                <p className="text-sm text-gray-500">Author</p>
                            </div>
                        </div>
                        
                        {!article.is_premium && auth?.user && (
                            <Link href="/subscriptions">
                                <Button>
                                    ⭐ Upgrade for Premium Content
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Related Articles CTA */}
                <div className="mt-8 text-center">
                    <Link href="/articles">
                        <Button variant="outline" size="lg">
                            📚 Read More Articles
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}