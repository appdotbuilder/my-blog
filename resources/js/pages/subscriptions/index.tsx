import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Subscription {
    id: number;
    type: string;
    status: string;
    price: number;
    starts_at: string;
    ends_at: string | null;
}

interface Props {
    current_subscription: Subscription | null;
    [key: string]: unknown;
}

export default function SubscriptionsIndex({ current_subscription }: Props) {
    const handleCancelSubscription = () => {
        if (current_subscription && confirm('Are you sure you want to cancel your subscription?')) {
            router.delete(`/subscriptions/${current_subscription.id}`);
        }
    };

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        💎 Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get unlimited access to premium content and exclusive articles from our best writers.
                    </p>
                </div>

                {/* Current Subscription Status */}
                {current_subscription && (
                    <div className="mb-8">
                        <Card className="border-green-200 bg-green-50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-2xl">✅</div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-800">
                                                Active {current_subscription.type === 'premium' ? 'Premium' : 'Free'} Subscription
                                            </h3>
                                            <p className="text-green-600">
                                                {current_subscription.type === 'premium' && current_subscription.ends_at && (
                                                    `Expires on ${new Date(current_subscription.ends_at).toLocaleDateString()}`
                                                )}
                                                {current_subscription.type === 'free' && 'Free plan active'}
                                            </p>
                                        </div>
                                    </div>
                                    {current_subscription.type === 'premium' && current_subscription.status === 'active' && (
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={handleCancelSubscription}
                                        >
                                            Cancel Subscription
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Pricing Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <Card className="relative">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                🆓 Free Plan
                            </CardTitle>
                            <div className="text-4xl font-bold text-gray-900 mt-4">
                                $0<span className="text-lg font-normal text-gray-600">/month</span>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Access to all free articles</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Basic article search & filtering</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-gray-400">❌</div>
                                    <span className="text-gray-500">Premium articles</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-gray-400">❌</div>
                                    <span className="text-gray-500">Email notifications</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-gray-400">❌</div>
                                    <span className="text-gray-500">Early access to new content</span>
                                </div>
                            </div>
                            
                            <Button 
                                className="w-full" 
                                variant="outline"
                                disabled={current_subscription?.type === 'free'}
                            >
                                {current_subscription?.type === 'free' ? 'Current Plan' : 'Get Started Free'}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="relative border-2 border-blue-500 shadow-lg">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-blue-500 text-white px-4 py-1">
                                🌟 Most Popular
                            </Badge>
                        </div>
                        
                        <CardHeader className="text-center pb-6 pt-8">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                💎 Premium Plan
                            </CardTitle>
                            <div className="text-4xl font-bold text-blue-600 mt-4">
                                $9<span className="text-lg font-normal text-gray-600">/month</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Everything in Free plan</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span className="font-medium">Unlimited premium articles</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span className="font-medium">Email notifications for new articles</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span className="font-medium">Early access to new content</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span className="font-medium">Exclusive premium-only articles</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span className="font-medium">Cancel anytime</span>
                                </div>
                            </div>
                            
                            <Link href="/subscriptions/create">
                                <Button 
                                    className="w-full" 
                                    size="lg"
                                    disabled={current_subscription?.type === 'premium'}
                                >
                                    {current_subscription?.type === 'premium' ? 'Current Plan' : '🚀 Upgrade to Premium'}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Methods */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        🔒 Secure Payment Methods
                    </h3>
                    
                    <div className="flex justify-center items-center space-x-8 opacity-75">
                        <div className="text-center">
                            <div className="text-4xl mb-2">💳</div>
                            <p className="text-sm text-gray-600">Credit Cards</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-2">🏦</div>
                            <p className="text-sm text-gray-600">Bank Transfer</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-2">📱</div>
                            <p className="text-sm text-gray-600">E-Wallets</p>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6 max-w-2xl mx-auto">
                        Payments powered by Xendit and Midtrans - industry-leading payment processors trusted by millions.
                        Your payment information is always secure and encrypted.
                    </p>
                </div>

                {/* FAQ */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                        ❓ Frequently Asked Questions
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                                <p className="text-gray-600 text-sm">
                                    Yes! You can cancel your premium subscription at any time. You'll continue to have access until the end of your current billing period.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                                <p className="text-gray-600 text-sm">
                                    We accept all major credit cards, bank transfers, and popular e-wallets through our secure payment partners Xendit and Midtrans.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-gray-900 mb-2">How much premium content is available?</h4>
                                <p className="text-gray-600 text-sm">
                                    We publish new premium articles regularly, with exclusive in-depth content that's only available to premium subscribers.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-gray-900 mb-2">Is my payment information secure?</h4>
                                <p className="text-gray-600 text-sm">
                                    Absolutely. We use industry-standard encryption and trusted payment processors. We never store your payment details on our servers.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}