import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import {SearchPage} from "./pages/SearchPage";
import ViewPage from "./pages/ViewPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { ClipLoader } from "react-spinners";
import { BasicLayout } from "./pages/BasicLayout";
import CartPage from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminOrdersPage } from './pages/Admin/AdminOrdersPage';
import { AdminFeedbackPage } from "./pages/Admin/AdminFeedback";
import { AdminProductPage } from "./pages/Admin/AdminProductPage";
import { MyOrders } from "./pages/MyOrders";
import { AdminContextProvider } from "./Context/AdminContext";
import { useAuthContext } from "./Context/AppContext";
import AddressPage from "./pages/AddressPage";



const App = () => {
  const { apploading, isLoggedIn } = useAuthContext();

  if (apploading) {
    return <div className="h-screen flex items-center justify-center">
      <ClipLoader size={100} />
    </div>
  }
  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<BasicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>
        <Route path="/admin" element={
          <AdminContextProvider>
            <AdminLayout />
          </AdminContextProvider>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="feedback" element={<AdminFeedbackPage />} />
          <Route path="products" element={<AdminProductPage />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
