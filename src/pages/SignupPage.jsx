import { useState } from "react";
import Navbar from "../components/Navbar";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { Link } from "react-router";

export default function Signup() {
    const [sendingOtp, setSedingOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [islogin, setIsLogin] = useState(false);
    const handleSentOtp = async (e) => {
        e.preventDefault();
        try {
            setSedingOtp(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.status == 201) {
                setIsOtpSent(true);
                ShowSuccessToast("OTP Sent to the email");
            }
            else {
                const result = await response.json();
                ShowErrorToast(result.message);
            }
        } catch (err) {
            console.error("Error in handleSentOtp:", err.message);
            ShowErrorToast(`Unable to sent OTP: ${err.message}`);
        }
        finally {
            setSedingOtp(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                method: "POST",
                body: JSON.stringify({ email, otp, password }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.status == 201) {
                setIsOtpSent(true);
                ShowSuccessToast("User Signup Successfully");
                setIsLogin(true);
            }
            else {
                const result = await response.json();
                ShowErrorToast(result.message);
            }
        } catch (err) {
            console.error("Error in handleSignup:", err.message);
            ShowErrorToast(`Unable to SingUp: ${err.message}`);
        };
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
            {!islogin ? (
                <div className="bg-white/10 shadow-md rounded-lg w-full max-w-md px-6 py-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                        Create Account
                    </h2>

                    <form
                        onSubmit={isOtpSent ? handleSignup : handleSentOtp}
                        className="space-y-5"
                    >
                        {!isOtpSent ? (
                            <>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm sm:text-base">Email</label>
                                    <input
                                        className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full placeholder-gray-400 text-sm sm:text-base"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sendingOtp}
                                    className={`text-white w-full py-2 rounded-md transition text-sm sm:text-base ${sendingOtp
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-pink-950 hover:bg-pink-700"
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
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm sm:text-base">OTP</label>
                                    <input
                                        className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full text-sm sm:text-base"
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm sm:text-base">Password</label>
                                    <input
                                        className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full text-sm sm:text-base"
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="text-white w-full py-2 rounded-md bg-pink-950 hover:bg-pink-700 transition text-sm sm:text-base"
                                >
                                    Sign Up
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
                    <p className="text-base sm:text-lg font-bold text-pink-900 break-words text-center">
                        {email}
                    </p>
                </div>
            )}
        </div>
    );

}
