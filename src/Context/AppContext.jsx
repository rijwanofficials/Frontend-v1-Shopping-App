import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";

const AuthContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [appLoading, setAppLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false); // for getCartItems
  const [addingItems, setAddingItems] = useState({});
  const [removingItems, setRemovingItems] = useState({});
  const { isLoggedIn } = user;
  const [cartVersion, setCartVersion] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false); // for placing order

  // Fetch logged-in user
const getUserLoggedIn = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/me`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      console.log("API response:", result);
      setUser({ ...result.data.data, isLoggedIn: true });
      
      // If you want to see it immediately, log result.data.data
      console.log("User info from API:", result.data.data);

    } else {
      ShowErrorToast("Please log in!");
    }
  } catch (err) {
    ShowErrorToast(`Error during user validation: ${err.message}`);
  } finally {
    setAppLoading(false);
  }
};

useEffect(() => {
  getUserLoggedIn();
}, []);

  
  useEffect(() => {
      getCartItems();
  }, [cartVersion]);
  
  const handleLogOutClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        ShowSuccessToast("You are now logged out!");
        setUser({ isLoggedIn: false });
        setCart([]);
      } else {
        const data = await response.json();
        ShowErrorToast(data.message);
      }
    } catch (err) {
      ShowErrorToast(`Error during logout: ${err.message}`);
    }
  };
  
  const getCartItems = async () => {
    setCartLoading(true); // start loader
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.status === 200 && result.data?.cart) {
        setCart(result.data.cart);
      } else {
       console.log("Failed to fetch cart items!");
      }
    } catch (err) {
      ShowErrorToast(`Error fetching cart: ${err.message}`);
    } finally {
      setCartLoading(false); // stop loader
    }
  };
  
  const addtoCart = async (productId) => {
    setAddingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}/add`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        ShowSuccessToast("Product added to cart!");
        const updatedItem = result.cartItem;
        setCart((prev) => ({ ...prev, [updatedItem._id]: updatedItem }));
      } else {
        ShowErrorToast(result.message || "Failed to add to cart!");
      }
    } catch (err) {
      ShowErrorToast(`Error adding to cart: ${err.message}`);
    } finally {
      setAddingItems((prev) => ({ ...prev, [productId]: false }));
      setCartVersion((prev) => prev + 1);
    }
  };
    
  const removeFromCart = async (productId) => {
    setRemovingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}/remove`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();

      if (response.ok) {
        ShowSuccessToast(
          result.cartItem
            ? "Product quantity decreased!"
            : "Product removed from cart!"
        );
        const updatedItem = result.cartItem;

        setCart((prev) => {
          const newCart = { ...prev };
          if (updatedItem) {
            newCart[updatedItem._id] = updatedItem;
          } else {
            delete newCart[productId];
          }
          return newCart;
        });
        setCartVersion((prev) => prev + 1);
      } else {
        ShowErrorToast(result.message || "Failed to remove from cart!");
      }
    } catch (err) {
      ShowErrorToast(`Error removing from cart: ${err.message}`);
    } finally {
      setRemovingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };
  
 const handleCheckout = async (address) => {
  console.log("Sending order with address:", address); // 🔹 Check address structure
  setPlacingOrder(true);

  try {
    const payload = {
      fullName: address.fullName,
      phoneNumber: `${address.countryCode}${address.phoneNumber}`, 
      street: address.street,
      city: address.city,
      state: address.region,      
      zipCode: address.zipCode,
      country: address.country,
    };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ address: payload }),
    });
    const result = await response.json();
    if (response.ok) {
      ShowSuccessToast("Order placed successfully!");
      setCart([]);
      return result.data.paymentDetails.payment_session_id;
    } else {
      ShowErrorToast(result.message || "Failed to place order!");
      return null;
    }
  } catch (err) {
    ShowErrorToast(`Error placing order: ${err.message}`);
  } finally {
    setPlacingOrder(false);
  }
};


const useFilteredProducts = ({ category, minPrice = 0, maxPrice = Infinity, page = 1, limit = 10 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {
          category,
          minPrice,
          ...(maxPrice !== Infinity && { maxPrice }),
          page,
          limit,
        };
        const queryString = new URLSearchParams(params).toString();

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/products/filter?${queryString}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setProducts(result.products);
        } else {
          ShowErrorToast(result.message || "Failed to fetch products!");
          setError(result.message);
        }
      } catch (err) {
        ShowErrorToast(`Error fetching products: ${err.message}`);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [category, minPrice, maxPrice, page, limit]); // 👈 Dependency array for auto-refetch

  return { products, loading, error };
}

  
  const handleSetUser = (data) => setUser(data);
  
  const sharedValues = {
    appLoading,
    isLoggedIn,
    user,
    handleSetUser,
    handleLogOutClick,
    cart,
    addtoCart,
    cartLoading,
    removeFromCart,
    addingItems,
    removingItems,
    handleCheckout,
    placingOrder,
    getCartItems,
    useFilteredProducts,
  };
  
  return (
    <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);
// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AppContextProvider, useAuthContext };
