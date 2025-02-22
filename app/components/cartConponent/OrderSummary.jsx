// import { Box, Button, Card, CardActions, CardContent, Grid, Typography,Container ,FormControlLabel,Checkbox } from '@mui/material'
"use client";
import React, { useContext, useEffect, useState,useRef } from 'react'
// import { BsFillCartCheckFill } from 'react-icons/bs'
// import { IoBagCheckOutline } from 'react-icons/io5'
// import { MdUpdate } from 'react-icons/md'


const  moneyFormat =(price, sign = 'N') =>{
    const pieces = parseFloat(price).toFixed(2).split('')
    let ii = pieces.length - 3
    while ((ii-=3) > 0) {
      pieces.splice(ii, 0, ',')
    }
    return sign + pieces.join('')
  }


const OrderSummary = ({ proceedToCheckout, total, shippingCoast,passData }) => {
    const [step ,setStep]= useState({page:1,title:'pick state'})
    const [value, setValue] = useState(1);
    const [shipData, setShepData] = useState(null);

    function handleChange(checkedValues) {
        console.log('checking',checkedValues)
      setValue(checkedValues);
      let result = StateData.find(o => o.id === parseFloat(checkedValues));
      setShepData(result.amount)
      passData(result)
    //   console.log(result)
    }


       const StateData = [
        {  id:1, label: "Abuja (Mabushi, Jabi, and wuye)", value: "Gardening" ,amount:3900},
        { id:2,  label: "Kaduna, Lokoja or Minna", value: "Plants" ,amount:3900},
        { id:3,  label: "Abuja (maitama, Wuse, CBD,  lifecamp)", value: "Seeds" ,amount:2500},
        { id:4,  label: "North Central", value: "Bulbs" ,amount:3500},
        { id:5, label: "Abuja (Gwarimpa, Galadimawa, Apo, Asokoro)", value: "Planters" ,amount:4000},
        { id:6, label: "Abuja (Other places)", value: "Planters" ,amount:4000},
        { id:7, label: "Port Harcourt", value: "Planters" ,amount:1500},
        { id:8,   label: "Door to door delivery (Nasarawa State)", value: "Planters" ,amount:5000},
        { id:9, label: "Abuja (everywhere else)", value: "Planters" ,amount:3500},
        { id:10,  label: "Delta Line", value: "Planters" ,amount:3000},
        { id:11, label: "South West (excluding Lagos)", value: "Planters" ,amount:3500},
        {id:12,  label: "Door to door delivery (Nationwide)", value: "Planters" ,amount:4500},
        {id:13,  label: "(South East/South South)", value: "Planters" ,amount:4500},
        
       ];

    const containedMove = ()=>{
        setStep({page:2,title:' Shipping method'})
    }

    const NextPage= ()=>{
        setStep({page:3,title:'   Order Summary         '})
    }

    const NextBackToOrder = ()=>{
        setStep({page:1,title:'   Order Summary '})
    }

    return (
        step.page ===1 ?
            <div className="cart-checkout">
                    <div className="cart-checkout-sub">
                        <h3 className="font-Inter">Order Summary</h3>

                        <div className="cart-checkout-total">
                            <h4 className="font-Inter">{moneyFormat(total - shippingCoast)}</h4>
                            <p className="font-Inter">Sub Total:</p>
                        </div>
                        {
                        // <div className="cart-checkout-total">
                        //     <h4 className="font-Inter"> {moneyFormat(shippingCoast)}</h4>
                        //     <p className="font-Inter">Shpping estimate:</p>
                        // </div>
                        }
                        

                        <div className="cart-checkout-total">
                            <h4 className="font-Inter">  {moneyFormat(total)}</h4>
                            <p className="font-Inter">Order total:</p>
                        </div>
                        <div className="cart-checkout-button">
                                <button type="button"  onClick={proceedToCheckout}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Checkout
                            </button>
                        </div>
                    </div>

            </div>
            :step.page ===2 ?
            <div className="cart-checkout">
               {
                   StateData.map((item) => {
                        return (
                            <a onClick={()=>handleChange(item.id)} className={item.id === parseFloat(value) ?'orderSummary-select':'orderSummary'}>
                               <div   className='orderSummary'>
                                <p >
                                        <Checkbox
                                        key={item.label}
                                        // onChange={handleChange}
                                        checked={item.id === parseFloat(value)}
                                        value={item.id}
                                    >
                                        {item.value}
                                        
                                    </Checkbox>
                                            {item.label}
                                        </p>
                                        <p >
                                            {moneyFormat(item.amount)}
                                        </p>
                               </div>
                            </a>
                        )
                 })
            }
            </div>
            :step.page === 3 ?
            <div>

                   <div className="cart-checkout-button">
                            <button type="button"  onClick={proceedToCheckout}
                             className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Checkout
                            </button>
                        </div>
            </div>
            :
            null


    )

}

export default OrderSummary