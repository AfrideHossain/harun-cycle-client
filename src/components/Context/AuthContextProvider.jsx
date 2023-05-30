import { data } from "autoprefixer";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [incomeToday, setIncomeToday] = useState(0);
  const [invoiceData, setInvoiceData] = useState({});
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    fetch(`${import.meta.env.VITE_BACKURL}/auth/userDecp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  // context values goes here
  const contextValue = {
    user,
    setUser,
    loading,
    setLoading,
    invoiceData,
    setInvoiceData,
    incomeToday,
    setIncomeToday,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
