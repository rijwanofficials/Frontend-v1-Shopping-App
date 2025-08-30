import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast } from "../utils/ToastMessageHelper";
const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoggedIn: false });
    const [apploading, setappLoading] = useState(true);
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

    const handleSetUser = (data) => setUser(data);

    const sharedValues = {
        apploading,
        isLoggedIn,
        user,
        handleSetUser,
    };

    return <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AppContextProvider, useAuthContext };
