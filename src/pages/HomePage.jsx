
import mobile from '../assets/mobile.jpg';
import electronicsImg from '../assets/electronics1.jpg';
import appliances from '../assets/bike.jpg';
import fashion2 from '../assets/fashion2.jpg';
import Beauty from '../assets/beauty.jpg';
import Kitchen from '../assets/kitchen.jpg';
import Furniture from '../assets/furniture.jpg';
import Grocery from '../assets/grocery1.png';

const HomePage = () => {
    return (
        <div>
            <main>
                <div className="flex flex-wrap m-1  gap-6 justify-center items-center p-3 bg-gray-100">
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Phone"
                    >
                        <img src={mobile} alt="Electronics" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Phone</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Laptop"
                    >
                        <img src={electronicsImg} alt="Electronics" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Electronics</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Fashion"
                    >
                        <img src={fashion2} alt="Fashion" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Fashion</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Kitchen"
                    >
                        <img src={Kitchen} alt="Kitchen" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Kitchen</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Furniture"
                    >
                        <img src={Furniture} alt="Furniture" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Furniture</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Beauty"
                    >
                        <img src={Beauty} alt="Beauty" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Beauty</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="bikes"
                    >
                        <img src={appliances} alt="Bikes" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Bikes</span>
                    </div>
                    <div className="w-30 h-30 bg-white flex flex-col justify-center items-center rounded-md cursor-pointer"
                        data-category="Grocery"
                    >
                        <img src={Grocery} alt="Grocery" className="w-18 h-18 mb-2" />
                        <span className="text-sm font-medium">Grocery</span>
                    </div>
                </div>


            </main>
        </div>

    )
}

export default HomePage;