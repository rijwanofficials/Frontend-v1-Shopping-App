import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoggedIn: false });
    const [apploading, setAppLoading] = useState(true);
    const [cart, setCart] = useState([]); // now an array of cart items

    const { isLoggedIn } = user;

    // Fetch logged-in user
    const getUserLoggedIn = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                const result = await response.json();
                setUser({ ...result.data.user, isLoggedIn: true });
            } else {
                ShowErrorToast("Please log in!");
            }
        } catch (err) {
            ShowErrorToast(`Error during user validation: ${err.message}`);
        } finally {
            setAppLoading(false);
        }
    };

    useEffect(() => {
        getUserLoggedIn();
        getCartItems(); // fetch cart after checking user
    }, []);

    // Logout
    const handleLogOutClick = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                ShowSuccessToast("You are now logged out!");
                setUser({ isLoggedIn: false });
                setCart([]); // clear cart on logout
            } else {
                const data = await response.json();
                ShowErrorToast(data.message);
            }
        } catch (err) {
            ShowErrorToast(`Error during logout: ${err.message}`);
        }
    };

    // Add to cart
    const addtoCart = async (productId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`, {
                method: "POST",
                credentials: "include",
            });

            const result = await response.json();

            if (response.status === 200) {
                ShowSuccessToast("Product added to cart!");
                // Update cart state with new or updated item
                if (result.cartItem) {
                    setCart((prevCart) => {
                        const exists = prevCart.find((item) => item._id === result.cartItem._id);
                        if (exists) {
                            return prevCart.map((item) =>
                                item._id === result.cartItem._id ? result.cartItem : item
                            );
                        } else {
                            return [...prevCart, result.cartItem];
                        }
                    });
                }
            } else {
                ShowErrorToast(result.message || "Failed to add to cart!");
            }
        } catch (err) {
            ShowErrorToast(`Error adding to cart: ${err.message}`);
        }
    };

    // Fetch cart items from backend
    const getCartItems = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
                method: "GET",
                credentials: "include",
            });

            const result = await response.json();

            if (response.status === 200 && result.data?.cart) {
                setCart(result.data.cart); // populate cart with product info
            } else {
                ShowErrorToast("Failed to fetch cart items!");
            }
        } catch (err) {
            ShowErrorToast(`Error fetching cart: ${err.message}`);
        }
    };

    const handleSetUser = (data) => setUser(data);

    const sharedValues = {
        apploading,
        isLoggedIn,
        user,
        handleSetUser,
        handleLogOutClick,
        cart,
        addtoCart,
    };

    return <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AppContextProvider, useAuthContext };
