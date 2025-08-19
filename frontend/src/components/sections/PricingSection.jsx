
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Dumbbell, Heart, Users, Target, TrendingUp, Check, X, Star, Crown, Camera } from 'lucide-react';
import { createOrder, verifyPayment } from '../../services/paymentService';

const PricingSection = () => {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 1,
      name: "Free",
      price: 0,
      period: "month",
      icon: <Camera className="w-6 h-6" />, // You can change the icon if desired
      features: [
        { name: "5 meal plans monthly", included: true },
        { name: "Recipe library", included: true },
        { name: "Join the community", included: false }
      ],
      buttonText: "Default",
      buttonStyle: "btn-outline text-black bg-white",
      popular: false
    },
    {
      id: 2,
      name: "Premium",
      price: 49,
      period: "month",
      icon: <Crown className="w-6 h-6" />, // You can change the icon if desired
      features: [
        { name: "Unlimited meal plans", included: true },
        { name: "Recipe library", included: true },
        { name: "Join the community", included: true }
      ],
      buttonText: "Select Premium",
      buttonStyle: "btn-outline text-black bg-white",
      popular: false
    }
  ];

  // Razorpay handler
  const handlePremiumPurchase = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const order = await createOrder('PRO'); // plan key as per backend enum
      const options = {
        key: order.keyId, // Razorpay key from backend
        amount: order.amount, // in paise
        currency: order.currency,
        name: 'FitMeal Planner',
        description: 'Premium Subscription',
        order_id: order.orderId, // Razorpay order ID
        handler: async function (response) {
          try {
            console.log('Razorpay payment response:', response);
            
            // Helper function to extract payment data from various response formats
            const extractPaymentData = (response) => {
              console.log('Raw Razorpay response:', JSON.stringify(response, null, 2));
              
              if (response.razorpay_payment_id) {
          
                const constructedData = {
                  razorpayOrderId: response.razorpay_order_id, 
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature:  response.razorpay_signature, 
                };
                
                console.log('Constructed verification data:', constructedData);               
                return constructedData;
              }
              
              // If no format works, log all available fields for debugging
              console.error('Available fields in response:', Object.keys(response));
              console.error('Response values:', Object.values(response));
              
              return null;
            };
            
            // 2. Extract payment verification data
            const verificationData = extractPaymentData(response);
            
            if (!verificationData) {
              console.error('Could not extract payment data from response:', response);
              throw new Error('Unable to extract payment verification data from Razorpay response');
            }
            
            console.log('Sending verification data:', verificationData);
            
            const verifyRes = await verifyPayment(verificationData);
            alert(verifyRes.message || 'Payment successful! Premium activated.');
            window.location.reload();
          } catch (verificationError) {
            console.error('Payment verification failed:', verificationError);
            alert('Payment verification failed: ' + (verificationError.message || 'Unknown error'));
          }
        },
        prefill: {},
        theme: { color: '#06b6d4' },
        modal: {
          ondismiss: function() {
            console.log('Razorpay modal dismissed');
            setLoading(false);
          }
        },
        // Handle payment failure
        onError: function(error) {
          console.error('Razorpay payment error:', error);
          alert('Payment failed: ' + (error.error?.description || error.error?.message || 'Unknown error'));
          setLoading(false);
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Order creation failed:', err);
      alert(err.message || 'Payment failed.');
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose your plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select the perfect plan for your health journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-cyan-50 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-cyan-100' 
                  : 'border-cyan-50 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    plan.popular ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
                    <span className="text-gray-500">/ {plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`btn w-full ${plan.buttonStyle} text-base font-semibold py-3 rounded-xl transition-all duration-300`}
                  onClick={
                    plan.name === 'Premium' ? handlePremiumPurchase : undefined
                  }
                  disabled={loading && plan.name === 'Premium'}
                >
                  {loading && plan.name === 'Premium' ? 'Processing...' : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            All plans include 7-day free trial • Cancel anytime
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              No setup fees
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              24/7 support
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              Secure payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PricingSection;

