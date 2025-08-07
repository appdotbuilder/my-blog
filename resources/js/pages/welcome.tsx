import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
    }>;
}

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            is_admin: boolean;
        };
    };
    latest_articles?: Article[];
    [key: string]: unknown;
}

export default function Welcome({ auth, latest_articles = [] }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    📚 PersonalBlog
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/articles"
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Articles
                                    </Link>
                                    {auth.user.is_admin && (
                                        <Link
                                            href="/admin"
                                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <Link
                                        href="/dashboard"
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Your Personal</span>{' '}
                                    <span className="block text-blue-600 xl:inline">Blog Platform</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Discover amazing content, join our community, and get access to exclusive premium articles. 
                                    Start your journey with our modern, mobile-friendly blog platform.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link href="/articles">
                                            <Button size="lg" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                                                📖 Explore Articles
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link href="/subscriptions">
                                            <Button variant="outline" size="lg" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                                                ⭐ Go Premium
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <div className="h-56 w-full bg-gradient-to-r from-blue-400 to-purple-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
                        <div className="text-white text-6xl">📰</div>
                    </div>
                </div>
            </div>

            {/* Latest Articles Section */}
            {latest_articles.length > 0 && (
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                📚 Latest Articles
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Discover our newest content and insights
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latest_articles.map((article) => (
                                <Card key={article.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                                                {article.title}
                                            </h3>
                                            {article.is_premium && (
                                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex-shrink-0">
                                                    💎
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="text-sm text-gray-500 mb-3">
                                            By {article.author.name} • {new Date(article.published_at).toLocaleDateString()}
                                        </div>
                                        
                                        {article.excerpt && (
                                            <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        
                                        <div className="mt-auto">
                                            <Link href={`/articles/${article.slug}`}>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Read More
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        
                        <div className="text-center mt-8">
                            <Link href="/articles">
                                <Button size="lg">
                                    📖 View All Articles
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need for great content
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <Card className="p-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                                            📱
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Mobile-First Design</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Responsive design that looks great on all devices. Read anywhere, anytime.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white text-2xl">
                                            🔒
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Premium Content</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Access exclusive premium articles with your subscription. Quality content curated for you.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-2xl">
                                            🏷️
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Tagged Articles</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Find content easily with our comprehensive tagging system. Discover related articles.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white text-2xl">
                                            ⚡
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Fast & Secure</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            Built with modern technology. Fast loading times and secure payment processing.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block">Start reading today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-200">
                        Join thousands of readers who trust us for quality content. Get started with a free account.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link href="/register">
                            <Button size="lg" variant="secondary">
                                🚀 Get Started Free
                            </Button>
                        </Link>
                        <Link href="/subscriptions">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700">
                                💎 View Premium Plans
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <p className="text-gray-400 text-sm">
                            Built with Laravel + React + Inertia.js
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2024 PersonalBlog. Made with ❤️ for content creators.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}