import { useState } from "react";
import { Check, X, Crown, Zap } from "lucide-react";
import { createOrder } from "../../services/paymentService";
import toast from "react-hot-toast";

const PricingSection = () => {
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Get started with smart meal planning",
    buttonText: "Current Plan",
    disabled: true,
    popular: false,
    features: [
      { name: "Create up to 3 meal plans / month", included: true },
      { name: "2 meal suggestions per day", included: true },
      { name: "Browse meals & recipes", included: false },
      { name: "Save favorite meals", included: false },
    ],
  },
  {
    name: "PRO",
    price: 49,
    description: "Unlimited access for serious goals",
    buttonText: "Upgrade to PRO",
    disabled: false,
    popular: true,
    features: [
      { name: "Unlimited meal plans", included: true },
      { name: "Unlimited meal suggestions", included: true },
      { name: "Browse full meal database", included: true },
      { name: "Save & manage favorite meals", included: true },
    ],
  },
];


  const handlePremiumPurchase = async () => {
    setLoading(true);

    try {
      // 1️⃣ Create order on backend
      const order = await createOrder("PRO");

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "FitMeal Planner",
        description: "Premium Subscription",
        order_id: order.razorpayOrderId,

        handler: function (response) {
          console.log("Payment completed:", response);

          toast.success(
            "Payment received! Activating your subscription. Please wait..."
          );

          // Give webhook time to process
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: { color: "#06b6d4" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-4 bg-base-200/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-base-content">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your health goals. No hidden fees.
          </p>

          {/* Billing Toggle (Visual) */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-base-content' : 'text-base-content/50'}`}>Monthly</span>
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              checked={billingCycle === 'yearly'}
              onChange={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            />
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-base-content' : 'text-base-content/50'}`}>
              Yearly <span className="badge badge-sm badge-primary ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-base-100 rounded-3xl p-8 transition-all duration-300 ${
              plan.popular 
                ? "shadow-2xl border-2 border-primary scale-105 z-10" 
                : "shadow-lg border border-base-200 hover:shadow-xl"
            }`}
          >

            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-2xl ${plan.popular ? 'bg-primary/10 text-primary' : 'bg-base-200 text-base-content/70'}`}>
                {plan.popular ? <Crown size={24} /> : <Zap size={24} />}
              </div>
              <div>
              <h3 className="text-2xl font-bold text-base-content">{plan.name}</h3>
                <p className="text-sm text-base-content/60">{plan.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-5xl font-extrabold text-base-content">${billingCycle === 'yearly' ? (plan.price * 12 * 0.8).toFixed(0) : plan.price}</span>
              <span className="text-base-content/60 font-medium"> / {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${f.included ? 'bg-success/10 text-success' : 'bg-base-200 text-base-content/20'}`}>
                    {f.included ? <Check size={14} /> : <X size={14} />}
                  </div>
                  <span
                    className={f.included ? "text-base-content" : "text-base-content/40"}
                  >
                    {f.name}
                  </span>
                </div>
              ))}
            </div>

            <button
              className={`btn w-full rounded-xl h-12 text-lg ${plan.popular ? 'btn-primary shadow-primary/30 shadow-lg' : 'btn-outline'}`}
              disabled={plan.disabled || loading}
              onClick={
                plan.name === "Premium" ? handlePremiumPurchase : undefined
              }
            >
              {loading && plan.name === "Premium"
                ? "Processing..."
                : plan.buttonText}
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
