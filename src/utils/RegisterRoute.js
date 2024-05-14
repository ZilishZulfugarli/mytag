import React from "react";
import { useSelector } from "react-redux";
import { Navigate, json } from "react-router-dom";

export default function RegisterRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) return <Navigate to={"/"} />;
  return children;
}