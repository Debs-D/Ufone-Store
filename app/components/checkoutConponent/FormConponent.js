"use client";
import React, { useContext, useEffect, useState,useRef } from 'react'
import axios from 'axios'
import { usePaystackPayment } from "react-paystack";
import { ContextFunction } from '../../Context/Context'
// import { Link, useNavigate } from 'react-router-dom'
// import { profile } from '../../Assets/Images/Image'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'
// import CopyRight from '../CopyRight/CopyRight'
import { Transition, handleClose } from '../../Constants/Constant'
// import { AiFillCloseCircle, AiOutlineSave } from 'react-icons/ai'
// import {IoIosSchool} from 'react-icons/io'

const CheckoutForm = () => {
    const { cart } = useContext(ContextFunction)
    const [userData, setUserData] = useState([])
    const [email,setEmail]= useState([])
    // const [shiping ,setShiping] = useState()
    const [openAlert, setOpenAlert] = useState(false);
    const [user, setUser]= useState(null);
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    const { push } = useRouter();
    // let navigate = useNavigate()
    let totalAmount = sessionStorage.getItem('totalAmount')
    let where = sessionStorage.getItem('where')
    let shiping = sessionStorage.getItem('shiping')
    const [school,setSchool]= useState(null);
    const [antoine,setAntoine] =useState(false)
    const [schoolSelected,setSchoolSelected]= useState(null);
    const [value, setValue] = useState(1);

    const referenceNumber = () => {
        return "bld" + Math.floor(Math.random() * 1000000000 + 1);
      };
    
    
     
    useEffect(() => {
        if (setProceed) {
            getUserData()

        }
        else {
            push('/')
        }

    }, [])

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        userEmail: '',
        address: '',
        zipCode: '',
        city: '',
        userState: '',

    })
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_USER_DETAILS}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            // console.log('-------------------user',data)
            setUserData(data);
            setUser(data)
            setEmail(data.email)
            if (!data.address || !data.city || !data.zipCode || !data.userState) {
                setOpenAlert(true);
                console.log(1);
              }
             
            userDetails.firstName = data.firstName
            userDetails.lastName = data.lastName
            userDetails.userEmail = data.email
            userDetails.phoneNumber = data.phoneNumber
            userDetails.address = data.address
            userDetails.zipCode = data.zipCode
            userDetails.city = data.city
            userDetails.userState = data.userState
        } catch (error) {
            console.log(error);
        }

    }

    const config = {
        reference: referenceNumber(),
        email:email,
        amount: totalAmount+0+0,
        publicKey:process.env.REACT_APP_PAYSTACTPAYEMT_LIVE_FRONT
      };
    
    
      const initializePayment = usePaystackPayment(config);
      const Ref = useRef(null);


    const checkOutHandler = async (e) => {
        e.preventDefault()
        
        if (!userDetails.firstName || !userDetails.lastName || !userDetails.userEmail || !userDetails.phoneNumber || !userDetails.address || !userDetails.zipCode || !userDetails.city || !userDetails.userState) {
            toast.error("Please fill all fields", { autoClose: 500, theme: "colored" })
        }
        else {
            // console.log('amount data------------->', process.env.REACT_APP_PAYSTACTPAYEMT_TEXTING_FRONT )
            initializePayment(onSuccess, onClose)
     
        }
    }


    const schoolData = [
        {  id:1, label: "Sleek angels international schools", address: "30 Rumuevuorlu Rd., Off Miniorlu by Ada George Rd., PortHarcourt, Rivers State" ,zip:500001,state:'Port Harcourt', city:'Rivers State'},
  
 ];
    const handleOnchange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }


    const onSuccess = (reference) => {
       
        // console.log('--------------------->plan',reference,shiping,where)
        const CreateData = {
          reference: reference.reference,
          user:user._id,
          productDetails: JSON.stringify(cart),
           userId: userData._id,
           userDetails: JSON.stringify(userDetails),
            student:true,
            shiping,
            school:school === null ? null : school.label,
            where,
           amount: totalAmount,
           currency: "NGN",
            name: userData.firstName + ' ' + userData.lastName,
            description: "Payment",
                image: profile,
            prefill: {
                name: userData.firstName + ' ' + userData.lastName,
                email: userData.email,
                contact: userData.phoneNumber
            },
        }
        // console.log('--------------------->plan',CreateData)
        if(reference.status === 'success'){
       const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(CreateData),
             };
                fetch(`${process.env.REACT_APP_PAYEMENTVERIFICATION}`, requestOptions)
                       .then(res => res.json())
                       .then((res)=>{
                        if(res.data.status === true){
                            // console.log('---------------------->',res.data.status )
                            timePush()
                         }
                        
               }).catch( (error) => {
                        
          })
        }
      };



 const handlePickSchool = (data)=>{
    //  console.log('pick school-------------->',data)
      setSchoolSelected(data)
      let result = schoolData.find(o => o.id === parseFloat(data));
       setSchool(result)
       userDetails.address = result.address;
       userDetails.zipCode = result.zip;
       userDetails.city = result.city;
       userDetails.userState = result.state;
      //  console.log('pick school-------------->',result,'userDetails-------------------->',userDetails)
   }


      const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
      };
    


const timePush =(data)=>{
    setTimeout(function(){
  
        push('/')
   }, 1500);
  }


    return (
        <div className='check-form'>
          <div className="grid grid-cols-2">
                <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">First Name</label>
                    <input type="text" id="success"  name='firstName' value={userDetails.firstName || ''} onChange={handleOnchange} variant="outlined"  
                     className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="First Name"/>

                    {
                        /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                    }
                </div>
                    <div className="mb-2 ml-2">
                    <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Last Name</label>
                    <input type="text" id="success" label="Last Name" name='lastName' value={userDetails.lastName || ''} onChange={handleOnchange}
                    className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="Last Name"/>
                    {
                        /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                    }
                    </div>
        </div>

            <div className="mb-2 ml-1">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Contact Number</label>
            <input type="text" id="success" label="Contact Number" type='tel' name='phoneNumber' value={userDetails.phoneNumber || ''} onChange={handleOnchange}
            className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="Contact Number"/>
            {
                        /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
            }
            </div>
            <div className="mb-2 ml-1">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Email Address</label>
            <input type="text" id="success" label="Email" name='userEmail' value={userDetails.userEmail || ''} onChange={handleOnchange} 
            className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="Email Address"/>
            {
                        /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
            }
            </div>
            <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Student</label>
            <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-2 ml-1">
     
                <input id="bordered-checkbox-1" type="checkbox"  checked={antoine} onChange={()=>setAntoine(!antoine)} name="antoine"  value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-black-300">Are you a Student</label>
            </div>

            {
                antoine ?
                   <div>
                        {schoolData.map((item) => {
                            return (
                                    <a onClick={()=>handlePickSchool(item.id)}  style={{width:'100%'}}>
                                    
                                        <div className={item.id === parseFloat(schoolSelected) ?'publiceCollection-school':'publiceCollection-school-null'} >
                                           
                                            
                                        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-2 ml-1">
                                    
                                                <input id="bordered-checkbox-1" type="checkbox" 
                                                    key={item.label}
                                                    // style={{float:'right'}}
                                                    // onChange={handleChange}
                                                    name="checkbox"  
                                                      checked={item.id === parseFloat(schoolSelected)}
                                                      value={item.id}
                                                    //  name="bordered-checkbox" 
                                                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-black-300">{item.label}</label>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}
                   </div>
                :
                  <div>
                        <div className="mb-2 ml-1">
                        <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Address</label>
                        <input type="text" id="success" label="Address" name='address' value={userDetails.address || ''} onChange={handleOnchange} variant="outlined"
                        className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="Address"/>
                        {
                                    /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                        }
                        </div>
            
                        <div className="mb-2 ml-1">
                        <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">City</label>
                        <input type="text" id="success" label="City" name='city' value={userDetails.city || ''} onChange={handleOnchange}  variant="outlined"
                        className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="City"/>
                        {
                                    /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                        }
                        </div>
            
                        <div className="mb-2 ml-1">
                        <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Postal/Zip Code</label>
                        <input type="text" id="success"    type='text' label="Postal/Zip Code" name='zipCode' value={userDetails.zipCode || ''} onChange={handleOnchange}  variant="outlined"
                        className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="Postal/Zip Code"/>
                        {
                                    /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                        }
                        </div>
            
                        <div className="mb-2 ml-1">
                        <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Province/State</label>
                        <input type="text" id="success" type='text'   label="Province/State" name='userState' value={userDetails.userState || ''} onChange={handleOnchange}  variant="outlined"
                        className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" placeholder="Province/State"/>
                        {
                                    /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                        }
                        </div>
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            
               </div>
            }
            
           
        </div>
    )
}

export default CheckoutForm