// import './Collection.css'
"use client";
import React, { useContext, useEffect, useState } from 'react'


import axios from 'axios';
// import { Link, NavLink, useNavigate ,useParams} from 'react-router-dom';

// import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
// import { getCart, getWishList, handleLogOut, handleClickOpen, handleClose, Transition } from '../Constants/Constant'

const Collection = (props) => {
  const URL_END = "https://ufuon-store.vercel.app/api";
  const URL_LOCAL_END = "http://localhost:43000/api";
    // const { setCart } = useContext(ContextFunction)
    const [productData, setProductData] = useState([])
    const [sectionsData, setSectionsData] = useState([])
    const [loading,setLoading] = useState(false);
    const [loadingData,setLoadingData] = useState(false);
    const [productInfo, setProductInfo] = useState({
      name: "",
       });
       let authToken = localStorage.getItem('Authorization')
      //  let setProceed = authToken ? true : false
      //  let navigate = useNavigate()
    const [openAlert, setOpenAlert] = useState(false);
    const [login,setLogin] = useState(false);
    const [deleteModal,setDeleteModal]= useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [getData,setGetData] = useState(null);
    // let navigate = useNavigate()
    let setProceed = authToken ? true : false
    // let navigate = useNavigate()
    useEffect(() => {
      setLoading(true)
      getAllProduct()
        window.scroll(0, 0)
    }, [])


    const getAllProduct = async () => {
      // setLoading(false)
      if (setProceed) {
          const { data } = await axios.get(`${URL_LOCAL_END}/sections/user`,
              {
                  headers: {
                      'Authorization': authToken
                  }
              })
        console.log('-----------------4----seactions-----data',data)
        setLoading(false)
        setSectionsData(data.data);
       
      }else{
        setLogin(true)
      }

  }

  const handleToLogin = () => {
    // navigate('/login')
};
    
  // const [productInfo, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })
  const handleOnchange = (e) => {
      setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
  }

  const handleClose = () => {
    setOpenAlert(false);
    setOpenEdit(false)
    setDeleteModal(false)
};

const Showdetail = (data) =>{
  setGetData(data)
  productInfo.name = data.name
  setOpenEdit(true)
}

const ShowDelete = (data)=>{
    setDeleteModal(true)
    setGetData(data)
}

const GoToCollection = () =>{
//   navigate('/list')
}

  const getDropDown = () =>{
    props.getDropDown()
  }

  const formattedData = (data, array) => data.map((obj, i) => (  
    {
      ...obj,
      quantity: array[i]
    }
  ));

  const  moneyFormat =(price, sign = 'N') =>{
    const pieces = parseFloat(price).toFixed(2).split('')
    let ii = pieces.length - 3
    while ((ii-=3) > 0) {
      pieces.splice(ii, 0, ',')
    }
    return sign + pieces.join('')
  }
   
  const CountTotal = (data)=> {
    // const  quantity = 1
  // console.log('--------CountTotal---------1------------>',data)
      var totaltAll = data.reduce(function(res,item) {
        return res + (item.price * item.quantity);
      }, 0);
      // setTotalProduct(totaltAll)
      console.log(totaltAll);
      return totaltAll

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingData(true)
    console.log('-----------------4---------data',productInfo)
    try {
        if (!productInfo.name ) {
            toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
            setLoadingData(false)
        }
        else {
            const { data } = await axios.post(`${URL_LOCAL_END}/sections`,
                {
                    name: productInfo.name,
                    // owner:
                    company :'store'
                    // description: productInfo.description,
                }, {
                headers: {
                    'Authorization': authToken
                }
            })
            setOpenAlert(false);
            // console.log('-----------------4---------data',data)
            if (data.status === true) {
              toast.success("Collection created", { autoClose: 500, theme: 'colored' })
              setLoadingData(false)
              setSectionsData([...sectionsData ,data.data])
                setProductInfo({
                    name: "",
                   });
            }
            else {
              setLoadingData(false)
                toast.error("Some thing went wrong", { autoClose: 500, theme: 'colored' })
            }
        }
    } catch (error) {
      setLoadingData(false)
        toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
    }

}




const deleteCollection = async ()=>{
  setLoadingData(true)
  console.log('-----------------deleteCollection---------data',getData,`${URL_LOCAL_END}/sections/${getData._id}`)
     try  {
          const { data } = await axios.delete(`${URL_LOCAL_END}/sections/${getData._id}`,
               {
              headers: {
                  'Authorization': authToken
              }
          })
          // setOpenAlert(false);
          console.log('-----------------deleteCollection    1---------data',data)
          if (data.status === true) {
            toast.success("Collection Updated", { autoClose: 500, theme: 'colored' })
             setSectionsData(sectionsData.filter(item => item._id !== getData._id));
             setLoadingData(false)
             handleClose(false)
          }
          else {
            setLoadingData(false)
              toast.error("Some thing went wrong", { autoClose: 500, theme: 'colored' })
          }
     } catch (error) {
      console.log('-----------------deleteCollection    error---------data',error)
       setLoadingData(false)
      toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
  }
}




return (
          
        <section class="relative ">
              <div class="w-full mb-12 px-4">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
                bg-white-900 text-white">
                  <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                      <div class="relative w-full px-4 max-w-full flex-grow flex-1 ">
                      <button  onClick={()=>setOpenAlert(!openAlert)} type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 float-right">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"/>
                            </svg>
                      </button>
                        <h3 class="font-semibold text-lg text-left
                        text-black">My projects</h3>
                          
                      </div>
                    </div>
                  </div>
                  <div class="block w-full overflow-x-auto ">
                    <table class="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700 ">Project</th>
                          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Budget</th>
                          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Status</th>
                          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Products</th>
                          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">meun </th>
                          <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700"> </th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            sectionsData.map((item, index) => (
                                <tr key={index}>
                                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {
                                      item.products.length  === 0 ?
                                      <a href={`/my-project/${item._id}`}>
                                          <img src="https://demos.creative-tim.com/notus-js/assets/img/bootstrap.jpg" class="h-12 w-12 bg-white rounded-full border" alt="..." />
                                      </a>
                                      :
                                      <a href={`/my-project/${item._id}`}>
                                          <img src={item.products[0].images[0].url} class="h-12 w-12 bg-white rounded-full border" alt="..." />
                                      </a>
                                    }
                                      <span class="ml-3 font-bold text-black"> {item.name}</span></th>
                                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">N {CountTotal(formattedData(item.products, item.quantity))}</td>
                                    
                                  

                                    {
                                       item.publish === true ?
                                       <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                                          <i class="fas fa-circle text-orange-500 mr-2 text-black"></i>Publish
                                        </td>
                                     :
                                     <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black">
                                        <i class="fas fa-circle text-orange-500 mr-2 text-black"></i>Unpending
                                      </td>
                                    }



                                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                      {
                                        item.products.length  === 0 ?
                                         null
                                         :
                                         <div class="flex   overflow-y-scroll " >
                                            {
                                              item.products.map((item, index) => (
                                                 <img src={item.images[0].url} key={index} alt={index} class={index ==1 ?"w-10 h-10 rounded-full border-2 border-blueGray-50 shadow":"w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"} />
                                            ))
                                          }


                                         </div>
                                      }
                                       
                                      
                                    </td>
                                  
                                    
                                    <td class="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <button   onClick={()=>ShowDelete(item)}  type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                             <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                              </svg>
                                        </button>
                                    </td>
                                  </tr>
                              ))
                          }
                          
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
               {
                deleteModal ?
                  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" >
                      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          
                          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                  <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                  </svg>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3 class="text-base font-semibold text-gray-900" id="modal-title">Delete product</h3>
                                  <div class="mt-2">
                                    <p class="text-sm text-gray-500">Are you sure you want to  delete this Project? {getData.name}.</p>
                                  </div>
                                </div>
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
                                <button type="button"  onClick={deleteCollection} class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                                <button type="button" onClick={() => handleClose()} class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                              </div>
                            }
                            
                          </div>
                        </div>
                      </div>
                  </div>
                  :null
               }

               {
                openAlert ?
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
                                        <div className="mb-2">
                                            <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">Project Name</label>
                                            <input type="text" id="success"   variant="outlined"  
                                            className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500" 
                                            name='name'   onChange={handleOnchange} placeholder="Name"/>
                                            {
                                                /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                            }
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
                                          <button    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto">Submit</button>
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
                  
         </section>
     )
}

export default Collection