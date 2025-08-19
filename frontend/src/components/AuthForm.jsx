import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser, registerUser } from "../services/authService";
import toast from 'react-hot-toast';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        const userData = {
          userId: res.userId,
          email: res.email,
          token: res.token,
          roles: res.roles.map((r) => r.authority),
        };

        console.log("User Data => ", userData);

        localStorage.setItem("user", JSON.stringify(userData));
        // setUser(userData);
        toast.success("Login successful 🎉");
        login(userData, res.token);
        navigate("/protected");
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          toast.error("Passwords do not match ❌");
          setLoading(false);
          return;
        }

        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };

        const res = await registerUser(payload);
        // alert(res); // string response like: "User registered Successfully"
        toast.success("User registered Successfully🎉");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-cyan-600 to-cyan-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left Section - Image (Hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10" />
            <img
              src="/auth-banner.png"
              alt="Authentication Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.target.style.display = "none";
                e.target.parentElement.style.background =
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
              }}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Welcome to FitMeal</h2>
                <p className="text-xl opacity-90">
                  Transform your meals and achieve your goals
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-white/70">
                  {isLogin
                    ? "Sign in to your account"
                    : "Join our community today"}
                </p>
              </div>
              {/* 
               {error && (
                <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-2 rounded text-sm mb-4">
                  {error}
                </div>
              )} */}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name (Register only) */}
                {!isLogin && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white font-medium">
                        Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="input input-bordered w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                        required={!isLogin}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      Email Address
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="input input-bordered w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white font-medium">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="input input-bordered w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/20 transition-all duration-300 pr-20"
                      required
                    />
                    <Lock className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register only) */}
                {!isLogin && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white font-medium">
                        Confirm Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="input input-bordered w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/20 transition-all duration-300 pr-20"
                        required={!isLogin}
                      />
                      <Lock className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Forgot your password?
                    </a>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  // onClick={handleSubmit}
                  disabled={loading}
                  className="btn w-full bg-white text-purple-600 hover:bg-white/90 border-none text-lg font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* {isLogin ? "Sign In" : "Create Account"} */}
                  {loading
                    ? "Please wait..."
                    : isLogin
                    ? "Sign In"
                    : "Create Account"}
                </button>

                {/* Divider */}
                <div className="divider text-white/50">or</div>

                {/* Google Login Button */}
                <button
                  type="button"
                  className="btn w-full bg-white hover:bg-gray-50 text-gray-700 border-none rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Toggle Mode */}
                <div className="text-center mt-6">
                  <p className="text-white/70">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="ml-2 text-white font-semibold hover:underline transition-all duration-300"
                    >
                      {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
