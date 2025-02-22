"use client";
// import Image from "next/image";
import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import { ContextFunction } from '../../Context/Context';
import { toast } from 'react-toastify'
import OrderSummary from './OrderSummary'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import { useRouter } from 'next/navigation';
// import './cart.css'

// export default function CartConponent() {
    const CartConponent = (props) => {
    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
    const { cart, setCart } = useContext(ContextFunction)
    const [total, setTotal] = useState(0)
    const [openAlert, setOpenAlert] = useState(false);
    const [previousOrder, setPreviousOrder] = useState([]);
    const [shippingCoast, setShippingCoas] = useState(null);
    const [shipData, setShepData] = useState(null);
    const { push } = useRouter();

    // const navigate = useNavigate()
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false


    useEffect(() => {
        if (setProceed) {
            getCart()
            getPreviousOrder()

        }
        else {
            setOpenAlert(true)
        }
        window.scroll(0, 0)

    }, [])

    useEffect(() => {
        if (setProceed) {
            setTotal(cart.reduce((acc, curr) => (acc + ((curr.productId?.price * curr.quantity) )), 0))
        }

    }, [cart])

    const getCart = async () => {
        if (setProceed) {
            const { data } = await axios.get(`${URL_LOCAL_END}/api/cart/fetchcart`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setCart(data);
        }

    }

     const addToCart = async (product) => {
        if (setProceed) {
            try {
                const { data } = await axios.post(`${URL_LOCAL_END}/api/cart/addcart`, { _id: product._id, quantity: productQuantity }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                setCart(data)
              
                setCart([...cart, product])
                toast.success("Added To Cart", { autoClose: 500, theme: 'colored' })
            } catch (error) {
                toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
            }
        }
        else {
            setOpenAlert(true);
        }
    }

    // }
    // const handleClose = () => {
    //     setOpenAlert(false);
    //     // navigate('/')
    // };
    // const handleToLogin = () => {
    //     // navigate('/login')
    // };
    const getPreviousOrder = async () => {
        const { data } = await axios.get(`${URL_LOCAL_END}/getPreviousOrders`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setPreviousOrder(data)
        // console.log('--------------setPreviousOrder---4---------data',data)
    }

    const removeFromCart = async (product) => {
        if (setProceed) {
            try {
                console.log('--------------removeFromCart---1---------data',product)
                const response = await axios.delete(`${URL_LOCAL_END}/cart/deletecart/${product._id}`, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                console.log('--------------removeFromCart---2---------data',response)
                toast.success("Removed From Cart", { autoClose: 500, theme: 'colored' })
                setCart(cart.filter(c => c.productId._id !== product._id))
            } catch (error) {
                toast.error("Something went wrong", { autoClose: 500, theme: 'colored' })

            }
        }
    }

    const proceedToCheckout = async () => {

        if (cart.length <= 0) {
            toast.error("Please add items in cart to proceed", { autoClose: 500, theme: 'colored' })
        }
        else {
            sessionStorage.setItem('totalAmount', total)
            sessionStorage.setItem('where', shipData)
            sessionStorage.setItem('shiping',  shippingCoast)
            push('/checkout')
        }
    }

    const passData = (data)=>{
        // console.log("passData---------->",data)
        // shippingCoast = parseFloat(data)
        setShippingCoas(parseFloat(data.amount))
        setShepData(data.label)
        setTotal(cart.reduce((acc, curr) => (acc + ((curr.productId?.price * curr.quantity) +  parseFloat(data.amount))), 0))
    
    }

    const  moneyFormat =(price, sign = 'N') =>{
        const pieces = parseFloat(price).toFixed(2).split('')
        let ii = pieces.length - 3
        while ((ii-=3) > 0) {
          pieces.splice(ii, 0, ',')
        }
        return sign + pieces.join('')
      }


    function ToSeoUrl(url) {
        
        // make the url lowercase         
        var encodedUrl = url.toString().toLowerCase(); 
      
        // replace & with and           
        encodedUrl = encodedUrl.split(/\&+/).join("-and-")
      
        // remove invalid characters 
        encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       
      
        // remove duplicates 
        encodedUrl = encodedUrl.split(/-+/).join("-");
      
        // trim leading & trailing characters 
        encodedUrl = encodedUrl.trim('-'); 
      
        return encodedUrl; 
      }
    
  return (
          <div className="">
               <div className="product-nav">
                  <h4 className="font-Inter">Home / pages / cart</h4>
                </div>
               
              <div className="cart-section">
                
              <div className='cart-right'>
                    { cart.length}
                    
                    {
                        setProceed &&
                        cart.length <= 0 &&
                        <div className="cart-empty-body">
                            <div className="main-card">
                                <img src={'https://res.cloudinary.com/dxguqzge7/image/upload/v1682838909/Cart_bk4xgl.jpg'} alt="Empty_cart" className="empty-cart-img" />
                                <p>Your Cart is Empty</p>
                            </div>
                    
                        </div>
                    }

                    {
                        cart.length > 0 &&
                          cart.map((item,index) => (
                                <div key={item._id} className="cart-product-body">
                                    <div className="cart-product-img">
                                       <a   href={`/product/${ToSeoUrl(item?.productId?.name)}/${item?.productId?._id}`}>
                                             <img src={item.productId.images[0].url} alt="img" />
                                        </a>
                                    </div>
                                     
                                    <div className="cart-product-detail">
                                      <a href={`/product/${ToSeoUrl(item?.productId?.name)}/${item?.productId?._id}`}>
                                            <div className="cart-shape">
                                                <div className="h-[26px] w-[26px] rounded-full bg-gray-200 mr-4" style={{background:'#E2E4EB'}}></div>
                                                <div className="h-[26px] w-[26px] rounded-full bg-gray-200" style={{background:'#FF0000',opacity:'0.2'}}></div>
                                            </div>
                                            <h3 className="font-Inter">{item.productId.name}</h3>
                                            <h4 className="font-Inter">{moneyFormat(item.productId.price)}</h4>
                                       </a>
                                            <div className="flex items-center product-add">
                                                  {item.quantity &&   <p style={{textAlign:'left'}}>Quantity {' ' + item.quantity} </p>}
                                                    <div className='product-rating' style={{display:'flex'}}>
                                                            <Rating readonly={true} size={22} initialValue={Math.round(item.productId.rating)} />
                                                </div>
                                           </div>
                                           <div className='product-remove'>
                                               <button type="button" onClick={() => removeFromCart(item.productId)}
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                    <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="https://cdn-icons-png.freepik.com/256/6861/6861362.png?semt=ais_hybrid" fill="currentColor" viewBox="0 0 18 21">
                                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                                    </svg>
                                                    Remove From Cart
                                                </button>
                                           </div>
                                       </div>
                                </div>
                           ))}
              </div>
              
          
             
               
                    <OrderSummary proceedToCheckout={proceedToCheckout} passData={passData} total={total} shippingCoast={shippingCoast} />
                 
                  
                  
                  
              </div>


          </div>
  );
}

export default CartConponent