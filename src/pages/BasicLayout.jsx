import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../Context/AppContext";
import { Button } from "../components/ui/button";



const BasicLayout = () => {
    const { cart, addtoCart } = useAuthContext(); //This cart is object  
    const cartItems = Object.values(cart);   //This cartItems is array of object
    console.log("cartItems", cartItems);
    const isCartEmpty = cartItems.length === 0;

    return <div className={`grid ${isCartEmpty ? "grid" : "grid-cols-[1fr_175px]"
        } min-h-screen`}>
        <div>
            <Navbar />
            <Outlet />
        </div>
        {!isCartEmpty &&
            <div className="bg-gray-200 p-4">
                {cartItems.map((product, index) => {
                    return (
                        <div key={index} className="p-3 mb-3 flex items-center justify-between hover:bg-gray-300 hover:shadow-md rounded-lg cursor-pointer">
                            <div>
                                <p className="font-semibold">{product.title}</p>
                                <img src={product.images?.[0]} alt={product.ti} />
                                <p className="font-bold">₹{product.price}</p>
                                <div className="flex gap-1">
                                    <Button variant="outline-primary" >-</Button>
                                    <p className="border-1 rounded-2xl px-7"> {product.cartQuantity}</p>
                                    <Button variant="outline-primary"
                                        onClick={() => { addtoCart(product._id) }}
                                    >+</Button>
                                </div> 
                            </div>
                        </div>
                    );
                })}
            </div>
        }

    </div >
}
export { BasicLayout }