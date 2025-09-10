import mastercard from "../assets/images/mastercard.png";
import visa from "../assets/images/visa.png";
import playstore from "../assets/images/playstore.png";
import rupay from "../assets/images/rupay.png";
import Logo from "../assets/images/Logo.png";


import Beauty from '../assets/beauty.jpg';
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 mt-12 font-sans">

            {/* Top Section: Categories */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-gray-100 mb-4 text-sm uppercase tracking-wide">Get to Know Us</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">About Us</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Careers</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Press Releases</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Blog</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-100 mb-4 text-sm uppercase tracking-wide">Connect with Us</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Facebook</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Twitter</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Instagram</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-100 mb-4 text-sm uppercase tracking-wide">Make Money with Us</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Sell on Platform</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Affiliate Program</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Advertise Your Products</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-100 mb-4 text-sm uppercase tracking-wide">Let Us Help You</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Your Account</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Shipping Rates</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Returns & Replacements</li>
                        <li className="hover:text-white cursor-pointer transition-colors duration-200">Help</li>
                    </ul>
                </div>
            </div>

            {/* Middle Section: Brand Logo / Download App / Payment */}
            <div className="bg-gray-700 py-6 mt-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <img src={Logo} alt="Logo"
                            className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm text-gray-300">SnapBuy © 2025</span>
                    </div>
                    <div className="flex gap-4">
                        <img src={playstore} alt="Play Store"
                            className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <img src={visa} alt="Visa"
                            className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                        <img src={mastercard} alt="Mastercard"
                            className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                        <img src={rupay} alt="RuPay"
                            className="h-8 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                    </div>
                </div>
            </div>

            {/* Bottom Section: Legal */}
            <div className="bg-gray-900 py-4 text-center text-xs text-gray-400 font-sans">
                <p>© 2025 SnapBuy. All Rights Reserved. <span className="hover:underline cursor-pointer">Privacy Policy</span> | <span className="hover:underline cursor-pointer">Terms & Conditions</span></p>
            </div>

        </footer>

    );
};

export default Footer;
