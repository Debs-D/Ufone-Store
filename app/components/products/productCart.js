"use client";
// import Image from "next/image";
import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import { ContextFunction } from '../../Context/Context';
import { toast } from 'react-toastify'
// import OrderSummary from './OrderSummary'
import axios from 'axios'


const ProductCartConponent = (props) => {


    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
    const { cart, setCart } = useContext(ContextFunction)
    const [total, setTotal] = useState(0)
    const [openAlert, setOpenAlert] = useState(false);
    const [previousOrder, setPreviousOrder] = useState([]);
    const [shippingCoast, setShippingCoas] = useState(null);
    const [shipData, setShepData] = useState(null);

    const  moneyFormat =(price, sign = 'N') =>{
        const pieces = parseFloat(price).toFixed(2).split('')
        let ii = pieces.length - 3
        while ((ii-=3) > 0) {
          pieces.splice(ii, 0, ',')
        }
        return sign + pieces.join('')
  
        
      }

    // const navigate = useNavigate()
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false


    return (
            <div className="product-cart">
                    <h3 className="font-Inter">Your Cart</h3>
                    {
                        console.log('log--------------->',cart)
                    }
                   
                    {
                        setProceed &&
                        cart.length <= 0 &&
                        <div className="cart-empty-body">
                            <div className="main-card">
                                <img src={'https://res.cloudinary.com/dxguqzge7/image/upload/v1682838909/Cart_bk4xgl.jpg'} alt="Empty_cart" className="empty-cart-img" />
                                <p className="font-Inter">Your Cart is Empty</p>
                            </div>
                      
                         </div>
                       } 
                       {
                        cart.length > 0 &&
                          cart.map(product =>
                            <div className="product-cart-sub">
                                    <div className="product-cart-img">
                                        <img src={product.productId.images[0].url} alt="img" />
                                    </div>
                                    <div className="product-cart-detail">
                                            <h6 className="font-Inter">  { product.productId.name.length > 19 ? product.productId.name.slice(0, 19) + '...' : product.productId.name}</h6>
                                            <h6 className="font-Inter mt-1">{moneyFormat(product.productId.price)}</h6>
                                    </div>
                              </div>
                        )}

                    <hr style={{background:'#DEE2E6',marginTop:'5%'}}/>
                    <div className="product-cart-button">
                    <a href='/cart' type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        View cart
                    </a>
                    <a  href='/checkout' type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Checkout
                    </a>
                 </div>
            </div>
      )
}

export default ProductCartConponent