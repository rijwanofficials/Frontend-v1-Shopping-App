import { Link } from "react-router";
import Navbar from "../components/Navbar"

const PageNotFound = (user) => {
    const { isLoggedIn } = user
    return (
        <>
            <Navbar />
            {isLoggedIn ? (
                <div className="m-5 flex flex-col justify-center items-center">
                    <h1 className="text-2xl">Oops... Page not found</h1>
                    <Link to="/" className="m-2 text-xl text-blue-600 underline" >Go to HomePage</Link>
                </div>
            ) :
                (
                    <div className="m-5 flex flex-col justify-center items-center">
                        <h1 className="text-2xl">Oops... Page not found</h1>
                        <Link to="/login" className="m-2 text-xl text-blue-600 underline" >Go to LogIn Page</Link>
                    </div>
                )
            }

        </>
    )
}

export default PageNotFound;