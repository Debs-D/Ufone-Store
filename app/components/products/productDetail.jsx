"use client";
// import React from "react";
// import { useState, useEffect } from "react";
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import MarkdownPreview from '@uiw/react-markdown-preview';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { ContextFunction } from '../../Context/Context';
import { Rating } from 'react-simple-star-rating'
import ProductCartConponent from './productCart'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import Share from '../shareComponent/shareComponent.js'

const ProductDetail = (props) => {

    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
// export default function ProductCard(props) {
    // const [count, setCount] = useState(null);
     // const { posts, count } = await getData(page, cat);
     const [images, setImages]= useState([])
     const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
     const [openAlert, setOpenAlert] = useState(false);
    //  const { id, cat } = useParams()
     const [product, setProduct] = useState([])
    //  const [images, setImages]= useState([])
     const [similarProduct, setSimilarProduct] = useState([])
     const [productQuantity, setProductQuantity] = useState(1)
     const [loading, setLoading] = useState(true);
     const [loginOpen,setLoginOpen]= useState(false);
     const [shareMoald,setShareMoald] = useState(false);
     const [buyData,setBuyData] = useState(false);
     const [processData,setProcessData] = useState(null)
    //  let navigate = useNavigate()
 
     let authToken = localStorage.getItem('Authorization')
     let setProceed = authToken ? true : false


     


     const  moneyFormat =(price, sign = 'N') =>{
      const pieces = parseFloat(price).toFixed(2).split('')
      let ii = pieces.length - 3
      while ((ii-=3) > 0) {
        pieces.splice(ii, 0, ',')
      }
      return sign + pieces.join('')

      
    }

    const increaseQuantity = () => {
        setProductQuantity((prev) => prev + 1)
        if (productQuantity >= 5) {
            setProductQuantity(5)
        }
    }
    const decreaseQuantity = () => {
        setProductQuantity((prev) => prev - 1)
        if (productQuantity <= 1) {
            setProductQuantity(1)
        }
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


    const addToCart = async (product) => {
        console.log('------------im-------->',product,productQuantity)
        if (setProceed) {
            try {
                const { data } = await axios.post(`${URL_LOCAL_END}/cart/addcart`, { _id: product._id, quantity: productQuantity }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                console.log('------setProceed------im-------->',setProceed,data)
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

    const addToWhishList = async (product) => {
        if (setProceed) {
            try {
                const { data } = await axios.post(`${URL_LOCAL_END}/wishlist/addwishlist`, { _id: product._id }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                setWishlistData(data)
                setWishlistData([...wishlistData, product])
                toast.success("Added To Wishlist", { autoClose: 500, theme: 'colored' })
            }
            catch (error) {
                toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
            }
        }
        else {
            setOpenAlert(true);
        }

    };

    const ProcessToCheckOut = async () =>{
        if (setProceed) {
            try {
                const { data } = await axios.post(`${URL_LOCAL_END}/cart/addcart`, { _id: product._id, quantity: productQuantity }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                setCart(data)
              
                setCart([...cart, product])
                push('/cart')
                toast.success("Added To Cart", { autoClose: 500, theme: 'colored' })
            } catch (error) {
                toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
            }
        }
        else {
            setOpenAlert(true);
        }
      }
  
    return (
      props.product === undefined || props.product === null ?
        null
       :
          <div>
            <div className="product-section">
            {
                console.log('product----deatail------------------3-->',props.images[0].original)
            }
            {
                props.images  === null || props.images === undefined ?
                      <div className="product-image">
                           
                      </div>
                      :
                      <div className="product-image">
                           <ImageGallery items={props.images} />
                      </div>
            }
                    

                    <div className="product-detail">
                        <div className="product-detail-sub">
                            <div className="product-detail-title">
                            <h3 className="font-Inter">{props.product.name}</h3>
                                <h4 className="font-Inter"> {moneyFormat(props.product.price > 1000 ? props.product.price + 1000 :props.product.price + 300)}</h4>
                                <div>
                                {
                                    props.product.category === null || props.product.category === undefined ?
                                    <h4>Catalog  : <small> No Catalog</small></h4>
                                    :
                                    <h4>Catalog: <small> { props.product.catalog.name}</small></h4>
                                  }
                                  
                                  {
                                    props.product.category === null || props.product.category === undefined ?
                                    <h4>Category: <small> No Category</small></h4>
                                    :
                                    <h4>Category: <small> { props.product.category.name}</small></h4>
                                  }
                                  
                            
                                </div>
                             
                                <div className="flex items-center product-add">
                                    <button className="border  rounded-md py-2 px-4 mr-2 font-Inter dark:text-black"  onClick={increaseQuantity}>+</button>
                                    <span className="text-center w-8 font-Inter dark:text-black">{productQuantity}</span>
                                    <button className="border rounded-md py-2 px-4 ml-2 font-Inter dark:text-black" onClick={decreaseQuantity}>-</button>
                                </div>
                                <div className='product-rating' style={{display:'flex',width:'100%'}}>
                                <Rating readonly={true} size={22} initialValue={Math.round(props.product.rating)} />
                                </div>
                             
                                <hr style={{background:'#DEE2E6',marginTop:'4%'}}/>
                                <div className="product-add-cart">
                                
                                <div className="flex items-center " style={{paddingTop:'1px'}}>
                                        <button type="button" className="py-2 px-4 ml-10 font-semibold tracking-wide bg-transparent text-gray-800 border border-green-300 rounded-md" onClick={(() => addToCart(props.product))} >Add To Cart </button>
                                        <div className=" ml-8 mt-10 rounded-full bg-black p-2 text-[#E74040]" onClick={(() => addToWhishList(props.product))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </div>
                                        <button type="button" className="text-white ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="h-5 w-5 text-white-500 mr-2"  width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="6" cy="12" r="3" />  <circle cx="18" cy="6" r="3" />  <circle cx="18" cy="18" r="3" />  <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />  <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" /></svg>
                                            Share 
                                        </button>
                                    </div>
                                </div>
                                <hr style={{background:'#DEE2E6',marginTop:'6%'}}/>
                                     
                                        <Share title={props.product.name} postDesc={props.product.title} id={props.product._id} keywords={props.product.name} description={props.product.name} image={props.images[0].original} />
                                
                                        
                                </div>
                                <div className="product-detail-brand">
                                    
                                            <img src="https://res.cloudinary.com/codepally/image/upload/v1734732021/Main_Section_Link_ban1.png_jtcgul.png" alt="img" />   
                                    
                                        <ProductCartConponent />
                                  
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-tab-body">
                         
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li className="me-2">
                                    <a href="#" className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active" aria-current="page">description</a>
                                </li>
                                <li className="me-2">
                                    <a href="#"  className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">reviews (5)</a>
                                </li>
                                <li className="me-2">
                                    <a href="#" className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">additional information</a>
                                </li>
                            </ul>
                        
                        {
                            props.product === undefined || props.product === null ?
                            null
                           :
                        <div className="product-tap">
                                <p className="font-Inter">
                                {
                                    <MarkdownPreview source={props.product.description} />
                                    // console.log('log-------------->',props.product.description)
                                }
                                  
                                </p>
                        </div>
                            }
                    </div>
              </div>

         
      );


}

export default ProductDetail;
