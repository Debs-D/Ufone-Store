"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./product.css";
// import ReactStars from "react-rating-stars-component";

const ProductCard = (props) => {
  // export default function ProductCard(props) {
  // const [count, setCount] = useState(null);
  // const { posts, count } = await getData(page, cat);

  const moneyFormat = (price, sign = "N") => {
    const pieces = parseFloat(price).toFixed(2).split("");
    let ii = pieces.length - 3;
    while ((ii -= 3) > 0) {
      pieces.splice(ii, 0, ",");
    }
    return sign + pieces.join("");
  };

  function ToSeoUrl(url) {
    // make the url lowercase
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and
    encodedUrl = encodedUrl.split(/\&+/).join("-and-");

    // remove invalid characters
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters
    encodedUrl = encodedUrl.trim("-");

    return encodedUrl;
  }

  return (
    <div className="relative m-1 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md products">
      <a
        href={`/product/${ToSeoUrl(props.product.name)}/${props.product._id}`}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
      >
        <img
          className="object-cover"
          alt={props.name}
          src={props.product.images[0].url}
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-[#fe0804] px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </a>
      <div className="mt-4 px-5 pb-2">
        <a
          href={`/product/${ToSeoUrl(props.product.name)}/${props.product._id}`}
        >
          <h5 className="text-x tracking-tight text-slate-900">
            {" "}
            {props.product.name.length > 35
              ? props.product.name.slice(0, 35) + "..."
              : props.product.name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-l font-bold text-slate-900">
              {moneyFormat(props.product.price)}
            </span>
            {
              // <span className="text-sm text-slate-900 line-through">$699</span>
            }
          </p>
          <div className="flex items-center">
            {
              //   <ReactStars
              // count={5}
              // onChange={ratingChanged}
              // size={24}
              // activeColor="#ffd700"
              //   />
            }
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="mr-2 ml-3 rounded bg-[#fe0804] px-2.5 py-0.5 text-xs font-semibold hover:bg-[#d00703]">
              {" "}
              fdk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
