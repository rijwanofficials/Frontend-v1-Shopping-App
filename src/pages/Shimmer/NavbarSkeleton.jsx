// NavbarSkeleton.jsx
import React from "react";

const SkeletonBox = ({ className }) => (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

const NavbarSkeleton = () => {
    return (
        <header className="sticky top-0 z-50 bg-blue-600 text-white shadow">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
                {/* Left: menu + brand */}
                <div className="flex items-center gap-2">
                    <SkeletonBox className="w-6 h-6 md:hidden" /> {/* Menu icon */}
                    <SkeletonBox className="w-20 h-6" /> {/* Brand name */}
                </div>

                {/* Search input */}
                <div className="w-full md:flex-1 md:max-w-lg mx-2">
                    <div className="flex items-center gap-2">
                        <SkeletonBox className="w-full h-9" /> {/* Search input */}
                        <SkeletonBox className="w-16 h-9" /> {/* Search button */}
                    </div>
                </div>

                {/* Right menu */}
                <div className="hidden md:flex items-center justify-end gap-4 relative">
                    <SkeletonBox className="w-12 h-5" /> {/* Home */}
                    <SkeletonBox className="w-16 h-5" /> {/* My Orders */}
                    <SkeletonBox className="w-12 h-5" /> {/* Login/Logout */}
                    <SkeletonBox className="w-6 h-6 rounded-full" /> {/* Cart */}
                </div>
            </div>
        </header>
    );
};

export  {NavbarSkeleton};