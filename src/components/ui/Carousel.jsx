import { useState, useEffect, useRef } from "react";

const Carousel = ({ items, visibleCount = 4, delay = 3000 }) => {
    const [index, setIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const carouselRef = useRef(null);

    const totalItems = items.length;
    const cardWidthPercent = 100 / visibleCount;

    const displayItems = [...items, ...items];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
            setIsTransitioning(true);
        }, delay);
        return () => clearInterval(interval);
    }, [delay]);

    const handleTransitionEnd = () => {
        if (index >= totalItems) {
            // Reset index instantly without animation
            setIsTransitioning(false);
            setIndex(0);
        }
    };

    return (
        <div className="w-full min-h-[400px] flex flex-col items-center overflow-hidden pb-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Popular Categories</h1>
            <div className="w-full overflow-hidden">
                <div
                    ref={carouselRef}
                    className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                    style={{
                        transform: `translateX(-${index * cardWidthPercent}%)`,
                        width: `${(displayItems.length * 100) / visibleCount}%`,
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {displayItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="mx-2 bg-white p-6 rounded-lg shadow-xs flex-shrink-0 mb-6"
                            style={{ width: `${cardWidthPercent}%` }}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-64 object-cover mb-4 rounded"
                            />
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Carousel };
