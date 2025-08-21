import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";

const Navbar = () => {
    const [query] = useSearchParams();
    const searchTextDefaultValue = query.get("q") || "";


    const [searchText, setsearchText] = useState(searchTextDefaultValue);

    const navigate = useNavigate();
    const handleSearchText = (e) => {
        setsearchText(e.target.value);
        console.log("vlaue-->", searchText);
    }
    const handleSearchPage = () => {
        navigate(`/search?q=${searchText}`)
    }
    return (
        <div className="p-6 bg-pink-950 flex items-center justify-between gap-4 w-full text-white">
            <div className="text-xl font-bold">
                <Link to='/'>My Shopping App</Link>
            </div>
            <div className="flex items-center gap-2">
                {/* controlled component */}
                <input
                    value={searchText}
                    onChange={handleSearchText}
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-pink-950"
                />

                <button onClick={handleSearchPage} className="bg-white text-pink-950 px-4 py-2 rounded-md hover:bg-gray-100">
                    Search
                </button>
            </div>
            <div className="flex gap-4 text-xl">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link to="/login" className="hover:underline text-xl">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
