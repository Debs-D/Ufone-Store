"use client";
import Image from "next/image";
import axios from "axios";
import MarkdownPreview from "@uiw/react-markdown-preview";
import React, { useEffect, useState, useContext } from "react";
// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
import { ContextFunction } from "../../Context/Context";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
// import { useRouter } from 'next/navigation';
import Share from "../shareComponent/shareComponent.js";
import CategorySide from "../categoies/categories";
import ProductSearchCard from "./searchProductCard";
import { useSearchParams } from "next/navigation";
import { useParams } from "react-router";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "@/node_modules/next/dist/shared/lib/constants";

const SearchPage = (props) => {
  const URL_END = "https://ufuon-store.vercel.app/api";
  const URL_LOCAL_END = "https://ufuon-store.vercel.app/api";
  let params = useParams();
  params.name;
  const searchParams = useSearchParams();
  const search = searchParams.get("name");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [catelog, setCatelog] = useState([]);
  const [show, setShow] = useState({ page: 1, title: "show home" });
  const [loading, setloading] = useState(false);
  console.log("params.postId ------------>", search);

  useEffect(() => {
    getCategories();
    if (search === undefined || search === null) {
    } else {
      console.log("---useEffect--------->", search);
      getsSearchParams(search);
    }
  }, []);

  const getCategories = async () => {
    console.log("---------------getCategories--->");
    setloading(TURBO_TRACE_DEFAULT_MEMORY_LIMIT);
    // if (setProceed) {
    try {
      const { data } = await axios.get(
        `https://ufuon-store.vercel.app/api/categories`,
        {
          // headers: {
          //     'Authorization': authToken
          // }
        }
      );
      console.log("------getCategories------im-------->", data);
      // setCart(data)
      setCategories(data.data);
      setloading(false);
      // setCart([...cart, product])
      // toast.success("Added To Cart", { autoClose: 500, theme: 'colored' })
    } catch (error) {
      toast.error(error.response.data.msg, {
        autoClose: 500,
        theme: "colored",
      });
      setloading(false);
    }
    // }
    // else {
    //     setOpenAlert(true);
    // }
  };

  const getsSearchParams = async (search) => {
    console.log("--------getsSearchParams----im-------->", search);
    // if (setProceed) {
    setloading(true);
    try {
      const { data } = await axios.get(
        `${URL_LOCAL_END}/product/index?search=${search}`,
        {
          // headers: {
          //     'Authorization': authToken
          // }
        }
      );

      console.log("------setProceed------im-------->", data);
      setProducts(data.data);
      setloading(false);
    } catch (error) {
      // toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
      setloading(false);
    }
  };

  const ShowCatalog = async (data) => {
    console.log("--------------->", data);
    setCatelog(data.catalog);
    setCategory(data);
    setShow({ page: 2, title: "show catelog" });
  };

  const getCatalogProduct = async (searchData) => {
    // if (setProceed) {
    setloading(true);
    try {
      console.log(
        "------getCatalogProduct------1-------->",
        search,
        searchData
      );
      const { data } = await axios.get(
        `${URL_LOCAL_END}/product/index?catalog=${searchData}`,
        {
          //  const { data } = await axios.get(`${URL_LOCAL_END}/product/index?catalog=673b3342b3517bc51966cbe8`, {
          // headers: {
          //     'Authorization': authToken
          // }
        }
      );
      console.log("------getCatalogProduct------2-------->", data);
      setProducts(data.data);
      setloading(false);
    } catch (error) {
      // toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
    }
  };

  return (
    <div>
      <div className="product-center">
        <div className="product-banner">
          <div className=" product-nav">
            <h4 className="font-Inter">Home / Shop / Products</h4>
          </div>

          <div className="product-search-body">
            {show.page === 1 ? (
              <div className="product-category">
                <h4 className="font-Inter">categories</h4>
                <div className="product-title">
                  <h5 className="font-Inter"> All Categories </h5>
                </div>
                <ul>
                  {categories.map((item, index) => (
                    <a href="#" key={index} onClick={() => ShowCatalog(item)}>
                      <li>{item.name}</li>
                    </a>
                  ))}
                </ul>
              </div>
            ) : show.page === 2 ? (
              <div className="product-category">
                <h4 className="font-Inter">Categories {"->"} catelog</h4>
                <div className="product-title">
                  <button
                    type="button"
                    onClick={() => setShow({ page: 1, title: "home" })}
                    class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <svg
                      class="w-4 h-4 text-gray-800 dark:text-white mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Back
                  </button>
                  <h5
                    className="font-Inter"
                    style={{ position: "relative", top: "4px" }}
                  >
                    {" "}
                    {category.name}{" "}
                  </h5>
                </div>
                <ul>
                  {catelog.map((item, index) => (
                    <a
                      href="#"
                      key={index}
                      onClick={() => getCatalogProduct(item._id)}
                    >
                      <li>{item.name}</li>
                    </a>
                  ))}
                </ul>
              </div>
            ) : null}
            {loading ? (
              <div className="product-div">
                <div className="product-loader">
                  <button
                    disabled
                    type="button"
                    class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-white-700 focus:text-white-700 dark:bg-white-800 dark:text-white-400 dark:border-white-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                </div>
              </div>
            ) : (
              <div className="product-div">
                <h3 className="font-Inter">Best seller in this category</h3>

                <div className="products-sub">
                  {products.map((item, index) => (
                    <ProductSearchCard key={index} product={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
