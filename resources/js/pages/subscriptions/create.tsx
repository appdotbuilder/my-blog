import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SubscriptionsCreate() {
    const [paymentProvider, setPaymentProvider] = useState<'xendit' | 'midtrans'>('xendit');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        
        // In a real implementation, you would integrate with Xendit/Midtrans SDK here
        // For demo purposes, we'll simulate a successful payment
        
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const paymentData = {
                payment_id: `${paymentProvider}_${Date.now()}`,
                amount: 99000,
                currency: 'IDR',
                status: 'completed',
                timestamp: new Date().toISOString()
            };

            router.post('/subscriptions', {
                payment_provider: paymentProvider,
                payment_data: paymentData
            });
            
        } catch (error) {
            console.error('Payment failed:', error);
            setIsProcessing(false);
        }
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <Link href="/subscriptions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        ← Back to Plans
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>💎</span>
                                <span>Premium Subscription</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Unlimited premium articles</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Email notifications</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Early access to new content</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-green-500">✅</div>
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Premium Plan (1 month)</span>
                                    <span>IDR 99,000</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>IDR 99,000</span>
                                </div>
                            </div>

                            <Alert>
                                <AlertDescription>
                                    🔒 Your subscription will automatically renew monthly. You can cancel anytime from your account settings.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    {/* Payment Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🔒 Secure Payment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Payment Provider Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Choose Payment Method
                                </label>
                                <div className="space-y-3">
                                    <div 
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                            paymentProvider === 'xendit' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setPaymentProvider('xendit')}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                checked={paymentProvider === 'xendit'}
                                                onChange={() => setPaymentProvider('xendit')}
                                                className="text-blue-600"
                                            />
                                            <div>
                                                <div className="font-medium">💳 Xendit</div>
                                                <div className="text-sm text-gray-500">
                                                    Credit card, bank transfer, e-wallets
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div 
                                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                            paymentProvider === 'midtrans' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setPaymentProvider('midtrans')}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                checked={paymentProvider === 'midtrans'}
                                                onChange={() => setPaymentProvider('midtrans')}
                                                className="text-blue-600"
                                            />
                                            <div>
                                                <div className="font-medium">🏦 Midtrans</div>
                                                <div className="text-sm text-gray-500">
                                                    All Indonesian payment methods
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="text-green-500 mt-0.5">🛡️</div>
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-900">Secure Payment</div>
                                        <div className="text-gray-600 mt-1">
                                            Your payment is processed securely using industry-standard encryption. 
                                            We never store your payment details.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Button */}
                            <Button 
                                onClick={handlePayment}
                                disabled={isProcessing}
                                size="lg"
                                className="w-full"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>🚀 Complete Payment - IDR 99,000</>
                                )}
                            </Button>

                            <p className="text-xs text-gray-500 text-center">
                                By completing this purchase, you agree to our Terms of Service and Privacy Policy. 
                                You can cancel your subscription at any time.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Money Back Guarantee */}
                <Card className="mt-8">
                    <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money Back Guarantee</h3>
                        <p className="text-gray-600">
                            Not satisfied with your premium subscription? Contact us within 30 days for a full refund, no questions asked.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}