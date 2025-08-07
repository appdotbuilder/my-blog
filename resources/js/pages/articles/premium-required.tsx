import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Article {
    title: string;
    excerpt: string | null;
    published_at: string;
    author: {
        name: string;
    };
    tags: Array<{
        id: number;
        name: string;
    }>;
}

interface Props {
    article: Article;
    [key: string]: unknown;
}

export default function PremiumRequired({ article }: Props) {
    return (
        <AppShell>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <Link href="/articles" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        ← Back to Articles
                    </Link>
                </div>

                <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                    <CardHeader>
                        <div className="text-center">
                            <div className="text-6xl mb-4">🔒</div>
                            <Badge variant="secondary" className="mb-4">
                                💎 Premium Content
                            </Badge>
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                                {article.title}
                            </CardTitle>
                            <div className="flex items-center justify-center text-gray-600 mb-6">
                                <span>By {article.author.name}</span>
                                <span className="mx-3">•</span>
                                <span>
                                    {new Date(article.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        {article.excerpt && (
                            <div className="text-center mb-8">
                                <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                                    {article.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Tags */}
                        {article.tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {article.tags.map((tag) => (
                                    <Badge key={tag.id} variant="outline">
                                        🏷️ {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="bg-white rounded-lg p-8 shadow-sm border">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    🚀 Unlock Premium Content
                                </h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    This article is exclusive to our premium members. Subscribe now to access this and hundreds of other premium articles.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
                                    <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">📚</div>
                                            <p className="font-medium">Unlimited Access</p>
                                            <p className="text-gray-500">Read all premium articles</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">🔔</div>
                                            <p className="font-medium">New Article Alerts</p>
                                            <p className="text-gray-500">Get notified of new content</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">💎</div>
                                            <p className="font-medium">Exclusive Content</p>
                                            <p className="text-gray-500">Premium-only articles & insights</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Link href="/subscriptions">
                                        <Button size="lg" className="w-full md:w-auto px-8">
                                            💎 Get Premium Access - Only $9/month
                                        </Button>
                                    </Link>
                                    
                                    <div className="text-sm text-gray-500">
                                        <p>Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800">Sign in</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/articles">
                                <Button variant="outline">
                                    📖 Browse Free Articles
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}