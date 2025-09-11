import { Link, Outlet, useLocation } from "react-router";
import { useAdminContext } from "../../Context/AdminCOntext";
import { ClipLoader } from "react-spinners";


const ROUTES_CONGIF = [
    {
        title: "Dashboard",
        routes: "/admin/dashboard"
    },
    {
        title: "Orders",
        routes: "/admin/orders"
    },
    {
        title: "Products",
        routes: "/admin/products"
    },
    {
        title: "Feedback",
        routes: "/admin/feedback"
    }

]


const AdminLayout = () => {

    const { adminUser, adminInfoLoading } = useAdminContext();
    const { pathname } = useLocation()

    if (adminInfoLoading) {
        return <div className="h-screen flex items-center justify-center">
            <ClipLoader size={100} />
        </div>
    }

    if (!adminUser ||adminUser.isLoggedIn) {
        return (
            <div>
                <div className="grid grid-cols-[234px_1fr]">
                    <div className="flex flex-col gap-5 p-5 bg-amber-200 min-h-screen">
                        {ROUTES_CONGIF.map((elem) => {
                            const isCurritem = pathname == elem.routes
                            return (
                                <Link className={`text-xl text-blue-600 font-bold transition px-2 py-1 w-fit rounded-md
                                     ${isCurritem ? 'bg-blue-600 text-white '
                                        : 'hover:underline hover:scale-102 cursor-pointer hover:text-blue-700 '}
                                            `}
                                    to={elem.routes}
                                >
                                    {elem.title}</Link>
                            )
                        })}
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div >
            </div>
        )
    }
    else {
        console.log("Hello");
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">
                    <p className="text-red-600 text-3xl font-bold mb-4">Access Denied</p>
                    <p className="text-gray-700 text-lg">
                        You don’t have permission to view this page.
                    </p>
                </div>
            </div>
        );

    }


}
export { AdminLayout };