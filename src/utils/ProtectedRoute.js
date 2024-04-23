import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
//   const { email } = useSelector((x) => x.account);
//   if (!email) return <Navigate to={"/"} />;
  return children;
}