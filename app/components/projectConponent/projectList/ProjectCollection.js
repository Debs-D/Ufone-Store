import React, { useEffect ,useState} from 'react'
import axios from 'axios'
// import {
//    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider,Tooltip, Grid, TextField, Typography, InputLabel, MenuItem, FormControl, Select, CircularProgress
// } from '@mui/material';
// import { Link, useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../../../Context/Context'
import { getCart, getWishList, handleLogOut, handleClickOpen, Transition } from '../../../Constants/Constant'

// import CategoryCard from '../../Components/Category_Card/CategoryCard';

// import Slider from "react-slick";
// import {BiDownArrow ,BiSolidDownArrow} from 'react-icons/bi'
// import ProductCard from './ProductCollectionCard'
// import './homepage.css'
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
const  CollectionCard = (props) => {
    const { setCart } = useContext(ContextFunction)
    const [productData, setProductData] = useState([])
    const [loading,setLoading] = useState(false);
    // const [section,setSection] = useState(null);
    const [sections , seSsections] = useState(null)
    const [openAlert, setOpenAlert] = useState(false);
    let authToken = localStorage.getItem('Authorization')
    useEffect(() => {
      setLoading(true)
  
 
        window.scroll(0, 0)
    }, [])



  const handleClose = () => {
    setOpenAlert(false);
    // setOpenEdit(false)
};

const CountTotal = (data)=> {
   
    var totaltAll = data.reduce(function(res,item) {
      // console.log('-------CountTotal----------------->',item)
      return res + (item.price * item.quantity);
    }, 0);
    // setTotalProduct(totaltAll)
    return totaltAll
    // console.log(taltAllto);

}
 


const  moneyFormat =(price, sign = 'N') =>{
  const pieces = parseFloat(price).toFixed(2).split('')
  let ii = pieces.length - 3
  while ((ii-=3) > 0) {
    pieces.splice(ii, 0, ',')
  }
  return sign + pieces.join('')
}
 
   
   const clickModal =()=>{
    setOpenAlert(true)
   }


   const SendDataSelect = (data) =>{
    props. pickSelection(data)
    // props.SendDataToCallection(data)
   }
   
   const SendDataToCallection = (data) =>{

   }

    return (
        
           <div>
           {
                    props.section === null ?
                    <div className='collectionslist-full'>
                        <div className='collectionslist-body' >
                            <div className='collectionslist-detail'>
                                <a href={`/project`}>
                                    <h5>Clcik </h5>
                                    <h6>To Create Collection </h6>
                                </a>
                            </div>
                            <div className='collectionslist-product' style={{paddingTop:'1%'}}>
                            <a to={`/project`}>
                                No Collection
                            </a>
                            </div>
                            <div className='collectionslist-price'>
                                {
                                props.section === null ?  
                                    null
                                :
                                <p><a onClick={()=>clickModal()}>open</a></p>  
                                }
                                
                                                    
                                </div>
                            </div>
                    </div>
                    :
                    <div className='collectionslist-full'>
                            <div className='collectionslist-body' >
                                <div className='collectionslist-detail-body'>
                                    <a href={`/my-project/${props.section._id}`}>
                                    <div className='collectionslist-card'>
                                        <div className='collectionslist-detail'>
                                            <h5>{props. section.name}</h5>
                                            <h6>{props.products.length} products</h6>
                                        </div>
                                        <div className='collectionslist-product'>
                                            {props.products.map((item,index) => (
                                                <div className='collectionslist-sub'>
                                                <img src={item.images[0].url} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className='collectionslist-price'>
                                    <p><a onClick={()=>clickModal()}>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
                                  </svg>
                                  </a></p>  
                                    {

                                    }
                                    <h4><a onClick={()=>clickModal()}> {moneyFormat(CountTotal(props.products))}</a></h4> 
                                                        
                                </div>
                            </div>
                        </div>
                   }


                   {
                    openAlert ?
                      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" >
                          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              
                              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div style={{ float: 'right'}}>
                                    <button onClick={()=>handleClose()} type="button" class="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                                        </svg>
                                  </button>
                                </div>
                                  <div class="sm:flex sm:items-start">
                                    <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-black sm:mx-0 sm:size-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" aria-hidden="true" data-slot="icon" class="on bbb"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path></svg>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                     
                                      <h3 class="text-base font-semibold text-gray-900" id="modal-title">Project Or Collection</h3>
                                      <div class="mt-2">
                                      <p class="text-sm text-gray-500">Pick project or collection to add products</p>

                                    </div>
                                    </div>
                                  </div>
                                </div>
                             
                                      <div className="mb-2 pl-2 pr-2">
                                            {
                                                props.sections.map(prod => (
                                                <a onClick={()=>SendDataSelect(prod)}>
                                                <div className='collectionslist-modal' >
                                                    <div className='collectionslist-detail-modal'>
                                                            <h5>{prod.name}</h5>
                                                            <h6> <small>{prod.products.length} Products</small> </h6>
                                                        </div>
                                                        <div className='collectionslist-product-modal'>
                                                                {prod.products.map(item => (
                                                                    <div className='collectionslist-sub-modal'>
                                                                    <img src={item.images[0].url} />
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                    </a>
                                                ))}
                                      
                                      </div>
                                
                              </div>
                            </div>
                          </div>
                      </div>
                      :null
                   }
           </div>
    )
}

export default CollectionCard