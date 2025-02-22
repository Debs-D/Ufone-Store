"use client";
import Image from "next/image";
// import './login.css'
// import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography,CircularProgress } from '@mui/material'
// import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
// import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { MdLockOutline } from 'react-icons/md'
// import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

import "./registar.css"

export default function Register() {
  const URL_END = "https://ufuon-store.vercel.app/";
  const URL_LOCAL_END = "http://localhost:43000/api/auth/login";

  const [credentials, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoadingin] = useState(false);
  const { push } = useRouter();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // const navigate = useNavigate()


  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    let auth = localStorage.getItem('Authorization');
    if (auth) {
      // navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingin(true)
    let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(credentials.email,credentials.firstName,credentials.password,credentials.phoneNumber,credentials.lastName);
    // try {
      if (!credentials.email && !credentials.firstName && !credentials.password && !credentials.phoneNumber && !credentials.lastName) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
        setLoadingin(false)
        // console.log('data 1')
      }
      else if (credentials.firstName.length < 1 || credentials.lastName.length < 1) {
        // console.log('data 2')
        toast.error("Please enter valid name", { autoClose: 500, theme: 'colored' })
        setLoadingin(false)
      }
      else if (emailRegex.test(credentials.email)===false) {
        toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
        // console.log('data 3')
        setLoadingin(false)
      }
      else if (phoneRegex.test(credentials.phoneNumber)===false) {
        // console.log('data 4')
        toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
        setLoadingin(false)
        // console.log(1);
      }
      else if (credentials.password.length < 5) {
        // console.log('data 5')
        toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
        setLoadingin(false)
      }
      else if (credentials.password.length < 5) {
        // console.log('data 5')
        toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
        setLoadingin(false)
      }
      else if (credentials.email && credentials.firstName && credentials.lastName && credentials.phoneNumber && credentials.password) {
        const data  = {
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                firstname:credentials.firstName,
                lastname:credentials.lastName,
                email: credentials.email,
                phoneNumber: credentials.phoneNumber,
                password: credentials.password,
            }
            // console.log('data 7------------->',data)
            const requestOptions = {
              method: 'POST',
                headers: { 'Content-Type':'application/json','Access-Control-Allow-Origin': '*' ,
              },
                body: JSON.stringify(data)
              };
              fetch(`${process.env.REACT_APP_REGISTER}`, requestOptions)
              .then(res => res.json())
              .then(res => {
                // console.log('data 8------------->',res)
                if(res.status === true){
                  // console.log('data 9------------->',res.authToken)
                  toast.success("Registered Successfully", { autoClose: 500, theme: 'colored' })
                   localStorage.setItem('Authorization', res.authToken)
                   setLoadingin(false)
                   push('/');
                   }else{
                  toast.error(res.error, { autoClose: 500, theme: 'colored' })
                }
                
              }) .catch((error) => {
                console.error('Error:', error);
                // toast.error(error, { autoClose: 500, theme: 'colored' })
          })
    
    }

  }


  return (
             <div>
              <div className="grid">
                    <div className="product-nav">
                        <h4 className="font-Inter">Home / pages / login</h4>
                    </div>
                    </div>
                    <div className="cart-section">
                        <div className="sigin-body">
                            <div className="sigin-img">
                            <img src="https://res.cloudinary.com/codepally/image/upload/v1735234522/login.svg_fill_1_ojuo1g.png" alt="img" /> 
                            </div>
                            <div className="sigin-detail-body">
                            <form  onSubmit={handleSubmit}  >
                               <div className="sigin-detail">
                                    <h3 className="font-Inter">Welcome Back</h3>

                                    <h4>Join to us</h4>
                                    <div className="mb-2">
                                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">First Name</label>
                                            <input type="text" id="success" className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500"
                                               name="firstName"
                                               value={credentials.firstName}
                                               onChange={handleOnChange}
                                                placeholder="First Name"
                                                />
                                            {
                                              //  <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                            }

                                    </div>

                                    <div className="mb-2">
                                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Last Name</label>
                                            <input type="text" id="success" className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" 
                                         
                                             placeholder="Last Name"
                                             name="lastName"
                                             value={credentials.lastName}
                                             onChange={handleOnChange}
                                             />
                                            {
                                              //  <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                            }
                                    </div>

                                    <div className="mb-2">
                                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Email</label>
                                            <input type="email" id="success" className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" 
                                             name="email"
                                             value={credentials.email}
                                             onChange={handleOnChange}
                                             autoComplete="email"
                                            placeholder="Email Address"/>
                                            {
                                              //  <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                            }
                                    </div>

                                    <div className="mb-2">
                                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Contact Number</label>
                                            <input type="number" id="success" className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" 
                                            // label="Contact Number"
                                            name="phoneNumber"
                                            value={credentials.phoneNumber}
                                            onChange={handleOnChange}
                                            // inputMode='numeric'
                                            placeholder="Contact Number"/>
                                            {
                                              //  <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                            }
                                    </div>


                                    <div className="mb-2">
                                            <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Password</label>
                                            <input type="password" id="success" className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" 
                                              name="password"
                                              value={credentials.password}
                                              onChange={handleOnChange}
                                              // autoComplete="new-password"
                                              placeholder="Password"/>
                                            {
                                              //  <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                            }
                                    </div>

                                    <h5 className="font-Inter">Forget Password ?</h5>

                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>


                                    {
                                        // <div>
                                        // <label for="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
                                        // <input type="text" id="error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
                                        // <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                                        // </div>
                                    }
                                
                                    
                                  </div>
                               </form>
                          </div> 
                   </div>
             </div>
         </div>
      );
}
