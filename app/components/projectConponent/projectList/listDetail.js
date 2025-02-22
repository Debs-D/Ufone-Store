"use client";
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import {MdOutlineAdd,MdDeleteOutline } from 'react-icons/md'
// import { Link, useParams ,useNavigate} from 'react-router-dom'

import { useContext } from 'react'
import { ContextFunction } from '../../../Context/Context'
import { getCart, getWishList, handleLogOut, handleClickOpen, Transition } from '../../../Constants/Constant'
import CollectionCard from './ProjectCollection'
// import ProductCard from './ProductCollectionCard'
// import CollectionCard from '../../function/CollectionCard'
import { toast } from 'react-toastify';
import ListProductCard from './MyListProduct.js';
// import './collectionList.css'
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
const  ProjectListComponent = (props) => {
    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
    const { setCart } = useContext(ContextFunction)
    const [productData, setProductData] = useState([])
    const [productOld, setProductOld] = useState([])
    const [sectionsData, setSectionsData] = useState([])
    const [loading,setLoading] = useState(false);
    const [addProduct,setAddProduct]= useState([]);
    const [quantity,setQuantity]= useState([]);
    const [openModal,setOpenModal] = useState(false);
    const [section,setSection] = useState(null);
    const [loadingData,setLoadingData] = useState(false);
    const [holdData,setholdData]= useState(null);
    const [quantitys,setQuantitys]= useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productQuantity, setProductQuantity] = useState(1)
    const [openAlert, setOpenAlert] = useState(false);
    const [closeSearch,setCloseSearch]= useState(false);
  
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false
    // let navigate = useNavigate()
    useEffect(() => {
      setLoading(true)
      getAllProduct()
      getUserCollection()
        // getCart()
        window.scroll(0, 0)
    }, [])

    const getAllProduct = async () => {
      // console.log('process.env.REACT_APP_GET_CART',process.env.REACT_APP_GET_CART)
      if (setProceed) {
          const { data } = await axios.get(`${URL_LOCAL_END}/product/fetchproduct`,

              {
                  headers: {
                      'Authorization': authToken
                  }
              })
        console.log('-----------------4---------data',data)
        setLoading(false)
        setProductData(data);
        setProductOld(data)
      }else{
        const { data } = await axios.get(`${URL_LOCAL_END}/product/fetchproduct`,

              {
                  headers: {
                      'Authorization': authToken
                  }
              })
        // console.log('---------------5-------data',data)
        setLoading(false)
        setProductData(data);
        setProductOld(data)
      }
   
  }
  

  const getUserCollection = async () => {
    // console.log('process.env.REACT_APP_GET_CART',process.env.REACT_APP_GET_CART)
        if (setProceed) {
          const { data } = await axios.get(`${URL_LOCAL_END}/sections/user`,

                {
                    headers: {
                        'Authorization': authToken
                    }
                })
          // console.log('-----------------getUserCollection---------data',authToken,setProceed,data.data)
             setLoading(false)
              if(data.data.length === 0){
                
              }else{
                // arr1.push(...arr2);
                console.log('-----------------formattedData---------data',data.data)
                // console.log('-----------------formattedData-----2----data',data.data[0].products, data.data[0].quantity)
                setSection(data.data[0])
                setQuantitys(data.data[0].quantity)
                setAddProduct(formattedData(data.data[0].products, data.data[0].quantity))
              }
              setSectionsData(data.data);
        
        }else{
          setOpenAlert(true)      
       }
  }


  const handleToLogin = () => {
    // navigate('/login')
};
    

  const formattedData = (data, array) => data.map((obj, i) => (  
    {
      ...obj,
      quantity: array[i]
    }
  ));


    const  SampleNextArrow =(props) =>{
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "none", background: "red" }}
          onClick={onClick}
        />
      );
    }

    const  SamplePrevArrow =(props)=> {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "none", background: "green" }}
          onClick={onClick}
        />
      );
    }

    const sendData = async(dataSender) =>{
      //  console.log('login -------------->',dataSender)
      //  dataSender.quantity = 
       setholdData(dataSender)
       setOpenModal(true)
       setProductQuantity(1)
     
    }
   
   
    // setQuantity

    const pickSelection =(data)=>{
      setSection(data)
      // console.log('-------data.products------data',data)
      // setAddProduct(data.products)
    
      setSection(data)
      setQuantitys(data.quantity)
      setAddProduct(formattedData(data.products, data.quantity))
    }

    const handleClose = () => {
      setOpenModal(false)
  };


  const handleSubmit = (data) =>{

  }

  const submitQuantity = async()=>{
    setLoadingData(true)
      try {
        let ids = addProduct.find(x => x._id === holdData._id)
        // setLoadingData(false)
           if(ids === null || ids === undefined){
            holdData.quantity = productQuantity
            setAddProduct([...addProduct, holdData])
                const { data } = await axios.post(`${URL_LOCAL_END}/sections/sections/add/${section._id}`,
                {
                  product:holdData._id,
                  quantity: productQuantity ,
                  section:section._id,
                },{
                    headers: {
                        'Authorization': authToken
                    }
                })
              
                // console.log('------------res-----4---------data',data)
                if (data.status === true) {
                  setLoadingData(false)
                  setSectionsData(data.data)
                  setProductQuantity(1)
                  setOpenModal(false)
                  toast.success("added", { autoClose: 500, theme: 'colored' })
                
                   } else {
                    toast.error("Some thing went wrong", { autoClose: 500, theme: 'colored' })
                    setLoadingData(false)
                  }

            }else{
              if (ids._id===holdData._id) {
                setLoadingData(false)
                toast.error("Sorry this quiz is already added", { autoClose: 500, theme: 'colored' })
               } else {
                //  console.log('-------not yet-----data',ids,holdData._id)
                 setAddProduct([...addProduct, holdData])
                  const { data } = await axios.post(`${URL_LOCAL_END}/sections/sections/add/${section._id}`,
                  {
                    product:holdData._id,
                    section:section._id,
                   },{
                      headers: {
                          'Authorization': authToken
                      }
                  })
                  setLoadingData(false)
                  // console.log('--------------res---4---------data',data)
                  if (data.status === true) {
                    setProductQuantity(1)
                    setSectionsData(data.data)
                    setOpenModal(false)
                    toast.success("added", { autoClose: 500, theme: 'colored' })
                    setLoadingData(false)
                  }
                else {
                  setLoadingData(false)
                    toast.error("Some thing went wrong", { autoClose: 500, theme: 'colored' })
                }
            }
          }
         } catch (error) {
          setLoadingData(false)
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
      }
      // setAddProduct([...addProduct, data])
      
      // setSectionsData([...sectionsData., data])
      //  sendToCollection(data)
  }
 
  const increaseQuantity = () => {
    setProductQuantity((prev) => prev + 1)
    if (productQuantity >= 30) {
        setProductQuantity(1)
    }
}
const decreaseQuantity = () => {
    setProductQuantity((prev) => prev - 1)
    if (productQuantity <= 1) {
        setProductQuantity(1)
    }
}


  const  SearchData  = (data) =>{
    // console.log("data ----true-judge-school----->",data)
    
      
  }

const handleSearch = async (event) => {
  // console.log("data ----false--article----3->",event.target.value)
  try {
  // setSearchTerm(event.target.value);
  // const newFilteredData = data.filter(item =>
  //     (item.name && item.name.includes(event.target.value)) ||
  //     (item.type && item.type.includes(event.target.value)) ||
  //     (item.brand && item.brand.includes(event.target.value)) ||
  //     (item.category && item.category.includes(event.target.value)) ||
  //     (item.author && item.author.includes(event.target.value)) ||
  //     (item.description && item.description.includes(event.target.value)) ||
  //     (item.gender && item.gender.includes(event.target.value))
  // );
  // setFilteredData(newFilteredData);
  setSearchTerm(event.target.value);
  setCloseSearch(true)
     if(event.target.value.length >= 2){
      
      // console.log('--------------new enter--------data',)
            const { data } = await axios.get(`${process.env.REACT_APP_PRODUCT}/product/search/?search=${event.target.value}`,
           {
                headers: {
                    'Authorization': authToken
                }
            })

            // console.log('--------------res---4---------',data.data            )
            if (data.status === true) {
              if(data.data === undefined){

              }else{
                setProductData(data.data)
              }
             
              // toast.success("added", { autoClose: 500, theme: 'colored' })
              
            }

          }

          } catch (error) {
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }
};

const handleClickShowPassword = () =>{
  // console.log("data ----false--article----3->",)
  setCloseSearch(!closeSearch)
  setProductData(productOld)
  setSearchTerm('')
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


    // const removeBook =sectionBooks.filter(item => item._id !== bookStrodInSection.data._id)

    return (
              <div>
                     <CollectionCard   sections={sectionsData} section={section}  products={addProduct} quantity={quantity} pickSelection={pickSelection} />
                      
                     <div className='bg-white mt-10 pt-2 pl-2'>
                        <div className='pb-5'>
                                <div className="mb-2 searchInput">
                                    <input type="text" id="success"   variant="outlined"  
                                    className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" 
                                    name='name'    placeholder="Search"/>
                                    {
                                        /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                    }
                                </div>
                        </div>
                        <h3 className="font-Inter">Best seller in this category</h3>
                          <div className="product-div">
                               {productData.map((item,index) => (
                                    
                                   <ListProductCard key={index} prod={item} product={item}  sendData={sendData}/>
                              ))}
                          </div>
                     </div>


                     {
                      openModal ?
                        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" >
                            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                
                                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                      <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-black sm:mx-0 sm:size-10">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" aria-hidden="true" data-slot="icon" class="on bbb"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path></svg>
                                      </div>
                                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 class="text-base font-semibold text-gray-900" id="modal-title">Add product</h3>
                                        <div class="mt-2">
                                        <p class="text-sm text-gray-500">Enter name of project or collection</p>
                                      </div>
                                      </div>
                                    </div>
                                  </div>
                                  <form onSubmit={handleSubmit}>
                                        <div className="mb-2 pl-2 pr-2">
                                
                                        <div className="flex items-center product-add">
                                            <button type="button" className="border  rounded-md py-2 px-4 mr-2 font-Inter dark:text-black"  onClick={increaseQuantity}>+</button>
                                            <span className="text-center w-8 font-Inter dark:text-black">{productQuantity}</span>
                                            <button type="button" className="border rounded-md py-2 px-4 ml-2 font-Inter dark:text-black" onClick={decreaseQuantity}>-</button>
                                        </div>
                                               
                                         </div>
                                         {
                                          loadingData === true ?
                                              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <div role="status">
                                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                              </div>
                                              </div>
                                            :
                                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button  type='button'  onClick={()=>submitQuantity()} class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto">Submit</button>
                                                <button type="button" onClick={() => handleClose()} class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                              </div>
                                        }
                                   </form>
                                </div>
                              </div>
                            </div>
                        </div>
                        :null
                     }
                    
              </div>
    )
}

export default ProjectListComponent