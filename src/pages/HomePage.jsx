import { useNavigate } from "react-router";
import mobile from '../assets/mobile.jpg';
import electronicsImg from '../assets/electronics1.jpg';
import appliances from '../assets/bike.jpg';
import fashion2 from '../assets/fashion2.jpg';
import Beauty from '../assets/beauty.jpg';
import Kitchen from '../assets/kitchen.jpg';
import Furniture from '../assets/furniture.jpg';
import Grocery from '../assets/grocery1.png';

import mobile1 from '../assets/corousal/phone.jpg';
import kitchen2 from '../assets/corousal/kitchen3.jpg';
import laptop from '../assets/corousal/laptop.jpeg';
import fashion3 from '../assets/corousal/fashion3.jpg';
import gaming from '../assets/corousal/gaming.jpg';
import { Carousel } from "../components/ui/Carousel";
import { useAuthContext } from "../Context/AppContext";
import { HomePageShimmer } from "./Shimmer/HomePageShimmer"; // ✅ Only one shimmer

const carouselItems = [
    { img: mobile1, title: "Mobile Phones", subtitle: "Latest smartphones" },
    { img: laptop, title: "Laptops", subtitle: "High performance" },
    { img: fashion3, title: "Fashion", subtitle: "Trending styles" },
    { img: kitchen2, title: "Accessories", subtitle: "Kitchen Accessories" },
    { img: gaming, title: "Gaming", subtitle: "Play in style" },
];

const HomePage = () => {
    const { appLoading } = useAuthContext();
    console.log("appLoading:", appLoading);
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

    if (appLoading) {
        console.log("App is loading, showing shimmer");
        return <HomePageShimmer />;
    }

    return (
        <div>
            <main>
                {/* --- Category Section --- */}
                <div className="flex flex-wrap gap-6 justify-center items-center p-3 bg-gray-100">
                    {[
                        { label: "Phone", img: mobile },
                        { label: "Laptops", img: electronicsImg },
                        { label: "Fragrances", img: fashion2 },
                        { label: "Kitchen", img: Kitchen },
                        { label: "Furniture", img: Furniture },
                        { label: "Beauty", img: Beauty },
                        { label: "Motorcycle", img: appliances },
                        { label: "Groceries", img: Grocery },
                    ].map((cat) => (
                        <div
                            key={cat.label}
                            className="w-32 h-32 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                            onClick={() => handleCategoryClick(cat.label)}
                        >
                            <img src={cat.img} alt={cat.label} className="w-20 h-20 mb-2" />
                            <span className="text-sm font-medium">{cat.label}</span>
                        </div>
                    ))}
                </div>

                {/* --- Promotional Banner --- */}
                <div className="bg-blue-600 text-white p-12 text-center mx-6 my-6 rounded-lg">
                    <h1 className="text-3xl font-bold mb-2">Mega Sale! Up to 50% Off</h1>
                    <p className="text-lg">Grab the latest gadgets, fashion, and more.</p>
                    <button
                        className="mt-4 bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-100 hover:cursor-pointer transition"
                        onClick={() => navigate("/search")}
                    >
                        Shop Now
                    </button>
                </div>

                {/* --- Carousel Section --- */}
                <div className="mx-6 mb-6 p-6">
                    <Carousel items={carouselItems} visibleCount={4} delay={3000} />
                </div>



                {/* --- Featured Products Section --- */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {[
                            { name: "Smartphone X", price: "₹19,999", img: mobile },
                            { name: "Laptop Pro", price: "₹49,999", img: electronicsImg },
                            { name: "Stylish Jacket", price: "₹2,499", img: fashion2 },
                            { name: "Kitchen Set", price: "₹1,999", img: Kitchen },
                        ].map((prod) => (
                            <div
                                key={prod.name}
                                className="bg-white p-4 shadow rounded hover:shadow-lg transition"
                            >
                                <img src={prod.img} alt={prod.name} className="h-40 w-full object-contain mb-2" />
                                <h3 className="text-sm font-medium">{prod.name}</h3>
                                <p className="text-sm text-gray-500">{prod.price}</p>
                            </div>
                        ))}
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

export { HomePage };
