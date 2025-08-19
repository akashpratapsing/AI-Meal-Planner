# Frontend Integration Guide for Razorpay Payment

This guide shows how to integrate the Razorpay payment system into your frontend application.

## Prerequisites

1. Include Razorpay JavaScript SDK
2. Valid JWT token for authentication
3. Backend API endpoints accessible

## HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
    <title>AI Meal Planner - Subscription</title>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>
    <div id="subscription-container">
        <h2>Choose Your Plan</h2>
        
        <!-- Free Plan -->
        <div class="plan-card">
            <h3>Free Plan</h3>
            <p>10 API calls per month</p>
            <p>₹0/month</p>
            <button onclick="upgradeToFree()">Get Free Plan</button>
        </div>
        
        <!-- Pro Plan -->
        <div class="plan-card">
            <h3>Pro Plan</h3>
            <p>100 API calls per month</p>
            <p>₹999/month</p>
            <button onclick="upgradeToPro()">Upgrade to Pro</button>
        </div>
        
        <!-- Current Subscription Status -->
        <div id="current-subscription">
            <h3>Current Subscription</h3>
            <div id="subscription-details"></div>
        </div>
    </div>
</body>
</html>
```

## JavaScript Implementation

### 1. Configuration
```javascript
const API_BASE_URL = 'http://localhost:8081/api';
let authToken = localStorage.getItem('authToken'); // Get from your auth system

// API helper function
async function apiCall(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            ...options.headers
        }
    });
    
    if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
    }
    
    return response.json();
}
```

### 2. Get Current Subscription
```javascript
async function getCurrentSubscription() {
    try {
        const subscription = await apiCall('/payments/v1/subscription');
        displaySubscriptionDetails(subscription);
    } catch (error) {
        console.error('Failed to get subscription:', error);
    }
}

function displaySubscriptionDetails(subscription) {
    const container = document.getElementById('subscription-details');
    container.innerHTML = `
        <p><strong>Plan:</strong> ${subscription.plan.name}</p>
        <p><strong>Status:</strong> ${subscription.status}</p>
        <p><strong>Remaining API Calls:</strong> ${subscription.remainingApiCalls}</p>
        <p><strong>Total API Calls:</strong> ${subscription.totalApiCalls}</p>
        <p><strong>Next Billing:</strong> ${new Date(subscription.nextBillingDate).toLocaleDateString()}</p>
    `;
}
```

### 3. Upgrade to Free Plan
```javascript
async function upgradeToFree() {
    try {
        const subscription = await apiCall('/payments/v1/upgrade-free', {
            method: 'POST'
        });
        
        alert('Successfully upgraded to Free Plan!');
        getCurrentSubscription(); // Refresh display
    } catch (error) {
        console.error('Failed to upgrade to free plan:', error);
        alert('Failed to upgrade to free plan');
    }
}
```

### 4. Upgrade to Pro Plan
```javascript
async function upgradeToPro() {
    try {
        // Step 1: Create order
        const orderData = await apiCall('/payments/v1/create-order', {
            method: 'POST',
            body: JSON.stringify({
                plan: 'PRO',
                notes: 'Pro plan upgrade'
            })
        });
        
        // Step 2: Initialize Razorpay
        const options = {
            key: orderData.keyId,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'AI Meal Planner',
            description: 'Pro Plan Subscription',
            order_id: orderData.orderId,
            handler: function(response) {
                // Step 3: Verify payment
                verifyPayment(response, orderData.orderId);
            },
            prefill: {
                name: 'User Name', // Get from user profile
                email: 'user@example.com' // Get from user profile
            },
            theme: {
                color: '#3399cc'
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
        
    } catch (error) {
        console.error('Failed to create order:', error);
        alert('Failed to create payment order');
    }
}
```

### 5. Verify Payment
```javascript
async function verifyPayment(razorpayResponse, orderId) {
    try {
        const verification = await apiCall('/payments/v1/verify-payment', {
            method: 'POST',
            body: JSON.stringify({
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpayOrderId: orderId,
                razorpaySignature: razorpayResponse.razorpay_signature
            })
        });
        
        alert('Payment successful! Pro plan activated.');
        getCurrentSubscription(); // Refresh display
        
    } catch (error) {
        console.error('Payment verification failed:', error);
        alert('Payment verification failed. Please contact support.');
    }
}
```

### 6. Cancel Subscription
```javascript
async function cancelSubscription() {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
        return;
    }
    
    try {
        await apiCall('/payments/v1/cancel', {
            method: 'POST'
        });
        
        alert('Subscription cancelled successfully');
        getCurrentSubscription(); // Refresh display
        
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
        alert('Failed to cancel subscription');
    }
}
```

### 7. Check Remaining API Calls
```javascript
async function checkRemainingApiCalls() {
    try {
        const response = await apiCall('/payments/v1/api-calls/remaining');
        console.log(`Remaining API calls: ${response.remainingApiCalls}`);
        return response.remainingApiCalls;
    } catch (error) {
        console.error('Failed to check API calls:', error);
        return 0;
    }
}
```

## React Component Example

```jsx
import React, { useState, useEffect } from 'react';

const SubscriptionComponent = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getCurrentSubscription();
    }, []);
    
    const getCurrentSubscription = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/payments/v1/subscription', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = await response.json();
            setSubscription(data);
        } catch (error) {
            console.error('Failed to get subscription:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const upgradeToPro = async () => {
        // Implementation similar to JavaScript version
    };
    
    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="subscription-container">
            <h2>Subscription Plans</h2>
            
            {/* Plan Cards */}
            <div className="plans-grid">
                <div className="plan-card">
                    <h3>Free Plan</h3>
                    <p>10 API calls/month</p>
                    <p>₹0/month</p>
                    <button onClick={() => upgradeToFree()}>
                        Get Free Plan
                    </button>
                </div>
                
                <div className="plan-card">
                    <h3>Pro Plan</h3>
                    <p>100 API calls/month</p>
                    <p>₹999/month</p>
                    <button onClick={upgradeToPro}>
                        Upgrade to Pro
                    </button>
                </div>
            </div>
            
            {/* Current Subscription */}
            {subscription && (
                <div className="current-subscription">
                    <h3>Current Subscription</h3>
                    <p>Plan: {subscription.plan.name}</p>
                    <p>Status: {subscription.status}</p>
                    <p>Remaining Calls: {subscription.remainingApiCalls}</p>
                </div>
            )}
        </div>
    );
};

export default SubscriptionComponent;
```

## Error Handling

### 1. Network Errors
```javascript
function handleApiError(error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Network error. Please check your connection.');
    } else if (error.message.includes('401')) {
        alert('Authentication failed. Please login again.');
        // Redirect to login
    } else if (error.message.includes('429')) {
        alert('API rate limit exceeded. Please upgrade your plan.');
    } else {
        alert('An error occurred. Please try again.');
    }
}
```

### 2. Payment Errors
```javascript
function handlePaymentError(error) {
    if (error.error && error.error.description) {
        alert(`Payment failed: ${error.error.description}`);
    } else {
        alert('Payment failed. Please try again.');
    }
}
```

## Styling

### CSS for Plan Cards
```css
.plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.plan-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.plan-card h3 {
    color: #333;
    margin-bottom: 10px;
}

.plan-card button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 15px;
}

.plan-card button:hover {
    background: #0056b3;
}

.current-subscription {
    margin-top: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
}
```

## Testing

### 1. Test Mode
- Use Razorpay test keys
- Test with test card numbers
- Verify payment flows

### 2. Error Scenarios
- Test network failures
- Test invalid payments
- Test rate limiting

## Production Checklist

- [ ] Use production Razorpay keys
- [ ] Implement proper error handling
- [ ] Add loading states
- [ ] Test payment flows thoroughly
- [ ] Monitor payment success rates
- [ ] Implement retry mechanisms
- [ ] Add analytics tracking
