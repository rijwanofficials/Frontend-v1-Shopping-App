import { Link } from "react-router";
import Navbar from "../components/Navbar";

const LoginPage = () => {
    return (
        <>
            <Navbar />
            <div className="text-2xl m-5 flex flex-col justify-center items-center">
                <div>Login Page</div>
            </div>
            <Link to="/signup" className="text-xl text-blue-600 underline flex justify-center items-center">Signup Page</Link>
        </>
    )
};

export default LoginPage;