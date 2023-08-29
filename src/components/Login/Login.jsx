import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../Shared/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser, setLoading, loading } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(loading);
    let authResult = await fetch(
      `${import.meta.env.VITE_BACKURL}/auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    let resp = await authResult.json();
    if (resp.success) {
      let userInfo = resp.user;
      Cookies.set("token", resp.authToken, { expires: 1 });
      setUser(userInfo);
      setLoading(false);
    } else {
      setError("Incorrect email or password");
      toast.error("Oops🤧, Invalid credentials");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen">
      {loading && <Loading />}
      <div className="w-full md:w-96 bg-white rounded-lg shadow-lg m-5">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign In
          </h2>
          <form className="mt-6" onSubmit={handleEmailLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-400 rounded-md appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 font-bold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-400 rounded-md appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6 text-center">
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
