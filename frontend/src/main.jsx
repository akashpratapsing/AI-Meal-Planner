import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <SubscriptionProvider>
            <App />
          </SubscriptionProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  </StrictMode>
);
