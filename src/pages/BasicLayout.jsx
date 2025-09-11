import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthContext } from "../Context/AppContext";
import { NavbarSkeleton } from "./Shimmer/NavbarSkeleton";
import { FooterSkeleton } from "./Shimmer/FooterSkeleton";

const BasicLayout = () => {
    const { appLoading } = useAuthContext();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <header className="sticky top-0 z-50 shadow-md">
                {appLoading ? <NavbarSkeleton /> : <Navbar />}
            </header>

            <main className="flex-1 px-1 sm:px-2 lg:px-1 py-1">
                <Outlet context={{ fullWidth: true }} />
            </main>

            <footer>
                {appLoading ? <FooterSkeleton /> : <Footer />}
            </footer>
        </div>
    );
};

export { BasicLayout };