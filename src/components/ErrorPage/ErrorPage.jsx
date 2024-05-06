import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const ErrorPage = () => {
  const error = useRouteError();
  //   console.log(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FaceFrownIcon className="w-64 h-64 text-[#747474]" />
      <h1 className="font-extrabold text-6xl md:text-8xl mb-5 gradient-text">
        {error.status}
      </h1>
      <p className="font-bold md:text-xl text-base text-[#747474]">
        {error.data}
      </p>
      <p className="font-bold md:text-xl text-base text-[#747474]">
        Try refresh the page or go back to Homepage
      </p>
      <Link className="err-primary-btn mt-6" to="/">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
