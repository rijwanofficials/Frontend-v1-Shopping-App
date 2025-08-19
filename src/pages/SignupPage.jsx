import { useState } from "react";
import Navbar from "../components/Navbar";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

export default function Signup() {
    const [sendingOtp, setSedingOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleSentOtp = async (e) => {
        e.preventDefault();
        try {
            setSedingOtp(true);
            // ${import.meta.env.VITE_BACKEND_URL}
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
            <div className="flex justify-center items-center py-10">
                <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                    <form
                        onSubmit={isOtpSent ? handleSignup : handleSentOtp}
                        className="space-y-4"
                    >
                        {!isOtpSent ? (
                            <>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm">Email</label>
                                    <input
                                        className="p-2 rounded-md bg-blue-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-600"
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
                                    className={`text-white w-full p-2  rounded-md transition cursor-pointer ${sendingOtp ? "bg-gray-500 cursor-not-allowed" : "bg-pink-950 hover:bg-pink-700"}`}
                                >
                                    {sendingOtp ? "Sending..." : "Send OTP"}
                                </button>
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
        </div>
    );
}
