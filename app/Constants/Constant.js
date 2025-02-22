// import { Slide } from "@mui/material";
// import { getAllByTestId } from "@testing-library/react";
"use client";
import axios from "axios";
// import { forwardRef } from "react";
const URL_END = "https://ufuon-store.vercel.app/api";
 const URL_LOCAL_END = "http://localhost:43000/api";

const getCart = async (setProceed, setCart, authToken) => {
    if (setProceed) {
        const { data } = await axios.get(`${URL_LOCAL_END}/cart/fetchcart`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setCart(data);
    }
}
const getWishList = async (setProceed, setWishlistData, authToken) => {
    if (setProceed) {
        const { data } = await axios.get(`${URL_LOCAL_END}/wishlist/fetchwishlist`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setWishlistData(data)
    }
}
const handleLogOut = (setProceed, toast, navigate, setOpenAlert) => {
    if (setProceed) {
        localStorage.removeItem('Authorization')
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        navigate('/')
        setOpenAlert(false)
    }
    else {
        toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
}

const handleClickOpen = (setOpenAlert) => {
    setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
    setOpenAlert(false);
};
const getAllProducts = async (setData) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_FETCH_PRODUCT);
        setData(data)


    } catch (error) {
        console.log(error);
    }
}

const getSingleProduct = async (setProduct, id, setLoading) => {

    const { data } = await axios.get(`${process.env.REACT_APP_FETCH_PRODUCT}/${id}`)
    setProduct(data)
    setLoading(false);
   
    //   images.push(newData)

    // getAll()

}

const getSingleIamge= async (setImages, id, setLoading) => {
    console.log('data----------------->')
    // const { res } = await axios.get(`${process.env.REACT_APP_FETCH_PRODUCT}/${id}`)
    // setImages(res)
    // setLoading(false);
//     for (let i = 0; i < data.images.length; i++) {
//         // console.log('data----------------->',data.images[i])
//              const newData ={
//                     original:  data.images[i].url,
//                     thumbnail:  data.images[i].url,
//              }
         
//     //   images.push(newData)
//  }
    // getAll()

}



// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });





export { getCart, getWishList, handleClickOpen, handleClose, handleLogOut, getAllProducts, getSingleProduct, getSingleIamge,
    //  Transition 
    }