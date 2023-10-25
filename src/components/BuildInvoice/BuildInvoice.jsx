import React, { useContext, useEffect, useState } from "react";
import "./BuildInvoice.css";
import {
  UserIcon,
  BanknotesIcon,
  CurrencyBangladeshiIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import Swal from "sweetalert2";

const BuildInvoice = () => {
  const token = Cookies.get("token");
  const mainUrl = import.meta.env.VITE_BACKURL;
  const navigate = useNavigate();

  const loaderData = useLoaderData();
  // console.log(loaderData?.allProducts);
  const products = loaderData?.allProducts;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [due, setDue] = useState(0);
  const [paid, setPaid] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPayment, setCurrentPayment] = useState(0);
  const [purchaseItems, setPurchaseItems] = useState([
    { name: "", warranty: "", quantity: 0, price: 0 },
  ]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { setInvoiceData } = useContext(AuthContext);

  // temp code

  const handleProductChange = (index, productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    if (selectedProduct) {
      const updatedItems = [...purchaseItems];
      updatedItems[index] = {
        ...updatedItems[index],
        productId: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.retail,
        warranty: selectedProduct.warranty,
      };
      setPurchaseItems(updatedItems);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let bodydata = {
      customerId,
      fullName,
      phone,
      address,
      due,
      purchaseItems,
      paid,
      total,
      currentPayment,
    };
    // Add logic to submit data to database or API
    fetch(`${mainUrl}/manage/customerbill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(bodydata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log(data);
          let invoice = {
            ...bodydata,
            date: data.date,
            invoiceNumber: data.invoiceNumber,
            clientId: data._id,
          };
          setInvoiceData(invoice);
          navigate("/invoice");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Insufficient stock`,
            html: `<b>Product Name : </b> ${data.product.name} <br /><b>Available Quantity : </b> ${data.product.quantity} <br />`,
            showConfirmButton: false,
            timer: 5000,
          });
        }
      });
  };

  const handleAddItem = () => {
    setPurchaseItems([
      ...purchaseItems,
      { name: "", warranty: "", quantity: 0, price: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...purchaseItems];
    newItems.splice(index, 1);
    setPurchaseItems(newItems);
  };

  const handleItemChange = (index, key, value) => {
    const newItems = [...purchaseItems];
    newItems[index][key] = value;
    setPurchaseItems(newItems);
  };

  // searchClientHandler function
  const searchClientHandler = (phone) => {
    setError("");
    setLoading(true);
    fetch(`${mainUrl}/manageclient/client/${phone}`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let { _id, clientName, clientPhone, clientAddress, clientDueAmount } =
            data.client;
          setCustomerId("" + _id);
          setFullName(clientName);
          setPhone(clientPhone);
          setAddress(clientAddress);
          setDue(clientDueAmount);
        } /* else {
          setError(`User not found with phone number ${phone}`);
        } */
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };

  const handlePhoneOnBlur = (phone) => {
    setLoading(true);
    fetch(`${mainUrl}/manageclient/client/${phone}`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          Swal.fire({
            title: "Continue with existing customer?",
            text: "There is already a customer with the same phone number.",
            icon: "question",
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: "#00b330",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Continue!",
            cancelButtonText: "No, Try again",
          }).then((result) => {
            if (result.isConfirmed) {
              let {
                _id,
                clientName,
                clientPhone,
                clientAddress,
                clientDueAmount,
              } = data.client;
              setCustomerId("" + _id);
              setFullName(clientName);
              setPhone(clientPhone);
              setAddress(clientAddress);
              setDue(clientDueAmount);
            } else {
              setCustomerId("");
              setFullName("");
              setPhone("");
            }
          });
        } /* else {
          setError(`User not found with phone number ${phone}`);
        } */
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    let totalAmount = due;
    purchaseItems.map((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  }, [purchaseItems, due]);
  useEffect(() => {
    if (currentPayment === total) {
      setPaid(true);
    } else {
      setPaid(false);
    }
  }, [total, currentPayment]);

  return (
    <div className="container mt-5">
      {loading && <Loading />}
      {window.innerWidth < 662 ? (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen bg-white rounded-lg">
            <img
              src="https://i.ibb.co/xSBvYV5/sysadmin-03-removebg-preview.png" // Replace with the actual path to your image
              alt="404 Not Found"
              className="mb-8 w-64 sm:w-96 animate-pulse"
            />
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4">
              Oops!
            </h1>
            <p className="text-lg sm:text-xl text-gray-800 mb-8 text-center px-4 sm:px-8">
              Please consider using a computer to create invoices.
            </p>
            <Link
              to="/"
              className="px-6 py-3 rounded-md bg-blue-500 text-white font-bold shadow-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out"
            >
              Go Back to Home
            </Link>
          </div>
        </>
      ) : (
        <form id="bill-form" onSubmit={handleSubmit}>
          <h1 className="font-bold">Invoice Form</h1>
          <div className="form-control flex items-center p-1 border border-gray-300 rounded text-base font-semibold text-gray-700">
            <UserIcon className="w-8 mx-2" />
            <input
              type="text"
              id="customer_phone"
              className="border-none"
              value={phone}
              // placeholder="Phone Number (if customer already exist)"
              placeholder="Enter phone number if customer already exist (e.g. 01XXXXXXXXX)"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <button
              className="bg-gray-700 text-white border-none px-5 py-3 rounded font-bold text-lg cursor-pointer transition duration-300 ease-in-out"
              type="button"
              onClick={() => searchClientHandler(phone)}
            >
              Search
            </button>
          </div>
          {error && (
            <p className="text-base text-red-600 font-medium form-control">
              {error}
            </p>
          )}
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={(e) => {
                handlePhoneOnBlur(phone);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="due">Due</label>
            <input type="text" id="due" required value={due} readOnly />
          </div>

          <div className="form-control">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              rows="2"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div id="order-details">
            <div className="product-details-head form-control">
              <label htmlFor="product-name">Product Name</label>
              <label htmlFor="product-quantity">Quantity</label>
              <label htmlFor="product-price">Price (taka per quantity)</label>
              <label htmlFor="product-warranty">Warranty (if available)</label>
            </div>

            {purchaseItems.map((item, index) => (
              <div key={index} className="product-details form-control">
                <div className="form-control">
                  <select
                    value={item.productId || ""}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Render other fields (quantity, price, warranty) based on selected product */}
                {item.productId && (
                  <>
                    <div className="form-control">
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        className="product-quantity"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        id={`price-${index}`}
                        className="product-price"
                        value={item.price || ""}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="text"
                        id={`warranty-${index}`}
                        className="product-warranty"
                        value={item.warranty || ""}
                        onChange={(e) =>
                          handleItemChange(index, "warranty", e.target.value)
                        }
                      />
                    </div>
                    <button
                      className="btn-red"
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            ))}
            <div className="form-control flex items-center gap-2 text-base font-semibold text-gray-700">
              <input
                type="checkbox"
                id="paid-status"
                className="border-none w-4 h-4"
                checked={paid}
                onChange={() => {
                  setPaid(!paid);
                }}
              />
              <p className="text-lg font-bold">Paid</p>
            </div>
            {/* total amount with due */}
            <div className="form-control flex items-center p-1 border border-gray-300 rounded text-base font-semibold text-gray-700">
              <BanknotesIcon className="w-8 mx-2" />
              <input
                type="text"
                id="total-amount"
                className="border-none"
                value={`${total} Taka`}
                readOnly
              />
              <p className="w-auto whitespace-nowrap bg-slate-500 bg-opacity-50 px-2 py-3 rounded font-bold">
                Total Payable
              </p>
            </div>
            <div className="form-control flex items-center p-1 border border-gray-300 rounded text-base font-semibold text-gray-700">
              <CurrencyBangladeshiIcon className="w-8 mx-2" />
              <input
                type="number"
                id="current-payment"
                className="border-none"
                value={currentPayment}
                onChange={(e) => {
                  setCurrentPayment(parseInt(e.target.value));
                }}
              />
              <p className="w-auto whitespace-nowrap bg-slate-500 bg-opacity-50 px-2 py-3 rounded font-bold">
                Current Payment
              </p>
            </div>
            <button
              className="btn-dark"
              type="button"
              onClick={() => handleAddItem()}
            >
              Add Item
            </button>
            <input className="btn-submit-1" type="submit" value="Submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default BuildInvoice;
