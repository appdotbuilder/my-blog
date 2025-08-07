import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Stats {
    total_articles: number;
    published_articles: number;
    premium_articles: number;
    total_users: number;
    premium_subscribers: number;
    total_revenue: number;
}

interface Article {
    id: number;
    title: string;
    author: { name: string };
    published_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recent_articles: Article[];
    recent_users: User[];
    [key: string]: unknown;
}

export default function AdminIndex({ stats, recent_articles, recent_users }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">⚡ Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Manage your blog content and users</p>
                    </div>
                    <Link href="/articles/create">
                        <Button>✍️ New Article</Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                            <div className="text-2xl">📚</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_articles}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.published_articles} published
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Premium Articles</CardTitle>
                            <div className="text-2xl">💎</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.premium_articles}</div>
                            <p className="text-xs text-muted-foreground">
                                Exclusive content
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <div className="text-2xl">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                Registered members
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Premium Subscribers</CardTitle>
                            <div className="text-2xl">⭐</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.premium_subscribers}</div>
                            <p className="text-xs text-muted-foreground">
                                Active premium users
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                            <div className="text-2xl">💰</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                IDR {stats.total_revenue.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                From subscriptions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                            <div className="text-2xl">⚡</div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Link href="/articles/create">
                                    <Button size="sm" className="w-full">New Article</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Articles */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>📰 Recent Articles</CardTitle>
                                <Link href="/articles">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_articles.length > 0 ? (
                                    recent_articles.map((article) => (
                                        <div key={article.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm line-clamp-1">{article.title}</h4>
                                                <p className="text-xs text-gray-500">
                                                    By {article.author.name} • {new Date(article.published_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No articles yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>👤 Recent Users</CardTitle>
                                <Link href="/dashboard">
                                    <Button variant="outline" size="sm">View Dashboard</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_users.length > 0 ? (
                                    recent_users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium text-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm">{user.name}</h4>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No users yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}