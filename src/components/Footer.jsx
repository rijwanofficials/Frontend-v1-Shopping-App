const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 mt-12">
            {/* Top Section: Categories */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-semibold mb-4">Get to Know Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:underline cursor-pointer">About Us</li>
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Press Releases</li>
                        <li className="hover:underline cursor-pointer">Blog</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Connect with Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:underline cursor-pointer">Facebook</li>
                        <li className="hover:underline cursor-pointer">Twitter</li>
                        <li className="hover:underline cursor-pointer">Instagram</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Make Money with Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:underline cursor-pointer">Sell on Platform</li>
                        <li className="hover:underline cursor-pointer">Affiliate Program</li>
                        <li className="hover:underline cursor-pointer">Advertise Your Products</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Let Us Help You</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:underline cursor-pointer">Your Account</li>
                        <li className="hover:underline cursor-pointer">Shipping Rates</li>
                        <li className="hover:underline cursor-pointer">Returns & Replacements</li>
                        <li className="hover:underline cursor-pointer">Help</li>
                    </ul>
                </div>
            </div>

            {/* Middle Section: Brand Logo / Download App / Payment */}
            <div className="bg-gray-700 py-6 mt-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <img src="/logo.png" alt="Logo" className="h-10" />
                        <span className="text-sm">YourBrand © 2025</span>
                    </div>
                    <div className="flex gap-4">
                        <img src="/appstore.png" alt="App Store" className="h-10 cursor-pointer" />
                        <img src="/playstore.png" alt="Play Store" className="h-10 cursor-pointer" />
                    </div>
                    <div className="flex gap-4">
                        <img src="/visa.png" alt="Visa" className="h-6" />
                        <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                        <img src="/rupay.png" alt="RuPay" className="h-6" />
                    </div>
                </div>
            </div>

            {/* Bottom Section: Legal */}
            <div className="bg-gray-900 py-4 text-center text-xs text-gray-400">
                <p>© 2025 SnapBuy. All Rights Reserved. Privacy Policy | Terms & Conditions</p>
            </div>
        </footer>
    );
};

export default Footer;
