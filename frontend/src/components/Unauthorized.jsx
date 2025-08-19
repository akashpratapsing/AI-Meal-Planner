import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {/* Error Icon */}
          <div className="flex justify-center mb-8">
            <div className="avatar placeholder">
              <div className="bg-error/20 text-error w-20 rounded-full">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-center mb-4">
                <div className="badge badge-error gap-2">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  401 - Unauthorized
                </div>
              </div>

              <h2 className="card-title text-2xl justify-center text-error mb-4">
                Access Denied
              </h2>

              <p className="text-base-content/70 mb-6">
                You don't have permission to view this page. This could be
                because:
              </p>

              <div className="text-left mb-6">
                <ul className="list-disc list-inside space-y-1 text-sm text-base-content/60">
                  <li>Your session has expired</li>
                  <li>You don't have the required role or permissions</li>
                  <li>The resource has been restricted</li>
                </ul>
              </div>

              {/* Countdown Alert */}
              <div className="alert alert-warning shadow-lg mb-6">
                <svg
                  className="stroke-current shrink-0 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Auto-redirect in progress</h3>
                  <div className="text-xs">
                    Redirecting to dashboard in{" "}
                    <span className="countdown font-mono text-sm">
                      <span style={{ "--value": countdown }}></span>
                    </span>{" "}
                    seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
