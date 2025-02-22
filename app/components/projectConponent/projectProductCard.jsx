"use client";
import React from "react";
import { useState, useEffect } from "react";
// import './searchProductCard.css'
// import ReactStars from "react-rating-stars-component";

const ProductSearchCard = (props) => {
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
  
    return (
      props.product === undefined || props.product === null ?
        null
       :
           <div className="relative m-0.5 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md products">
                <a  href={`/product/${ToSeoUrl(props.product.name)}/${props.product._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" >
  
                  <img className="object-cover"  alt={props.name} src={props.product.images[0].url}  alt="product image" />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 px-5 pb-2">
                  <a href="#">
                    <h5 className="text-x tracking-tight text-slate-900">  {props.product.name.length > 35 ? props.product.name.slice(0, 35) + '...' : props.product.name}</h5>
                  </a>
                </div>
            </div>

         
      );


}

export default ProductSearchCard;
