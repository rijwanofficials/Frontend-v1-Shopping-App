import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../Context/AppContext";
import { CartSideBar } from "../components/ui/CartSideBar";

const BasicLayout = () => {
    const { cart } = useAuthContext();
    const cartItems = Object.values(cart);
    const isCartEmpty = cartItems.length === 0;
    return (
        <div className={`grid ${!isCartEmpty ? "grid-cols-[1fr_175px]" : "grid"} min-h-screen`}>
            <div>
                <Navbar />
                <Outlet />
            </div>
            {!isCartEmpty && <CartSideBar />}
        </div>
    );
};

export { BasicLayout };
