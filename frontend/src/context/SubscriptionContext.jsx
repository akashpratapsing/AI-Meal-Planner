import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axios";
import { useAuth } from "./AuthContext";

const SubscriptionContext = createContext(null);

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth(); // 👈 react to login/logout
  const [features, setFeatures] = useState(new Set());
  const [usage, setUsage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // 🧹 clear state on logout
      setFeatures(new Set());
      setUsage({});
      setLoading(false);
      return;
    }

    const fetchSubscriptionData = async () => {
      setLoading(true);
      try {
        const [featuresRes, usageRes] = await Promise.all([
          api.get("/me/features"),
          api.get("/me/usage"),
        ]);

        setFeatures(new Set(featuresRes.data));
        setUsage(usageRes.data);
      } catch (err) {
        console.error("Failed to load subscription data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        features,
        usage,
        loading,
        hasFeature: (f) => features.has(f), // 👌 convenience
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("useSubscription must be used inside SubscriptionProvider");
  }
  return ctx;
};
