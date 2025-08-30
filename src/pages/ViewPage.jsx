import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { useAuthContext } from "../Context/AppContext";

const ViewPage = () => {
    const [loading, setLoading] = useState(false);
    const [productsInfo, setProductsInfo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthContext();
    console.log(isLoggedIn);
    console.log("🟢 Product ID from route:", id);
    const viewProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/view/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch product:", response.status);
                return;
            }

            const result = await response.json();
            console.log("✅ API result:", result);
            setProductsInfo(result.data.product);
        } catch (err) {
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewProducts();
    }, [id]);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            ShowSuccessToast("Product is added to the cart");
            // add to cart functionality
        }
        else {
            ShowErrorToast("Please log in to add products to the cart");
            // redirecting user after logged in
            navigate(`/login?redirect=/view/${id}`);
        }
    }

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <ClipLoader size={100} />
                </div>
            ) : (
                <div>
                    <h1>Here is your product</h1>
                    {productsInfo ? (
                        <>
                            <pre>{JSON.stringify(productsInfo, null, 2)}</pre>
                            <div className="flex items-center p-5">
                                <Button onClick={handleAddToCart}> Add to Cart</Button>
                            </div>
                        </>

                    ) : (
                        <p>No product found</p>
                    )}
                </div>
            )}
        </>
    );
};

export default ViewPage;
