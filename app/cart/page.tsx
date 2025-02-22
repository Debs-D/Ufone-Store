// "use client";
import Image from "next/image";
// import React, { useEffect,useContext } from 'react'
// import { useState } from 'react'
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify'
import CartConponent from '../components/cartConponent/Cartout'
import axios from 'axios'

import './cart.css'

export default function Cart() {
    
  return (
          <div className="">
                 <CartConponent />
          </div>
  );
}
