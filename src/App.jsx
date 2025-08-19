import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ViewPage from "./pages/ViewPage";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/view/:productId" element={<ViewPage />} />
         <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;