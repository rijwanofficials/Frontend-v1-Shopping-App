import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../Context/AppContext";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleSetUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const emailInput = e.target.email.value;
      const password = e.target.password.value;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/Login`,
        {
          method: "POST",
          body: JSON.stringify({ email: emailInput, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.status === 201) {
        ShowSuccessToast("User Logged In Successfully");
        setEmail(emailInput);
        setIsLoggedIn(true);
        handleSetUser({ isLoggedIn: true, ...result.data });
        const redirectTo = searchParams.get("redirect") || "/";
        navigate(redirectTo, { replace: true });
      } else {
        ShowErrorToast(result.message);
      }
    } catch (err) {
      ShowErrorToast(`Unable to Login: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate("/");
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-1 flex justify-center items-center overflow-hidden bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md px-6 py-8 bg-white/10 shadow-md rounded-lg flex flex-col justify-center box-border transition-all duration-300 max-h-screen overflow-hidden">
          {!isLoggedIn ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm sm:text-base">Email</label>
                <input
                  className="border-2 border-gray-400/70 focus:outline-none focus:border-blue-600 rounded-md px-3 py-2 w-full placeholder-gray-400 text-sm sm:text-base"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-1 w-full relative">
                <label className="text-sm sm:text-base">Password</label>
                <input
                  className="border-2 border-gray-400/70 focus:outline-none focus:border-blue-600 rounded-md px-3 py-2 w-full placeholder-gray-400 text-sm sm:text-base pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="mt-6"size={18} /> : <Eye className="mt-6" size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center text-white cursor-pointer w-full py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <ClipLoader size={20} color="white" /> : "Log In"}
              </button>

              <p className="text-xs sm:text-sm text-gray-700 mt-3 text-center">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="text-lg sm:text-xl font-medium">Welcome Back!</h1>
              <p className="text-base sm:text-lg font-bold text-pink-900 break-words text-center">
                {email}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
