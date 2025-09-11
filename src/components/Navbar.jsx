import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../Context/AppContext";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const [query] = useSearchParams();
    const searchTextDefaultValue = query.get("q") || "";
    const [searchText, setSearchText] = useState(searchTextDefaultValue);
    const { isLoggedIn, handleLogOutClick, cart } = useAuthContext();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearchText = (e) => setSearchText(e.target.value);
    const handleSearchPage = () => navigate(`/search?q=${searchText}`);

    const cartCount = Object.values(cart).reduce(
        (total, item) => total + (item.cartQuantity || 0),
        0
    );

    return (
        <header className="sticky top-0 z-50 bg-blue-600 text-white shadow">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
                {/* Left: Brand + Mobile toggle */}
                <div className="flex items-center gap-2">
                    <button
                        className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <IoClose size={22} className="hover:cursor-pointer" />
                        ) : (
                            <IoMenu size={22} className="hover:cursor-pointer" />
                        )}
                    </button>
                    <Link to="/" className="text-lg sm:text-xl font-bold">
                        SnapBuy
                    </Link>
                </div>

                {/* Search input */}
                <div className="w-full md:flex-1 md:max-w-lg mx-2">
                    <div className="flex items-center gap-2">
                        <input
                            value={searchText}
                            onChange={handleSearchText}
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-2 rounded-md bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-all duration-200 sm:text-sm md:text-base"
                        />
                        <button
                            onClick={handleSearchPage}
                            className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer transform hover:scale-105 transition text-sm sm:text-base"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Right menu + cart */}
                <div className="hidden md:flex items-center justify-end gap-4 text-lg relative">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    {isLoggedIn && (
                        <Link to="/my-orders" className="hover:underline">
                            My Orders
                        </Link>
                    )}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogOutClick}
                            className="hover:underline cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="hover:underline">
                            Log In
                        </Link>
                    )}
                    <Link
                        to="/cart"
                        className="relative text-white hover:text-blue-300 transition"
                    >
                        <FaCartShopping size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="flex flex-col gap-2 px-4 pb-3 md:hidden bg-blue-700">
                    <Link
                        to="/"
                        className="w-auto self-start px-3 py-2 rounded-md hover:bg-blue-500 transition text-white"
                    >
                        Home
                    </Link>

                    {isLoggedIn && (
                        <Link
                            to="/my-orders"
                            className="w-auto self-start px-3 py-2 rounded-md hover:bg-blue-500 transition text-white"
                        >
                            Orders
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <button
                            className="w-auto self-start px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 transition text-white"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-flex px-3 py-2 rounded-md hover:bg-blue-500 transition text-white"
                        >
                            Log In
                        </Link>
                    )}

                    {/* Mobile Cart */}
                    <Link
                        to="/cart"
                        className="inline-flex w-fit items-center px-3 py-2 rounded-md hover:bg-blue-500 transition relative text-white"
                    >
                        <FaCartShopping size={20} />
                        <span className="ml-2">Cart</span>
                    </Link>
                </div>

            )}
        </header>
    );
};

export default Navbar;
