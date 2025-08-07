import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    is_premium: boolean;
    published_at: string;
    author: {
        name: string;
    };
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

interface Props {
    articles: {
        data: Article[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function ArticlesIndex({ articles }: Props) {
    const { auth } = usePage<{ auth: { user: { is_admin: boolean } | null } }>().props;

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📚 Latest Articles</h1>
                        <p className="text-gray-600 mt-2">Discover amazing content from our writers</p>
                    </div>
                    {auth?.user?.is_admin && (
                        <Link href="/articles/create">
                            <Button>✍️ Write Article</Button>
                        </Link>
                    )}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.data.map((article) => (
                        <Card key={article.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-xl leading-tight line-clamp-2">
                                        {article.title}
                                    </CardTitle>
                                    {article.is_premium && (
                                        <Badge variant="secondary" className="ml-2 flex-shrink-0">
                                            💎 Premium
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-2">
                                    <span>By {article.author.name}</span>
                                    <span className="mx-2">•</span>
                                    <span>
                                        {new Date(article.published_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="flex-1 flex flex-col">
                                {article.excerpt && (
                                    <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                                        {article.excerpt}
                                    </p>
                                )}
                                
                                {article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-4">
                                        {article.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag.id} variant="outline" className="text-xs">
                                                🏷️ {tag.name}
                                            </Badge>
                                        ))}
                                        {article.tags.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{article.tags.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                )}
                                
                                <div className="mt-4">
                                    <Link href={`/articles/${article.slug}`}>
                                        <Button 
                                            variant={article.is_premium ? "default" : "outline"} 
                                            className="w-full"
                                        >
                                            {article.is_premium ? '💎 Read Premium' : '📖 Read Article'}
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {articles.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📄</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
                        <p className="text-gray-500 mb-4">Be the first to publish an article!</p>
                        {auth?.user?.is_admin && (
                            <Link href="/articles/create">
                                <Button>✍️ Write First Article</Button>
                            </Link>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {articles.meta.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        {articles.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 text-sm rounded-md ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-3 py-2 text-sm text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}