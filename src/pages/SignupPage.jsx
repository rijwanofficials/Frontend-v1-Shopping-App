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
        <div>
            <Navbar />
            {!islogin ? (
                <div className="flex justify-center items-center py-10">
                    <div className="bg-white/10 shadow-md rounded-md w-fit h-fit mx-auto px-5 py-15">
                        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                        <form
                            onSubmit={isOtpSent ? handleSignup : handleSentOtp}
                            className="space-y-4"
                        >
                            {!isOtpSent ? (
                                <>
                                    <div className=" text-xl flex flex-col">
                                        <label className="mb-1">Email</label>
                                        <input
                                            className=" border-2 border-gray-400/70 focus:outline-none focus:border-pink-600 rounded-md px-2 py-1 w-85
                        placeholder-gray-400"
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
                                        className={`text-white px-2 py-2 w-85  rounded-md transition cursor-pointer ${sendingOtp ? "bg-gray-500 cursor-not-allowed" : "bg-pink-950 hover:bg-pink-700"}`}
                                    >
                                        {sendingOtp ? "Sending..." : "Send OTP"}
                                    </button>
                                    <p className="text-sm text-gray-700 mt-3 text-center">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-blue-600 hover:underline">
                                            Login
                                        </Link>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm">OTP</label>
                                        <input
                                            className="p-2 rounded-md bg-blue-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-600"
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm">Password</label>
                                        <input
                                            className="p-2 rounded-md bg-blue-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-600"
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className=" text-white cursor-pointer w-full py-2 rounded-md bg-pink-950 hover:bg-pink-700 transition"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            ) : (
                <div className=" flex flex-col justify-center items-center gap-5 mt-20 bg-white/10 shadow-md rounded-xl w-fit h-fit mx-auto py-10 px-10">
                    <h1 className="text-xl font-medium ">Welcome to My Shopping App: </h1>
                    <p className="text-xl font-bold text-pink-900">{email}</p>
                </div>
            )
            }
        </div>
    );
}







