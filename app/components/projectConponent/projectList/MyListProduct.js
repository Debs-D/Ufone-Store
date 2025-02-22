"use client";
import React from "react";
import { useState, useEffect } from "react";
// import './searchProductCard.css'
// import ReactStars from "react-rating-stars-component";

const ListProductCard = (props) => {
// export default function ProductCard(props) {
    // const [count, setCount] = useState(null);
     // const { posts, count } = await getData(page, cat);

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
  
    const CallAddData = (data) =>{
      props. sendData(data)
  }

    return (
      props.product === undefined || props.product === null ?
        null
       :
           <div className="relative m-1 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md products">
                <a  href={`/product/${ToSeoUrl(props.product.name)}/${props.product._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
  
                  <img className="object-cover"  alt={props.name} src={props.product.images[0].url}  alt="product image" />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 px-5 pb-2">
                  <a href="#">
                    <h5 className="text-x tracking-tight text-slate-900">  {props.product.name.length > 35 ? props.product.name.slice(0, 35) + '...' : props.product.name}</h5>
                  </a>
                  <div className="ml-3 rounded bg-red-700 px-1 py-0.5 pt-4 text-xs font-semibold float-right relative left-5 bottom-7">  </div>
                  <button type="button" onClick={()=>CallAddData(props.product)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right relative left-11">
                      <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"/>
                    </svg>
                 </button>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                 
                    <p>
                      <span className="text-l font-bold text-slate-900">{moneyFormat(props.product.price)}</span>
                    </p>
                   
                   
                      
             
                  </div>
               
                </div>
          </div>

         
      );


}

export default ListProductCard;
