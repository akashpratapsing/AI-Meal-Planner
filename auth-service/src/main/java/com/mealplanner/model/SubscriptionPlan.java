package com.mealplanner.model;

public enum SubscriptionPlan {
    FREE("Free", 0, 3, 50, false), // 3 generate calls/month, 50 API calls/day
    PRO("Pro", 99900, -1, 100, true); // Unlimited generate calls, 100 API calls/day

    private final String name;
    private final int priceInPaise; // Razorpay expects amount in paise
    private final int monthlyGenerateCalls; // -1 means unlimited
    private final int dailyApiCalls; // Daily rate limit for other APIs
    private final boolean hasPremiumFeatures;

    SubscriptionPlan(String name, int priceInPaise, int monthlyGenerateCalls, int dailyApiCalls, boolean hasPremiumFeatures) {
        this.name = name;
        this.priceInPaise = priceInPaise;
        this.monthlyGenerateCalls = monthlyGenerateCalls;
        this.dailyApiCalls = dailyApiCalls;
        this.hasPremiumFeatures = hasPremiumFeatures;
    }

    public String getName() {
        return name;
    }

    public int getPriceInPaise() {
        return priceInPaise;
    }

    public int getPriceInRupees() {
        return priceInPaise / 100;
    }

    public int getMonthlyGenerateCalls() {
        return monthlyGenerateCalls;
    }

    public int getDailyApiCalls() {
        return dailyApiCalls;
    }

    public boolean hasPremiumFeatures() {
        return hasPremiumFeatures;
    }
}
