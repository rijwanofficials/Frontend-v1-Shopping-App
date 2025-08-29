import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";

const ViewPage = () => {
    const [loading, setLoading] = useState(false);
    const [productsInfo, setProductsInfo] = useState(null);
    const { id } = useParams();
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
                        <pre>{JSON.stringify(productsInfo, null, 2)}</pre>
                    ) : (
                        <p>No product found</p>
                    )}
                </div>
            )}
        </>
    );
};

export default ViewPage;
