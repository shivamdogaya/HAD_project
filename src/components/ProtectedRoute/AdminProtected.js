import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = ({
    redirectAdmin = "/admin/login",
}) => {
    const isAdminAuthenticated = useSelector((state) => state.admin.AdminLogin);
    if (!isAdminAuthenticated) {
        return <Navigate to={redirectAdmin} />;
    }
    return <Outlet/>
}

export default AdminProtected;