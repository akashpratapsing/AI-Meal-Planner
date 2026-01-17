import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser, registerUser, googleAuth } from "../services/authService";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/logo.svg";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

        localStorage.setItem("user", JSON.stringify(userData));
        login(userData, res.token);
        toast.success("Login successful 🎉");
        navigate("/protected");
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match ❌");
          setLoading(false);
          return;
        }

        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };

        await registerUser(payload);
        toast.success("User registered successfully 🎉");
        setIsLogin(true);
      }
    } catch (err) {
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

  // ✅ Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await googleAuth(credentialResponse.credential); // send to backend
      const userData = {
        userId: res.userId,
        email: res.email,
        token: res.token,
        roles: res.roles
      };
      console.log("Current Origin:", window.location.origin);
      console.log("Client ID from Env:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData, res.token);
      toast.success("Google login successful 🎉");
      navigate("/protected");
    } catch (err) {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Visual */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary relative p-12 flex-col justify-center items-center text-center text-primary-content overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 max-w-md">
            <div className="flex flex-col items-center gap-6 mb-10">
              {/* <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-sm shadow-xl border border-white/20"> */}
              <img
                src={logo}
                alt="FitMeal"
                className="h-4xl w-auto brightness-0 invert drop-shadow-lg"
              />
              {/* </div> */}
              {/* <span className="text-4xl font-extrabold tracking-tight drop-shadow-md">FitMeal Planner</span> */}
            </div>

            <h2 className="text-3xl font-bold mb-6 leading-tight drop-shadow-sm">
              Your Personal AI Nutritionist
            </h2>
            <p className="text-lg opacity-90 leading-relaxed font-medium">
              Craft personalized meal plans, track your nutrition, and achieve
              your fitness goals with the power of AI.
            </p>
          </div>

          <div className="absolute bottom-8 text-sm opacity-70 font-medium">
            © {new Date().getFullYear()} FitMeal Planner. All rights reserved.
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-base-content/60">
              {isLogin
                ? "Enter your details to access your account"
                : "Get started with your free account today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="input input-bordered w-full pl-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/50"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 pr-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-12 pr-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary bg-base-200/50"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg hover:shadow-primary/30 transition-all mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-100 text-base-content/50">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed ❌")}
                shape="circle"
                theme="outline"
                size="large"
                width={270}
                text={isLogin ? "signin_with" : "signup_with"}
              />
            </div>

            <p className="text-center text-base-content/60 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
