import { Button } from "../components/ui/button";
import { useAuthContext } from "../Context/AppContext";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { useState } from "react";
// import { useNavigate } from "react-router";

const AddressPage = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    // const navigate = useNavigate();

    // const handleSaveAddress = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     const formData = { fullName, phone, street, city, state, zip, country };
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/address`, {
    //             method: "POST",
    //             body: JSON.stringify(formData),
    //             headers: { "Content-Type": "application/json" },
    //             credentials: "include",
    //         });
    //         const result = await response.json();
    //         if (response.ok) {
    //             ShowSuccessToast("Address saved successfully!");
    //             navigate("/checkout");
    //         } else {
    //             ShowErrorToast(result.message || "Failed to save address");
    //         }
    //     } catch (err) {
    //         ShowErrorToast(`Error saving address: ${err.message}`);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


    const { handleCheckout } = useAuthContext();


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const address = Object.fromEntries(formData.entries());
        console.log("address✅", address);
        handleCheckout(address);
    };

    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 w-full max-w-md mx-auto px-6 py-10 bg-white/10 shadow-md mt-20 rounded-lg">

                        {/* Full Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                        {/* Street */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Street Address</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter street address"
                                required
                            />
                        </div>

                        {/* City */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter city"
                                required
                            />
                        </div>

                        {/* State */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">State</label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter state"
                                required
                            />
                        </div>

                        {/* ZIP */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">ZIP Code</label>
                            <input
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter zip code"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="border-2 border-gray-400/70 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter country"
                                required
                            />
                        </div>

                        {/* Save Address Button */}
                        <Button
                            type="submit"
                            className="text-white w-full py-2 rounded-md bg-pink-950 hover:bg-pink-700 transition text-sm"
                        >
                            Save Address
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressPage;
