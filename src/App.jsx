import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ViewPage from "./pages/ViewPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { ShowErrorToast } from "./utils/ToastMessageHelper";
import { ClipLoader } from "react-spinners";


const App = () => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [apploading, setappLoading] = useState(true);

  const isLoggedIn = user.isLoggedIn;
  const getUserLoggedIn = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status == 200) {
        const result = await response.json();
        setUser({
          isLoggedIn: true,
          ...result.data.user,
        });
      }
      else {
        ShowErrorToast("please log in!")
      }
    } catch (err) {
      ShowErrorToast(`Error during user validation!, ${err.message}`);
    }
    finally {
      setappLoading(false);
    }
  }

  useEffect(() => {
    getUserLoggedIn();
  }, [])


  if (apploading) {
    return <div className="h-screen flex items-center justify-center">
      <ClipLoader size={100} />
    </div>
  }


  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
