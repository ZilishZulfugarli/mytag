import React from "react";
import { useSelector } from "react-redux";
import { Navigate, json } from "react-router-dom";

export default function AdminRoute({ children }) {
    const users = JSON.parse(localStorage.getItem('user'));

    if (!users) {
        return <Navigate to={"/"} />
    }

    const role = users.role;

    

    if (role == "User") {
        return <Navigate to={"/"} />
    }
    return children;
}