import { createContext, useContext } from "react";
const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const sharedValues = {};

    return <AdminContext.Provider value={sharedValues}>{children}</AdminContext.Provider>;
};

const useAdminContext = () => useContext(AdminContext);
// eslint-disable-next-line react-refresh/only-export-components
export { AdminContext, AdminContextProvider, useAdminContext };
