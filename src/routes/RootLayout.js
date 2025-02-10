import { matchRoutes, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const RootLayout = () => {
    const location = useLocation()
    const paths = ["/signIn","/signUp"]

    const validRoutes = [
        { path: "/" },
        { path: "/signIn" },
        { path: "/signUp" },
        { path: "/add" },
        { path: "/view/:id" },
        { path: "/edit/:id" },
        { path: "/admin" },
    ];

    const matchedRoutes = matchRoutes(validRoutes, location);
    const is404 = !matchedRoutes;
    
    const protectPaths = paths.includes(location.pathname) || is404

    const isAdminRoute = location.pathname === "/admin";
    
    return (
        <>
            {isAdminRoute && <Navbar />}
            {!protectPaths && !isAdminRoute && <Navbar />}
                <Outlet />
            {!protectPaths && !isAdminRoute && <Footer />}
        </>
    );
}

export default RootLayout;