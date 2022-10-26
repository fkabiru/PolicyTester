import React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import AdminDashBoarrd from "../Admin/dashboard";

const ProtectedRoute = () => {
  // const nav = useNavigate();
  let user = localStorage.getItem("curUserEmail");
  // debugger;
  if (user == "null") {
    return <Navigate to="/" />;
  } else {
    return <AdminDashBoarrd />;
  }
};
export default ProtectedRoute;
