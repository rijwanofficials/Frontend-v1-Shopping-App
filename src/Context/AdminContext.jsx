import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast } from "../utils/ToastMessageHelper";
const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [adminInfoLoading, setAdminInfoLoading] = useState(true);

    const [adminUser, setAdminUser] = useState({ isLoggedIn: false })

    const getAdminLoggedIn = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admins/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status === 200) {
                setAdminUser({ isLoggedIn: true });
            } else {
                ShowErrorToast("Permission denied! You are not an Admin!");
            }
        } catch (err) {
            ShowErrorToast(`Error during user validation: ${err.message}`);
        } finally {
            setAdminInfoLoading(false);
        }
    };

    useEffect(() => {
        getAdminLoggedIn();
    }, []);

    const sharedValues = {
        adminUser,
        adminInfoLoading,
        getAdminLoggedIn
    };

    return <AdminContext.Provider value={sharedValues}>{children}</AdminContext.Provider>;
};

const useAdminContext = () => useContext(AdminContext);
// eslint-disable-next-line react-refresh/only-export-components
export { AdminContext, AdminContextProvider, useAdminContext };
