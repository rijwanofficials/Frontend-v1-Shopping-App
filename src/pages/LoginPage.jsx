import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
import { useAuthContext } from "../Context/AppContext";


const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false); // for button loading state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // track login status
    const [email, setEmail] = useState(""); // store logged-in email
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { handleSetUser } = useAuthContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const email = e.target.email.value;
            const password = e.target.password.value;

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/Login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const result = await response.json();
            if (response.status === 201) {
                ShowSuccessToast("User Logged In Successfully");
                setEmail(email);
                setIsLoggedIn(true);
                handleSetUser({
                    isLoggedIn: true,
                    ...result.data,
                });

                const redirectTo = searchParams.get("redirect") || "/";
                navigate(redirectTo, { replace: true });
            } else {
                ShowErrorToast(result.message);
            }
        } catch (err) {
            console.error("Error in handleLogin:", err.message);
            ShowErrorToast(`Unable to Login: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {!isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <div className="text-base sm:text-lg flex flex-col gap-4 justify-center items-center w-full max-w-md mx-auto px-6 py-10 bg-white/10 shadow-md mt-20 rounded-lg">
                        <div className="flex gap-1 flex-col w-full">
                            <label className="text-sm sm:text-base">Email</label>
                            <input
                                className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full placeholder-gray-400 text-sm sm:text-base"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div className="flex gap-1 flex-col w-full">
                            <label className="text-sm sm:text-base">Password</label>
                            <input
                                className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full placeholder-gray-400 text-sm sm:text-base"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white cursor-pointer w-full py-2 rounded-md bg-pink-950 hover:bg-pink-700 transition text-sm sm:text-base"
                        >
                            {isLoading ? "Logging..." : "Log In"}
                        </button>

                        <p className="text-xs sm:text-sm text-gray-700 mt-3 text-center">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col justify-center items-center gap-4 mt-20 bg-white/10 shadow-md rounded-xl w-full max-w-sm mx-auto py-8 px-6 sm:px-10">
                    <h1 className="text-lg sm:text-xl font-medium">Welcome Back!</h1>
                    <p className="text-base sm:text-lg font-bold text-pink-900 break-words text-center">
                        {email}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
