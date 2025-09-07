import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoggedIn: false });
    const [apploading, setAppLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(false); // for getCartItems
    const [addingItems, setAddingItems] = useState({});
    const [removingItems, setRemovingItems] = useState({});
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
        getCartItems();
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
                setCart([]);
            } else {
                const data = await response.json();
                ShowErrorToast(data.message);
            }
        } catch (err) {
            ShowErrorToast(`Error during logout: ${err.message}`);
        }
    };

    // Fetch cart items
    const getCartItems = async () => {
        setCartLoading(true); // start loader
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
                method: "GET",
                credentials: "include",
            });

            const result = await response.json();

            if (response.status === 200 && result.data?.cart) {
                setCart(result.data.cart);
            } else {
                ShowErrorToast("Failed to fetch cart items!");
            }
        } catch (err) {
            ShowErrorToast(`Error fetching cart: ${err.message}`);
        } finally {
            setCartLoading(false); // stop loader
        }
    };

    // Add to cart
    // { productId: true/false }
    const addtoCart = async (productId) => {
        setAddingItems((prev) => ({ ...prev, [productId]: true }));

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}/add`, {
                method: "POST",
                credentials: "include",
            });
            const result = await response.json();
            if (response.ok) {
                ShowSuccessToast("Product added to cart!");
                const updatedItem = result.cartItem;
                setCart((prev) => ({ ...prev, [updatedItem._id]: updatedItem }));
            } else {
                ShowErrorToast(result.message || "Failed to add to cart!");
            }
        } catch (err) {
            ShowErrorToast(`Error adding to cart: ${err.message}`);
        } finally {
            setAddingItems((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const removeFromCart = async (productId) => {
        setRemovingItems((prev) => ({ ...prev, [productId]: true }));
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}/remove`, {
                method: "POST",
                credentials: "include",
            });
            const result = await response.json();

            if (response.ok) {
                ShowSuccessToast(result.cartItem ? "Product quantity decreased!" : "Product removed from cart!");
                const updatedItem = result.cartItem;

                setCart((prev) => {
                    const newCart = { ...prev };
                    if (updatedItem) {
                        newCart[updatedItem._id] = updatedItem;
                    } else {
                        delete newCart[productId];
                    }
                    return newCart;
                });
            } else {
                ShowErrorToast(result.message || "Failed to remove from cart!");
            }
        } catch (err) {
            ShowErrorToast(`Error removing from cart: ${err.message}`);
        } finally {
            setRemovingItems((prev) => ({ ...prev, [productId]: false }));
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
        cartLoading,
        removeFromCart,
        addingItems,
        removingItems,
    };

    return <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);
// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AppContextProvider, useAuthContext };
