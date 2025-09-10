import { Target, Star, Eye } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">About Us</h1>

            <p className="max-w-3xl text-center text-lg mb-6 text-gray-200">
                Welcome to <span className="font-semibold text-white">SnapBuy</span>, your ultimate destination for everything you need – from the latest gadgets to trendy fashion, home essentials, and more. We are dedicated to bringing you a seamless shopping experience, combining convenience, quality, and affordability.
            </p>

            {/* Mission */}
            <div className="max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-indigo-500/30 transition">
                <div className="flex items-center gap-3 mb-4">
                    <Target className="text-indigo-400" size={28} />
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-md text-gray-300">
                    At <span className="font-semibold text-white">SnapBuy</span>, our mission is simple: <span className="italic">to make online shopping easy, enjoyable, and accessible for everyone.</span> Whether you’re looking for the newest smartphone, kitchen appliances, or stylish clothing, we strive to offer a wide range of products at competitive prices, delivered right to your doorstep.
                </p>
            </div>

            {/* Why Choose Us */}
            <div className="max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-indigo-500/30 transition">
                <div className="flex items-center gap-3 mb-4">
                    <Star className="text-indigo-400" size={28} />
                    <h2 className="text-2xl font-semibold">Why Choose Us</h2>
                </div>
                <ul className="list-disc list-inside space-y-2 text-md text-gray-300">
                    <li><span className="font-semibold text-white">Vast Selection:</span> Explore thousands of products across multiple categories – electronics, fashion, beauty, groceries, and more.</li>
                    <li><span className="font-semibold text-white">Trusted Quality:</span> We partner with reliable brands to ensure every product meets high standards.</li>
                    <li><span className="font-semibold text-white">Easy & Secure Shopping:</span> Enjoy a smooth, secure, and intuitive shopping experience on our app.</li>
                    <li><span className="font-semibold text-white">Exclusive Deals & Offers:</span> Get access to special discounts, seasonal promotions, and exciting deals.</li>
                </ul>
            </div>

            {/* Vision */}
            <div className="max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-indigo-500/30 transition">
                <div className="flex items-center gap-3 mb-4">
                    <Eye className="text-indigo-400" size={28} />
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                </div>
                <p className="text-md text-gray-300">
                    We aim to <span className="italic">redefine online shopping</span> by combining technology, customer focus, and a wide product range, making <span className="font-semibold text-white">SnapBuy</span> the go-to platform for your daily needs.
                </p>
            </div>

            {/* Closing */}
            <div className="max-w-3xl text-center text-md mt-6 text-gray-300">
                <p>We love hearing from our customers! Reach out with your feedback, suggestions, or queries – your voice helps us grow and improve.</p>
                <p className="mt-4 font-semibold text-indigo-400">SnapBuy – <span className="italic">Shop Smart, Live Better.</span></p>
            </div>
        </div>
    );
};

export default AboutPage;
