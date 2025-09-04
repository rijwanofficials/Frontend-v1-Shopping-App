import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoggedIn: false });
    const [apploading, setappLoading] = useState(true);
    const [cart, setCart] = useState({});   //productId

    const { isLoggedIn } = user;

    const getUserLoggedIn = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
                method: "GET",
                credentials: "include",
            });
            if (response.status === 200) {
                const result = await response.json();
                setUser({
                    ...result.data.user,
                    isLoggedIn: true,
                });
            } else {
                ShowErrorToast("please log in!");
            }
        } catch (err) {
            ShowErrorToast(`Error during user validation!, ${err.message}`);
        } finally {
            setappLoading(false);
        }
    };

    useEffect(() => {
        getUserLoggedIn();
    }, []);

    const handleLogOutClick = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                method: "GET",
                credentials: "include",
            });
            if (response.status === 200) {
                ShowSuccessToast("Your are now logged Out!")
                setUser({ isLoggedIn: false });
                console.log(isLoggedIn);
            } else {
                const data = await response.json();
                ShowErrorToast(data.message);
            }
        } catch (err) {
            ShowErrorToast(`Error during user validation!, ${err.message}`);
        } finally {
            setappLoading(false);
        }
    }
    const addtoCart = async (productId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`, {
                method: "POST",
                credentials: "include"
            })
            if (response.status == 200) {
                ShowSuccessToast("Product is added to cart")
            }
            console.log("response", response);
        }

        catch (err) {
            ShowErrorToast(`Error in Adding to Cart, ${err.message}`);

        }
    }

    // const removetheCart = () => {
    //     setCart(...)
    // }
    const handleSetUser = (data) => setUser(data);

    const sharedValues = {
        apploading,
        isLoggedIn,
        user,
        handleSetUser,
        handleLogOutClick,
        cart,
        addtoCart
    };

    return <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AppContextProvider, useAuthContext };
