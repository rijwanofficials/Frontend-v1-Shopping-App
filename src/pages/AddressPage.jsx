import  { useState } from "react";
import { useNavigate } from "react-router";

const AddressPage = ({ onSubmit }) => {
    const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    countryCode: "+91", // default India
    phoneNumber: "",
    street: "",
    city: "",
    region: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // handle all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // handle phone number only digits
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    setAddress((prev) => ({ ...prev, phoneNumber: value }));
  };

  // validation function
  const validate = () => {
    
    const newErrors = {};
    if (!address.fullName) newErrors.fullName = "Full name is required";
    if (!address.street) newErrors.street = "Street address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.region) newErrors.region = "State/Province is required";
    if (!address.zipCode) newErrors.zipCode = "ZIP/Postal code is required";
    if (!address.country) newErrors.country = "Country is required";

    // phone validation
    const fullPhone = `${address.countryCode}${address.phoneNumber}`.replace(
      /\s+/g,
      ""
    );
    if (!/^\+\d{1,3}\d{7,12}$/.test(fullPhone)) {
      newErrors.phoneNumber = "Enter a valid phone number";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (onSubmit) onSubmit(address);
        navigate("/checkout", { state: { address } });
      console.log("Submitted Address:", address);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Shipping Address
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={address.fullName}
            onChange={handleChange}
            autoComplete="name"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {submitted && errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number with Country Code */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="flex gap-2 mt-1">
            <select
              name="countryCode"
              value={address.countryCode}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
            </select>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={address.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="1234567890"
              autoComplete="tel"
              className="flex-1 border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {submitted && errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address
          </label>
          <input
            id="street"
            name="street"
            type="text"
            value={address.street}
            onChange={handleChange}
            autoComplete="street-address"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {submitted && errors.street && (
            <p className="text-red-500 text-xs mt-1">{errors.street}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={address.city}
            onChange={handleChange}
            autoComplete="address-level2"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {submitted && errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        {/* State/Province */}
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            State / Province
          </label>
          <input
            id="region"
            name="region"
            type="text"
            value={address.region}
            onChange={handleChange}
            autoComplete="address-level1"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {submitted && errors.region && (
            <p className="text-red-500 text-xs mt-1">{errors.region}</p>
          )}
        </div>

        {/* ZIP / Postal Code */}
        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700"
          >
            ZIP / Postal Code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={address.zipCode}
            onChange={handleChange}
            autoComplete="postal-code"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {submitted && errors.zipCode && (
            <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            value={address.country}
            onChange={handleChange}
            autoComplete="country-name"
            className="mt-1 block w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {submitted && errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
        >
          Continue to Checkout
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
