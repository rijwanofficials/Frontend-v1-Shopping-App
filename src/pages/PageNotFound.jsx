import { Link } from "react-router";
import Navbar from "../components/Navbar"

const PageNotFound = () => {
    return (
        <>
            <Navbar />
            <div className="m-5 flex flex-col justify-center items-center">
                <h1 className="text-2xl">Oops... Page not found</h1>
                <Link to="/" className="m-2 text-xl text-blue-600 underline" >Go to HomePage</Link>
            </div>
        </>
    )
}

export default PageNotFound;