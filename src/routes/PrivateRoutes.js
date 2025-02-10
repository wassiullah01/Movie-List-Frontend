import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [permissions, setPermissions] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUserEmail = localStorage.getItem("currentUserEmail");

        if (currentUserEmail) {
            const currentUser = users.find(user => user.email === currentUserEmail);

            if (currentUser) {
                setPermissions(currentUser.permissions || {});
                setIsAuthenticated(true);
                setIsAdmin(currentUser.email === "admin@gmail.com");
            } else {
                setIsAuthenticated(false);
                setPermissions(null);
            }
        } else {
            setIsAuthenticated(false);
            setPermissions(null);
        }

        setLoading(false);
    }, []);

    if (loading || permissions === null) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signIn" />;
    }

    if (location.pathname === "/admin" && !isAdmin) {
        return <Navigate to="/" />;
    }

    const routePermissions = {
        "add": "create",
        "edit": "update",
        "view": "read",
    };

    const currentPath = location.pathname.split("/")[1];

    if (currentPath === "") {
        return <Outlet />;
    }

    const permissionKey = routePermissions[currentPath];
    const hasPermission = permissionKey && permissions[permissionKey];

    if (permissionKey && !hasPermission) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;