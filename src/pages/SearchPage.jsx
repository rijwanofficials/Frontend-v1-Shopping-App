import { useState } from "react";
import { Link } from "react-router";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const Signup = () => {
    const [sendingOtp, setSendingOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            setSendingOtp(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/otps`, {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                setIsOtpSent(true);
                ShowSuccessToast("OTP Sent to the email");
            } else {
                const result = await response.json();
                ShowErrorToast(result.message);
            }
        } catch (err) {
            ShowErrorToast(`Unable to send OTP: ${err.message}`);
        } finally {
            setSendingOtp(false);
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

            if (response.status === 201) {
                ShowSuccessToast("User Signup Successfully");
                setIsLogin(true);
            } else {
                const result = await response.json();
                ShowErrorToast(result.message);
            }
        } catch (err) {
            ShowErrorToast(`Unable to Sign Up: ${err.message}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <main className="flex-1 flex justify-center items-center overflow-hidden bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md px-6 py-6 bg-white/10 shadow-md rounded-lg flex flex-col justify-center box-border transition-all duration-300 max-h-screen overflow-hidden">
                    {!isLogin ? (
                        <form
                            onSubmit={isOtpSent ? handleSignup : handleSendOtp}
                            className="flex flex-col gap-5"
                        >
                            {!isOtpSent ? (
                                <>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                                        Create Account
                                    </h2>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm sm:text-base">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full text-sm sm:text-base placeholder-gray-400"
                                            required
                                            autoComplete="email"
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
                                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                                        Set Password & OTP
                                    </h2>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm sm:text-base">OTP</label>
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm sm:text-base">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-3 py-2 w-full text-sm sm:text-base"
                                            required
                                            autoComplete="new-password"
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
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-4">
                            <h1 className="text-lg sm:text-xl font-medium text-center">
                                Welcome to My Shopping App
                            </h1>
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

export default Signup;
