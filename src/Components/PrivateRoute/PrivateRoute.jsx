import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../Providers/AuthProvider";
// import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  let { user, loading } = useContext(AuthContext);
  // let [message,setMessage]=useState("")
  // const msg=toast("Please Loagin First to access this pages")
  if (user) {
    return children;
  }
  // if (loading) {
  //   return <Spinner></Spinner>;
  // }
  return (
    <div>
      <Navigate state={{ from: location }} to={"/login"} replace></Navigate>
    </div>
  );
};

export default PrivateRoute;
