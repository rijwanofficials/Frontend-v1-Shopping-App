import React from "react";

const ShimmerBox = ({ className }) => (
    <div
        className={`bg-gray-300 animate-pulse rounded ${className}`}
    ></div>
);

const HomePageShimmer = () => {
    return (
        <div>
            {/* <header className="sticky top-0 z-50 bg-gray-300 p-4 flex items-center justify-between animate-pulse">
                <div className="w-24 h-6 bg-gray-400 rounded"></div>
                <div className="flex gap-2">
                    <div className="w-20 h-4 bg-gray-400 rounded"></div>
                    <div className="w-20 h-4 bg-gray-400 rounded"></div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
            </header> */}

            {/* Category Section Shimmer */}
            <div className="flex flex-wrap gap-6 justify-center items-center p-3 bg-gray-100">
                {[...Array(8)].map((_, i) => (
                    <ShimmerBox key={i} className="w-32 h-32" />
                ))}
            </div>

            {/* Promotional Banner Shimmer */}
            <div className="bg-gray-300 h-40 mx-6 my-6 rounded-lg animate-pulse"></div>

            {/* Carousel Shimmer */}
            <div className="w-full min-h-[400px] bg-gray-200 flex items-center justify-center mt-6">
                <div className="w-full h-full flex gap-4 px-6 overflow-x-auto">
                    {[...Array(5)].map((_, i) => (
                        <ShimmerBox key={i} className="min-w-[250px] h-64" />
                    ))}
                </div>
            </div>

            {/* Featured Products Shimmer */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="h-6 w-40 bg-gray-400 mb-6 rounded animate-pulse"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-300 p-4 rounded shadow animate-pulse">
                            <div className="h-40 w-full bg-gray-400 mb-2 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-400 mb-1 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Deals Section Shimmer */}
            <div className="bg-gray-200 h-32 rounded-lg mx-6 my-6 animate-pulse"></div>

            {/* Footer Shimmer */}
            <footer className="bg-gray-300 text-gray-200 mt-12 font-sans animate-pulse">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                            <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-400 h-12 mt-6 flex items-center justify-center"></div>
            </footer>
        </div>
    );
};

export { HomePageShimmer };
