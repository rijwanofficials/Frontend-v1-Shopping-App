import { useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../Context/AppContext";

const SignupPage = () => {
  const { sendOtp, signup } = useAuthContext();

  const [sendingOtp, setSendingOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleSentOtp = async (e) => {
    e.preventDefault();
    setSendingOtp(true);

    const result = await sendOtp(email);
    console.log("OTP API Result:", result);

    if (result.isSuccess) {
      setIsOtpSent(true);
      ShowSuccessToast(result.message || "OTP sent");
    } else {
      ShowErrorToast(result.message || "Failed to send OTP");
    }
    setSendingOtp(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    const result = await signup(email, otp, password);
console.log(result);
    if (result.status === 200 || result.isSuccess) {
      ShowSuccessToast("User signed up successfully!");
      setIsLogin(true);
    } else {
      ShowErrorToast(result.message || "Signup failed");
    }

    setIsSigningUp(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      {!isLogin ? (
        <div className="bg-white/10 shadow-md rounded-lg w-full max-w-md px-6 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-600">
            Create Account
          </h2>

          <form
            onSubmit={isOtpSent ? handleSignup : handleSentOtp}
            className="space-y-5"
          >
            {!isOtpSent ? (
              <>
                {/* Email */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm sm:text-base">Email</label>
                  <input
                    className="border-2 border-gray-400/70 focus:outline-none focus:border-blue-600 rounded-md px-3 py-2 w-full placeholder-gray-400 text-sm sm:text-base"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Send OTP */}
                <button
                  type="submit"
                  disabled={sendingOtp}
                  className={`text-white w-full py-2 rounded-md transition text-sm sm:text-base ${
                    sendingOtp
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {sendingOtp ? "Sending..." : "Send OTP"}
                </button>

                <p className="text-xs sm:text-sm text-gray-700 mt-3 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </p>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm sm:text-base">OTP</label>
                  <input
                    className="border-2 border-gray-400/70 focus:outline-none focus:border-blue-600 rounded-md px-3 py-2 w-full text-sm sm:text-base"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col relative">
                  <label className="mb-1 text-sm sm:text-base">Password</label>
                  <input
                    className="border-2 border-gray-400/70 focus:outline-none focus:border-blue-600 rounded-md px-3 py-2 w-full text-sm sm:text-base pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="mt-6" size={18} />
                    ) : (
                      <Eye className="mt-6" size={18} />
                    )}
                  </button>
                </div>

                {/* Signup */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="flex items-center justify-center text-white w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningUp ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5 bg-white/10 shadow-md rounded-xl w-full max-w-sm px-6 py-8">
          <h1 className="text-lg sm:text-xl font-medium text-center">
            Welcome to My Shopping App:
          </h1>
          <p className="text-base sm:text-lg font-bold text-blue-600 break-words text-center">
            {email}
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
