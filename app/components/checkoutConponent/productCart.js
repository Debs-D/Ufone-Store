"use client";
// import Image from "next/image";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { ContextFunction } from "../../Context/Context";
import { toast } from "react-toastify";
// import OrderSummary from './OrderSummary'
import axios from "axios";
import { usePaystackPayment } from "react-paystack";

const ProductCheckoutConponent = (props) => {
  const URL_END = "https://ufuon-store.vercel.app/api";
  const URL_LOCAL_END = "http://localhost:43000/api";
  const { cart, setCart } = useContext(ContextFunction);
  const [total, setTotal] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [previousOrder, setPreviousOrder] = useState([]);
  const [shippingCoast, setShippingCoas] = useState(null);
  const [shipData, setShepData] = useState(null);
  const [school, setSchool] = useState(null);
  const [antoine, setAntoine] = useState(false);
  const [schoolSelected, setSchoolSelected] = useState(null);
  const [value, setValue] = useState(1);
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState([]);
  // const [shiping ,setShiping] = useState()
  const [user, setUser] = useState(null);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userEmail: "",
    address: "",
    zipCode: "",
    city: "",
    userState: "",
  });
  useEffect(() => {
    if (setProceed) {
      getUserData();
    } else {
      // navigate('/')
    }
  }, []);
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${URL_LOCAL_END}/auth/getuser`, {
        headers: {
          Authorization: authToken,
        },
      });
      // console.log('-------------------user',data)
      setUserData(data);
      setUser(data);
      setEmail(data.email);
      if (!data.address || !data.city || !data.zipCode || !data.userState) {
        setOpenAlert(true);
        console.log(1);
      }

      userDetails.firstName = data.firstName;
      userDetails.lastName = data.lastName;
      userDetails.userEmail = data.email;
      userDetails.phoneNumber = data.phoneNumber;
      userDetails.address = data.address;
      userDetails.zipCode = data.zipCode;
      userDetails.city = data.city;
      userDetails.userState = data.userState;
    } catch (error) {
      console.log(error);
    }
  };

  let totalAmount = sessionStorage.getItem("totalAmount");
  let where = sessionStorage.getItem("where");
  let shiping = sessionStorage.getItem("shiping");
  const referenceNumber = () => {
    return "bld" + Math.floor(Math.random() * 1000000000 + 1);
  };

  const config = {
    reference: referenceNumber(),
    email: email,
    amount: totalAmount + 0 + 0,
    publicKey: process.env.REACT_APP_PAYSTACTPAYEMT_LIVE_FRONT,
  };

  const initializePayment = usePaystackPayment(config);

  // const navigate = useNavigate()
  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken ? true : false;

  useEffect(() => {
    if (setProceed) {
      getCart();
      // getPreviousOrder()
    } else {
      setOpenAlert(true);
    }
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (setProceed) {
      setTotal(
        cart.reduce(
          (acc, curr) => acc + curr.productId?.price * curr.quantity,
          0
        )
      );
    }
  }, [cart]);

  const getCart = async () => {
    if (setProceed) {
      const { data } = await axios.get(`${URL_LOCAL_END}/api/cart/fetchcart`, {
        headers: {
          Authorization: authToken,
        },
      });
      setCart(data);
    }
  };

  const passData = (data) => {
    // console.log("passData---------->",data)
    // shippingCoast = parseFloat(data)
    setShippingCoas(parseFloat(data.amount));
    setShepData(data.label);
    setTotal(
      cart.reduce(
        (acc, curr) =>
          acc +
          (curr.productId?.price * curr.quantity + parseFloat(data.amount)),
        0
      )
    );
  };

  const moneyFormat = (price, sign = "N") => {
    const pieces = parseFloat(price).toFixed(2).split("");
    let ii = pieces.length - 3;
    while ((ii -= 3) > 0) {
      pieces.splice(ii, 0, ",");
    }
    return sign + pieces.join("");
  };

  const checkOutHandler = async (e) => {
    e.preventDefault();
    console.log("amount data------open------->");
    // if (!userDetails.firstName || !userDetails.lastName || !userDetails.userEmail || !userDetails.phoneNumber || !userDetails.address || !userDetails.zipCode || !userDetails.city || !userDetails.userState) {
    //     toast.error("Please fill all fields", { autoClose: 500, theme: "colored" })
    // }
    // else {
    // console.log('amount data------------->', process.env.REACT_APP_PAYSTACTPAYEMT_TEXTING_FRONT )
    initializePayment(onSuccess, onClose);

    // }
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const onSuccess = (reference) => {
    // console.log('--------------------->plan',reference,shiping,where)
    const CreateData = {
      reference: reference.reference,
      user: user._id,
      productDetails: JSON.stringify(cart),
      userId: userData._id,
      userDetails: JSON.stringify(userDetails),
      student: true,
      shiping,
      school: school === null ? null : school.label,
      where,
      amount: totalAmount,
      currency: "NGN",
      name: userData.firstName + " " + userData.lastName,
      description: "Payment",
      image: profile,
      prefill: {
        name: userData.firstName + " " + userData.lastName,
        email: userData.email,
        contact: userData.phoneNumber,
      },
    };
    // console.log('--------------------->plan',CreateData)
    if (reference.status === "success") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(CreateData),
      };
      fetch(`${process.env.REACT_APP_PAYEMENTVERIFICATION}`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.data.status === true) {
            // console.log('---------------------->',res.data.status )
            timePush();
          }
        })
        .catch((error) => {});
    }
  };

  console.log(cart, "===<><>");
  return (
    <div className="check-Order">
      <h3>Your Order</h3>
      <div className="check-Order-sub">
        <p className="font-Inter">Sub total</p>
        <h4 className="font-Inter">Product</h4>
        {cart.length > 0 &&
          cart.map((item) => (
            <div className="check-product-info">
              <div className="check-product-img">
                <img src={item.productId.images[0].url} alt="img" />
              </div>
              <div className="check-product-detail">
                <h3 className="font-Inter">{item.productId.name}</h3>
              </div>
            </div>
          ))}
        <div className="check-Worldwide">
          <h4 className="font-Inter">+ $9.50</h4>
          <h2 className="font-Inter">Worldwide Standard Shipping Free</h2>
        </div>

        <div className="check-Worldwide">
          <h5 className="font-Inter">+{moneyFormat(total - shippingCoast)}</h5>
          <h6 className="font-Inter">Order Total</h6>
        </div>
      </div>

      <div className="check-Transfer">
        <button
          type="button"
          onClick={checkOutHandler}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};

export default ProductCheckoutConponent;
