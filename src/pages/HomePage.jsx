import { useNavigate } from "react-router";
import mobile from '../assets/mobile.jpg';
import electronicsImg from '../assets/electronics1.jpg';
import appliances from '../assets/bike.jpg';
import fashion2 from '../assets/fashion2.jpg';
import Beauty from '../assets/beauty.jpg';
import Kitchen from '../assets/kitchen.jpg';
import Furniture from '../assets/furniture.jpg';
import Grocery from '../assets/grocery1.png';
import InfiniteCarousel from "../components/ui/crousel";

import mobile1 from '../assets/corousal/phone.jpg';
import kitchen2 from '../assets/corousal/kitchen3.jpg';
import laptop from '../assets/corousal/laptop.jpeg';
import fashion3 from '../assets/corousal/fashion3.jpg';
import gaming from '../assets/corousal/gaming.jpg';

const carouselItems = [
    { img: mobile1, title: "Mobile Phones", subtitle: "Latest smartphones" },
    { img: laptop, title: "Laptops", subtitle: "High performance" },
    { img: fashion3, title: "Fashion", subtitle: "Trending styles" },
    { img: kitchen2, title: "Accessories", subtitle: "Kitchen Accessories" },
    { img: gaming, title: "Gaming", subtitle: "Play in style" },
];

const HomePage = () => {
    const navigate = useNavigate();
    const categoryMap = {
        Phone: "smartphone",
        Laptop: "laptops",
        Fragrances: "fragrances",
        Kitchen: "kitchen",
        Furniture: "furniture",
        Beauty: "beauty",
        Motorcycle: "motorcycle",
        Groceries: "groceries",
        Laptops: "laptops",
    };

    const handleCategoryClick = (label) => {
        const dbCategory = categoryMap[label];
        if (dbCategory) {
            navigate(`/search?category=${dbCategory}`);
        }
    };

    return (
        <div>
            <main>
                {/* --- Category Section --- */}
                <div className="flex flex-wrap gap-6 justify-center items-center p-3 bg-gray-100">
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Phone")}
                    >
                        <img src={mobile} alt="Phone" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Phone</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Laptops")}
                    >
                        <img src={electronicsImg} alt="Laptop" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Laptops</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Fragrances")}
                    >
                        <img src={fashion2} alt="Fragrances" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Fragrances</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Kitchen")}
                    >
                        <img src={Kitchen} alt="Kitchen" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Kitchen</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Furniture")}
                    >
                        <img src={Furniture} alt="Furniture" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Furniture</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Beauty")}
                    >
                        <img src={Beauty} alt="Beauty" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Beauty</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Motorcycle")}
                    >
                        <img src={appliances} alt="Motorcycle" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Motorcycle</span>
                    </div>
                    <div
                        className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        onClick={() => handleCategoryClick("Groceries")}
                    >
                        <img src={Grocery} alt="Groceries" className="w-20 h-20 mb-2" />
                        <span className="text-sm font-medium">Groceries</span>
                    </div>
                </div>

                {/* --- Promotional Banner --- */}
                <div className="bg-blue-600 text-white p-12 text-center mx-6 my-6 rounded-lg">
                    <h1 className="text-3xl font-bold mb-2">Mega Sale! Up to 50% Off</h1>
                    <p className="text-lg">Grab the latest gadgets, fashion, and more.</p>
                    <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-100 hover:cursor-pointer transition"
                        onClick={() =>navigate("/search")}
                    >
                        Shop Now
                    </button>
                </div>

                {/* --- Carousel Section --- */}
                <div className="w-full min-h-[400px] bg-gray-100 flex items-center justify-center mt-6">
                    <InfiniteCarousel items={carouselItems} visibleCount={4} delay={3000} />
                </div>

                {/* --- Featured Products Section --- */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                            <img src={mobile} alt="Smartphone" className="h-40 w-full object-contain mb-2" />
                            <h3 className="text-sm font-medium">Smartphone X</h3>
                            <p className="text-sm text-gray-500">₹19,999</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                            <img src={electronicsImg} alt="Laptop" className="h-40 w-full object-contain mb-2" />
                            <h3 className="text-sm font-medium">Laptop Pro</h3>
                            <p className="text-sm text-gray-500">₹49,999</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                            <img src={fashion2} alt="Fashion" className="h-40 w-full object-contain mb-2" />
                            <h3 className="text-sm font-medium">Stylish Jacket</h3>
                            <p className="text-sm text-gray-500">₹2,499</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                            <img src={Kitchen} alt="Kitchen" className="h-40 w-full object-contain mb-2" />
                            <h3 className="text-sm font-medium">Kitchen Set</h3>
                            <p className="text-sm text-gray-500">₹1,999</p>
                        </div>
                    </div>
                </div>

                {/* --- Deals / Offers Section --- */}
                <div className="bg-yellow-100 p-8 text-center rounded-lg mx-6 my-6">
                    <h3 className="text-lg font-semibold mb-2">Limited Time Deals!</h3>
                    <p className="text-gray-700 mb-4">Grab your favorite items before the deal ends.</p>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">
                        Explore Deals
                    </button>
                </div>

            </main>
        </div>
    );
};

export default HomePage;
