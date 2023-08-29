import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import HomePage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import CustomerInfo from "./components/CustomerInfo/CustomerInfo";
import AddProduct from "./components/AddProduct/AddProduct";
import CustomerInfoUpdate from "./components/CustomerInfoUpdate/CustomerInfoUpdate";
import BuildInvoice from "./components/BuildInvoice/BuildInvoice";
import Login from "./components/Login/Login";
import AuthContextProvider from "./components/Context/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrintInvoice from "./components/PrintInvoice/PrintInvoice";
import Cookies from "js-cookie";
import Products from "./components/Products/Products";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import AllCustomers from "./components/AllCustomers/AllCustomers";

const mainUrl = import.meta.env.VITE_BACKURL;
const token = Cookies.get("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard " />,
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/customerinfo/:id",
        element: (
          <PrivateRoute>
            <CustomerInfo />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          let customer = await fetch(
            `${mainUrl}/manageclient/client/${params.id}`,
            {
              method: "GET",
              headers: {
                "auth-token": token,
              },
            }
          );
          let customerJson = await customer.json();
          return customerJson.client;
        },
      },
      {
        path: "/customerinfo",
        element: (
          <PrivateRoute>
            <CustomerInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/customerinfoupdate",
        element: (
          <PrivateRoute>
            <CustomerInfoUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "/addproduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateproduct/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          let loadData = fetch(`${mainUrl}/manage/product/${params.id}`, {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          });
          let fetchedData = (await loadData).json();
          return fetchedData;
        },
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/customers",
        element: (
          <PrivateRoute>
            <AllCustomers />
          </PrivateRoute>
        ),
      },
      {
        path: "/buildinvoice",
        element: (
          <PrivateRoute>
            <BuildInvoice />
          </PrivateRoute>
        ),
        loader: async () => {
          let loadData = fetch(`${mainUrl}/manage/allproducts`, {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          });
          let fetchedData = (await loadData).json();
          return fetchedData;
        },
      },
      {
        path: "/invoice",
        element: (
          <PrivateRoute>
            <PrintInvoice />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
