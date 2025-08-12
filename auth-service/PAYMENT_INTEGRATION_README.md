# Payment Gateway Integration with Razorpay

This document describes the integration of Razorpay payment gateway for subscription-based access to the AI Meal Planner API.

## Overview

The system now supports two subscription tiers:
- **Free Plan**: 10 API calls per month
- **Pro Plan**: 100 API calls per month at ₹999/month

## Features

### 1. Subscription Management
- Automatic free plan assignment for new users
- Pro plan upgrade through Razorpay
- Subscription status tracking
- API call counting and rate limiting

### 2. Payment Processing
- Secure payment through Razorpay
- Payment verification and signature validation
- Transaction history tracking
- Automatic subscription activation

### 3. API Rate Limiting
- Real-time API call tracking
- Automatic rate limiting based on subscription
- Graceful error handling for exceeded limits

## Configuration

### 1. Razorpay Keys
Add your Razorpay credentials to `application.properties`:

```properties
razorpay.key.id=rzp_test_YOUR_KEY_ID
razorpay.key.secret=YOUR_SECRET_KEY
```

### 2. Subscription Plans
Plans are defined in `SubscriptionPlan` enum:
- **FREE**: 0 paise, 10 API calls/month
- **PRO**: 99900 paise (₹999), 100 API calls/month

## API Endpoints

### Payment Endpoints
- `POST /api/payments/v1/create-order` - Create payment order
- `POST /api/payments/v1/verify-payment` - Verify payment completion
- `GET /api/payments/v1/subscription` - Get current subscription
- `POST /api/payments/v1/upgrade-free` - Upgrade to free plan
- `POST /api/payments/v1/cancel` - Cancel subscription
- `GET /api/payments/v1/api-calls/remaining` - Check remaining API calls

### Subscription Plan Endpoints
- `GET /api/subscription-plans` - Get available plans (public)

## Usage Flow

### 1. User Registration
- New users automatically get FREE plan
- 10 API calls per month allocated

### 2. Pro Plan Upgrade
1. User calls `/create-order` with PRO plan
2. Frontend receives order details
3. User completes payment on Razorpay
4. Frontend calls `/verify-payment` with payment details
5. Subscription upgraded to PRO plan
6. 100 API calls per month allocated

### 3. API Usage
- Each API call decrements remaining count
- Rate limiting enforced in real-time
- Users with 0 remaining calls get 429 error

## Frontend Integration

### 1. Create Order
```javascript
const response = await fetch('/api/payments/v1/create-order', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ plan: 'PRO' })
});

const orderData = await response.json();
// Use orderData.keyId, orderData.orderId, orderData.amount
```

### 2. Handle Payment
```javascript
// After successful Razorpay payment
const verification = await fetch('/api/payments/v1/verify-payment', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({
    razorpayPaymentId: paymentId,
    razorpayOrderId: orderId,
    razorpaySignature: signature
  })
});
```

### 3. Check Subscription Status
```javascript
const subscription = await fetch('/api/payments/v1/subscription', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Security Features

### 1. Payment Verification
- Razorpay signature validation
- Payment status verification
- Transaction integrity checks

### 2. Rate Limiting
- Per-user API call tracking
- Real-time enforcement
- Configurable limits per plan

### 3. Access Control
- JWT-based authentication
- Role-based authorization
- Subscription-based feature access

## Database Schema

### Subscription Collection
```json
{
  "id": "subscription_id",
  "userId": "user_id",
  "userEmail": "user@example.com",
  "plan": "PRO",
  "status": "ACTIVE",
  "startDate": "2024-01-01T00:00:00",
  "endDate": "2024-02-01T00:00:00",
  "remainingApiCalls": 95,
  "totalApiCalls": 100
}
```

### Payment Transaction Collection
```json
{
  "id": "transaction_id",
  "userId": "user_id",
  "plan": "PRO",
  "razorpayPaymentId": "pay_xxx",
  "razorpayOrderId": "order_xxx",
  "amount": 999.0,
  "status": "SUCCESS"
}
```

## Monitoring and Analytics

### 1. Subscription Metrics
- Active subscriptions by plan
- Revenue tracking
- Churn rate analysis

### 2. API Usage Analytics
- API calls per user
- Peak usage patterns
- Plan utilization rates

## Error Handling

### 1. Payment Failures
- Graceful error responses
- Transaction rollback
- User notification

### 2. Rate Limit Exceeded
- HTTP 429 status
- Clear error message
- Upgrade suggestion

## Testing

### 1. Test Mode
- Use Razorpay test keys
- Test payment flows
- Mock payment verification

### 2. Integration Tests
- Payment flow testing
- Rate limiting validation
- Subscription management

## Production Considerations

### 1. Security
- Implement proper signature verification
- Use HTTPS for all endpoints
- Secure key management

### 2. Scalability
- Database indexing for queries
- Caching for subscription data
- Load balancing for high traffic

### 3. Monitoring
- Payment success/failure rates
- API usage patterns
- System performance metrics

## Support and Troubleshooting

### Common Issues
1. **Payment verification fails**: Check signature validation
2. **Rate limiting not working**: Verify interceptor configuration
3. **Subscription not created**: Check database connections

### Debug Endpoints
- `/actuator/health` - System health
- `/actuator/metrics` - Performance metrics
- `/actuator/loggers` - Log level management

## Future Enhancements

### 1. Additional Plans
- Enterprise plan with unlimited calls
- Custom plan creation
- Volume-based pricing

### 2. Advanced Features
- Webhook support for payment events
- Automatic subscription renewal
- Prorated billing for mid-month upgrades

### 3. Analytics Dashboard
- Real-time subscription metrics
- Revenue analytics
- User behavior insights
