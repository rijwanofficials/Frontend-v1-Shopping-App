import { Link, Outlet, useLocation } from "react-router";

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
    const { pathname } = useLocation()

    return (
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
    )

}
export { AdminLayout };