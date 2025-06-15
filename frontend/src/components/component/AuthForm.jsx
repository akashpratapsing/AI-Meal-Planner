import React, { useState } from "react";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const toggleMode = () => setIsRegister(!isRegister);

  return (
    <div className="min-h-screen flex bg-[#d2f0f8]">
      {/* Left Section - Image Placeholder */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-100">
        <div className="text-center px-8">
          <img
            src="/auth-banner.png"
            alt="Healthy Meals"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Right Section - Glassmorphism Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md p-8 rounded-xl shadow-2xl border border-white/30 bg-white/30 backdrop-blur-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isRegister ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-gray-700 text-sm mt-1">
              {isRegister
                ? "Join FitMeal Planner and start your journey"
                : "Login to continue your healthy routine"}
            </p>
          </div>

          <form className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 input input-bordered w-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 input input-bordered w-full"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 input input-bordered w-full"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn bg-[#00b4d8] hover:bg-[#0096c7] text-white w-full"
            >
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-700">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-cyan-700 hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-cyan-700 hover:underline"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <div className="divider my-6 text-black">OR</div>
          <button className="btn bg-white text-black w-full border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
