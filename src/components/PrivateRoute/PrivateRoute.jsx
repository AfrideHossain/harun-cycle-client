import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../Context/AuthContextProvider";
import Loading from "../Shared/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authToken = Cookies.get("token");
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (authToken) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
