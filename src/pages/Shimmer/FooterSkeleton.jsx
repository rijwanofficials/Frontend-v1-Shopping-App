// FooterSkeleton.jsx
import React from "react";

const SkeletonBox = ({ className }) => (
    <div className={`animate-pulse bg-gray-600 rounded ${className}`} />
);

const FooterSkeleton = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 mt-12 font-sans">
            {/* Top Section: Categories */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <SkeletonBox className="w-32 h-4" /> {/* title */}
                        <SkeletonBox className="w-24 h-3" />
                        <SkeletonBox className="w-28 h-3" />
                        <SkeletonBox className="w-20 h-3" />
                        <SkeletonBox className="w-24 h-3" />
                    </div>
                ))}
            </div>

            {/* Middle Section */}
            <div className="bg-gray-700 py-6 mt-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo + copyright */}
                    <div className="flex items-center gap-4">
                        <SkeletonBox className="h-8 w-20" /> {/* Logo */}
                        <SkeletonBox className="h-3 w-24" /> {/* text */}
                    </div>

                    {/* Playstore badge */}
                    <SkeletonBox className="h-8 w-28" />

                    {/* Payment logos */}
                    <div className="flex gap-6 items-center">
                        <SkeletonBox className="h-8 w-14" />
                        <SkeletonBox className="h-8 w-14" />
                        <SkeletonBox className="h-8 w-14" />
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-gray-900 py-4 text-center text-xs text-gray-400 font-sans">
                <SkeletonBox className="h-3 w-64 mx-auto" />
            </div>
        </footer>
    );
};

export { FooterSkeleton };
