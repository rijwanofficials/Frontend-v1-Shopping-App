import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BasicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Navbar always fixed at the top */}
            <header className="sticky top-0 z-50 shadow-md">
                <Navbar />
            </header>
            <main className="flex-1 px-1 sm:px-2 lg:px-1 py-1">
                <Outlet context={{ fullWidth: true }} />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export { BasicLayout };
