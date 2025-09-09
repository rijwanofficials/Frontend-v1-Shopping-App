import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ViewPage from "./pages/ViewPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "./Context/AppContext";
import { BasicLayout } from "./pages/BasicLayout";
import CartPage from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";

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
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
