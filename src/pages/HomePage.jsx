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

const carouselItems = [
    { img: mobile, title: "Mobile Phones", subtitle: "Latest smartphones" },
    { img: electronicsImg, title: "Laptops", subtitle: "High performance" },
    { img: fashion2, title: "Fashion", subtitle: "Trending styles" },
    { img: Kitchen, title: "Accessories", subtitle: "Kitchen Accessories" },
    { img: electronicsImg, title: "Gaming", subtitle: "Play in style" },
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

                <div className="w-full min-h-[400px] bg-gray-100 flex items-center justify-center mt-6">
                    <InfiniteCarousel items={carouselItems} visibleCount={4} delay={3000} />
                </div>
                <div>
                    <div className="text-lg font-semibold"></div>
                </div>
            </main>
        </div>

    );
};

export default HomePage;
