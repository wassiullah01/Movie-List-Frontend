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
    ];

    const matchedRoutes = matchRoutes(validRoutes, location);
    const is404 = !matchedRoutes;
    
    const protectPaths = paths.includes(location.pathname) || is404
    
    return (
        <>
            {!protectPaths && <Navbar />}
                <Outlet />
            {!protectPaths && <Footer />}
        </>
    );
}

export default RootLayout;