import { useState } from "react";
import Button from "../components/ui/button";

const AddressPage = ({ onSubmit }) => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZip] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create the address object from state
        const address = {
            fullName,
            phoneNumber,
            street,
            city,
            state,
            zipCode,
            country,
        };
        console.log("address✅", address);

        if (onSubmit) {
            onSubmit(address); // send the address to parent
        }
    };

    return (
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

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Phone Number</label>
                        <input
                            type="tel"
                            value={phoneNumber}
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
                            value={zipCode}
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
    );
};

export default AddressPage;
