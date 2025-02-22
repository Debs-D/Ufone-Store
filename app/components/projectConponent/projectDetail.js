"use client";
import React, { useEffect ,useState,useRef} from 'react'
import axios from 'axios'
// import { Link, useParams,useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import { getCart, getWishList, handleLogOut, handleClickOpen, Transition } from '../../Constants/Constant'
import { usePaystackPayment } from "react-paystack";
import { toast } from 'react-toastify';
// import { Rating } from 'react-simple-star-rating'
import { Rating } from "react-simple-star-rating";
import ImageGallery from 'react-image-gallery';
import MarkdownPreview from '@uiw/react-markdown-preview';
import ProjectReview from './projectReviews';
import CommentCard from '../comment/CommentProjectCard'
import  ProductSearchCard from "../projectConponent/projectProductCard"
import "react-image-gallery/styles/css/image-gallery.css";
import Share from './Projectshare'

const  ProjectSlide = (props) => {
    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
    const { cart } = useContext(ContextFunction)
    const [userData, setUserData] = useState([])
    const [email,setEmail]= useState('')
      const { setCart } = useContext(ContextFunction)
      // const { id, cat } = useParams()
      // console.log('-----params------------------->',id)
      const [productData, setProductData] = useState([])
      const [loading,setLoading] = useState(false);
      // const [section,setSection] = useState(null);
      const [section , setSection] = useState(null)
      const [openAlert, setOpenAlert] = useState(false);
      const [loginOpen,setLoginOpen]= useState(false);
      const [sectionData,setSectionData]= useState(null)
      const [images, setImages]= useState([])
      const [showData,setShowData]=useState(null)
      const [totalProduct,setTotalProduct] = useState(0)
      const [products,setProducts] = useState([])
    //   const navigate = useNavigate()
      const [getData,setGetData] = useState(null);
      const [openEdit, setOpenEdit] = useState(false);
      const [loadingData,setLoadingData] = useState(false);
      const [shareMoald,setShareMoald] = useState(false);
      const [allPrice,setAllPrice]= useState(false);
      const [user, setUser]= useState(null);
      let authToken = localStorage.getItem('Authorization')
      let setProceed = authToken ? true : false
      const [step,setStep]= useState({page:1,title:'collection'})
      let totalAmount = sessionStorage.getItem('totalAmount')
      let where = sessionStorage.getItem('where')
      let shiping = sessionStorage.getItem('shiping')
      const [shipData, setShipData] = useState(null);
      const [showProductData,setShowProductData] = useState(false)
      const [school,setSchool]= useState(null);
      const [schoolSelected,setSchoolSelected]= useState(null);
      const [antoine,setAntoine] =useState(false)
      const [value, setValue] = useState(1);
      const shareUrl = 'https://www.store.ufuon.com/project/detail';
      // const [value, setValue] = useState(0);
      const [hover, setHover] = useState('');
      const [reviews, setReviews] = useState([])
      const [comment, setComment] = useState('')
      const [filterOption, setFilterOption] = useState('All')
      const [title, setTitle] = useState('All')
    const   LIVE_FRONT="pk_live_ea6773bf8db05e06219b386c3e2ffa5aecebedbb"
      const referenceNumber = () => {
          return "bld" + Math.floor(Math.random() * 1000000000 + 1);
        };
      
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
      const [productInfo, setProductInfo] = useState({
        name: "",
        description:''
         });
    
      useEffect(() => {
        setLoading(false)
        getAllSection()
        getUserData()
          window.scroll(0, 0)
      }, [])
  
  
      const getUserData = async () => {
        try {
          if (authToken !== null) {
            console.log('get user --------------------------->',authToken)
            const { data } = await axios.get(`${URL_LOCAL_END}/auth/getuser`, {
                headers: {
                    'Authorization': authToken
                }
            })
           console.log('get user --------------------------->',data)
            setUserData(data);
            setUser(data)
            setEmail(data.email)
            if (!data.address || !data.city || !data.zipCode || !data.userState) {
                setOpenAlert(true);
                // console.log(1);
              }
             
            userDetails.firstName = data.firstname
            userDetails.lastName = data.lastname
            userDetails.userEmail = data.email
            userDetails.phoneNumber = data.phoneNumber
            userDetails.address = data.address
            userDetails.zipCode = data.zipCode
            userDetails.city = data.city
            userDetails.userState = data.userState
          }
        } catch (error) {
            // console.log(error);
        }
  
    }
  
    
    const config = {
        
        reference: referenceNumber(),
        email:email,
        amount:parseFloat(allPrice+'000'),
        publicKey:LIVE_FRONT
     };
    
     console.log('----initializePayment-------------------->',config)
    
      const initializePayment = usePaystackPayment(config);
      const Ref = useRef(null);
  
      const getAllSection = async () => {
        const ArrayDATA = []
        console.log('{URL_LOCAL_END}/sections==------------>',props.id)
        // console.log('process.env.REACT_APP_GET_CART',process.env.REACT_APP_GET_CART)
  
            const { data } = await axios.get(`${URL_LOCAL_END}/sections/${props.id}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
  
          setSectionData(data.data);
          CountTotal(formattedData(data.data.products, data.data.quantity))
          setSection(data.data.products[0])
          setProducts(formattedData(data.data.products, data.data.quantity))
          var images = data.data.products[0]
                  for (let i = 0; i < images.images.length; i++) {
                    // console.log('data----------images------->',images.images[i].url)
                        const newData ={
                                original:  images.images[i].url,
                                thumbnail:  images.images[i].url,
                        }
                        //  setImages([...images, newData])
                  ArrayDATA.push(newData)
            }
            setImages(ArrayDATA)
            setLoading(false)
      
  
      }
  
    const handleClose = () => {
      setOpenAlert(false);
      setShareMoald(false)
      setLoginOpen(false)
      // setOpenEdit(false)
  };
  
  
  
  const checkOutHandler = async (e) => {
    e.preventDefault()
      console.log('-------checking out----------------->',)
    if(antoine === true){
       if(school === null){
        toast.error("Click to Select school", { autoClose: 500, theme: "colored" })
        return
       }
    }
    if (!userDetails.firstName || !userDetails.lastName || !userDetails.userEmail || !userDetails.phoneNumber || !userDetails.address || !userDetails.zipCode || !userDetails.city || !userDetails.userState) {
        toast.error("Please fill all fields", { autoClose: 500, theme: "colored" })
    }
    else {
        // console.log('amount data--------lp----->',parseFloat(allPrice+'00'))
        initializePayment(onSuccess, onClose)
  
    }
  }
  
  const handleOnchange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
   
   
     
     const clickModal =()=>{
      setOpenAlert(true)
     }
  
       // const [productInfo, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })
   
  
     const SendDataSelect = (data) =>{
      props. pickSelection(data)
      // props.SendDataToCallection(data)
     }
     
     const SendDataToCallection = (data) =>{
  
     }
  
     const ClickToShow =(data)=>{
      console.log('data----------images------============----------->', data)
      setShowData(data)
      const ArrayDATA = []
      var images =  data.images
      for (let i = 0; i < data.images.length; i++) {
        // console.log('data----------images------->', data.images[i].url)
                  const newData ={
                          original:  data.images[i].url,
                          thumbnail:  data.images[i].url,
                  }
                  //  setImages([...images, newData])
            ArrayDATA.push(newData)
        }
        setImages(ArrayDATA)
        setShowProductData(true)
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
  
    // const getProduct = (data) =>{
    //   // console.log('data product--------->',data)
    //   navigate('/list')
    // }
  
    const shareProduct = (data) =>{ 
      // console.log('--------data--------->',data)
      setShareMoald(true)
    }
  
    const removeProductData = async(data) =>{
      setLoadingData(true)
      var removeBook = products.filter(item => item._id !== data._id)
      setProducts(removeBook)
      CountTotal(removeBook)
      const ArrayDATA = []
      // var images =  data.images
      var product = removeBook[0]
        if(removeBook.length === 0){
           }else{
          for (let i = 0; i < product.images.length; i++) {
            // console.log('data----------images------->', product.images[i].url)
                      const newData ={
                              original:  product.images[i].url,
                              thumbnail:  product.images[i].url,
                      }
                      //  setImages([...images, newData])
                ArrayDATA.push(newData)
              }
          }
     
        if(removeBook.length === 0){
          setImages([])
            }else{
            setImages(ArrayDATA)
        }
        
          try {
           const { data } = await axios.put(`${process.env.REACT_APP_SECTIONS}/${sectionData._id}`,
                    {
                      products: removeBook
                    }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                setOpenAlert(false);
                if (data.status === true) {
                  toast.success("Collection Updated", { autoClose: 500, theme: 'colored' })
                    // setProductInfo({
                    //     name: "",
                        
                    //    });
                    setSectionData(data.data)
                   setLoadingData(false)
                   setOpenEdit(false)
                }
                else {
                  setLoadingData(false)
                    toast.error("Some thing went wrong", { autoClose: 500, theme: 'colored' })
                }
           } catch (error) {
             setLoadingData(false)
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }
    }
  
  
     const  moneyFormat =(price, sign = 'N') =>{
      const pieces = parseFloat(price).toFixed(2).split('')
      let ii = pieces.length - 3
      while ((ii-=3) > 0) {
        pieces.splice(ii, 0, ',')
      }
      return sign + pieces.join('')
    }
  
   const EditCollection = () =>{
      setOpenAlert(true)
      productInfo.name = sectionData.name
      productInfo.description =  sectionData.description
   }
    
  
   const formattedData = (data, array) => data.map((obj, i) => (  
    {
      ...obj,
      quantity: array[i]
    }
  ));
   
  
    const UpdateSubmit = async (e) =>{
      e.preventDefault()
      setLoadingData(true)
      // console.log('-----------------4---------data',productInfo.name)
      try {
          if (!productInfo.name ) {
              toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
              setLoadingData(false)
            }
          else {
              const { data } = await axios.put(`${process.env.REACT_APP_SECTIONS}/${sectionData._id}`,
                  {
                      name: productInfo.name,
                      company :'store',
                      description:productInfo.description,
                  }, {
                  headers: {
                      'Authorization': authToken
                  }
              })
              setOpenAlert(false);
              // console.log('-----------------4---------data',data)
              if (data.status === true) {
                toast.success("Collection Updated", { autoClose: 500, theme: 'colored' })
                // console.log('-----------------4---------data',data.data)
                setSectionData(data.data)
                 setLoadingData(false)
                 setOpenEdit(false)
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
  
    const GetProduct = () =>{
        console.log('data-------------click-------->',)
        if (authToken !== null) {
          setStep({page:2,title:'Address'})
        }else{
          setLoginOpen(true)
        }
        
    
        
    }
  
    const onSuccess = (reference) => {
        
    
  
      const CreateData = {
        reference: reference.reference,
        user:user._id,
        productDetails: JSON.stringify(products),
         userId: userData._id,
         section:sectionData._id,
         userDetails: JSON.stringify(userDetails),
        student:true,
        shiping,
        school:school === null ? null : school.label,
        where,
        connection:true,
         amount: allPrice,
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
      // console.log('--------------------->plan',CreateData,products)
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
  
  
  
  
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      // console.log("closed");
    };
  
    
  
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
  
     const schoolData = [
            {  id:1, label: "Sleek angels international schools", address: "30 Rumuevuorlu Rd., Off Miniorlu by Ada George Rd., PortHarcourt, Rivers State" ,zip:500001,state:'Port Harcourt', city:'Rivers State'},
      
     ];
  
  
  
     const containedMove = ()=>{
      setStep({page:2,title:' Shipping method'})
     }
  
  const NextPage= ()=>{
    setAllPrice(shipData+totalProduct)
    // console.log('setShepData get',shipData+totalProduct)
      
      setStep({page:3,title:'   Order Summary         '})
  }
  
  const NextBackToOrder = ()=>{
      setStep({page:1,title:'   Order Summary '})
  }
  
  
  function handleChange(checkedValues) {
          // console.log('checking',checkedValues)
        setValue(checkedValues);
        let result = StateData.find(o => o.id === parseFloat(checkedValues));
        setShipData(result.amount)
        // passData(result)
      //   console.log(result)
   }
  
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
  
    const handleToLogin = () => {
        navigate('/login')
    };
    
    
    const timePush =(data)=>{
            setTimeout(function(){
            
                navigate('/')
            }, 1500);
    }

    return (
            <div> 
              {
                step.page === 1?
                <div>
                {
                  loading === true?
                  <div className="product-div">
                    <div className="product-loader">
                            <button disabled type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-white-700 focus:text-white-700 dark:bg-white-800 dark:text-white-400 dark:border-white-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                </svg>
                                Loading...
                            </button>
                       </div>
                    </div>
                    :
                    <div className="font-sans bg-white">
                    {
                        // console.log('props--------------data--->',props.section,props.products)
                    }
                    <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded">
                       <div className="lg:col-span-2 w-full lg:sticky top-0 text-center">
                       {
                        showProductData  === true ?
                           <div className="px-4 py-10 rounded shadow-md relative">
                           {loading ? (
                              <button disabled type="button" class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-white-700 focus:text-white-700 dark:bg-white-800 dark:text-white-400 dark:border-white-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                  </svg>
                                  Loading...
                              </button>
                               ) : (
                                images.length  === 0 ?
                                <h3 className='productDetail-title'>{sectionData.name} </h3>
                                :
                                <ImageGallery items={images} sizes={90}  originalClass="w-4/5 aspect-[251/171] rounded object-cover mx-auto" />
                               )}
                           </div>
                           :
                           <div className="px-4 py-10 rounded shadow-md relative">
                           {
                            props.section.url ?
                            <img src={props.section.url}  className="w-4/5 aspect-[251/171] rounded object-cover mx-auto" />
                            :
                            <div style={{ alignItems: 'center',justifyContent: 'center',textAlign:'center',paddingTop:'5%'}}>
                              
                                    <br/>
                                  <h1> No Image Yet</h1>
                            </div>
                          }
                          {
                            // <img src="https://readymadeui.com/images/laptop5.webp" alt="Product" className="w-4/5 aspect-[251/171] rounded object-cover mx-auto" />
                            // <button type="button" className="absolute top-4 right-4">
                            //     <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                            //     <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                            //     </svg>
                            // </button>
                          }
                         
                           </div>
                       }
                    
                       {
                        showProductData  === true ?
                        <div style={{marginTop:'5%'}}>
                              <h3 className="text-xl  text-gray-800 t" style={{textAlign:'left'}}> {showData.name}</h3>
                      
   
                           <div className="flex flex-wrap gap-4 mt-2">
                                <p className="text-gray-800 text-2xl font-bold">{moneyFormat(showData.price)}</p>
                               
                           </div>
                           <div className='product-rating' style={{display:'flex',width:'100%',marginTop:'2%'}}>
                           {
                            <Rating readonly={true} size={22} initialValue={Math.round(showData.rating)} />
                           }
                             
                           </div>
                        
                        
                        </div>
                        :
                        null
                      }
                         
                   </div>
   
                   <div className="xl:col-span-3 w-full project-detail">
                       <div className='project-share'>
                        <div className="flex gap-4 max-w-md">
                          <button type="button" onClick={(() => GetProduct())} class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Buy now
                          </button>

                          {
                            // <button type="button" className=" px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Share</button>
                          }

                        </div>
                      </div>  
                      {
                        props.section == null?
                        null
                        :
                       <h3 className="text-xl font-bold text-gray-800">{props.section.name}</h3>
                      }
                       <div className="flex items-center space-x-1 mt-2">
                       <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                           d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                       </svg>
                       <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                           d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                       </svg>
                       <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                           d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                       </svg>
                       <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 14 13" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                           d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                       </svg>
                       <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                           d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                       </svg>
                       <h4 className="text-gray-500 text-base !ml-3">500 Reviews</h4>
                       </div>
   
                       <p className="text-sm text-gray-500 mt-2"> {  props.section.title}</p>
   
                       <div className="flex flex-wrap gap-4 mt-6">
                       
                       {
                        props.products ===  undefined ?
                         null
                         :
                         <p className="text-gray-800 text-2xl font-bold">{moneyFormat(CountTotal(props.products))}</p>
                       }
                      
                       {
                         //      <p className="text-gray-500 text-base"><strike>$1500</strike> <span className="text-sm ml-1">Tax included</span></p>
                       }
                       <Share  title={props.section.name} postDesc={props.section.title} id={props.section._id} keywords={props.section.name} description={props.section.title} image={props.section.imageFile.url} />
                       </div>
   
                       <div className="mt-6">
                       <h3 className="text-xl font-bold text-gray-800">Products</h3>
                       
                       </div>
                       {
                        props.products ===  undefined ?
                         null
                         :
                       <div className="mt-4 flex flex-wrap  gap-4 ">
                       {
                           props.products .map((item, index) => (
                
                            <div key={index} className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center rounded p-2 shadow-md cursor-pointer">
                            <a href='#' onClick={()=>ClickToShow(item)}>
                                <img src={item.images[0].url} alt="Product2" className="w-full object-cover object-top" />
                            </a>
                              {
                                // <p> {item.name.length > 35 ? item.name.slice(0, 35) + '...' : item.name}</p>
                              }
                              
                            </div>
                          ))
                        }
                       </div>
                      }
                     
                      <MarkdownPreview source={props.section.description} />
                       {
                        // <div className="flex gap-4 mt-12 max-w-md">
                        // <button type="button" className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">Buy now</button>
                        // <button type="button" className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
                        // </div>
                       }

                       {
                        sectionData  === null || undefined ?
                        null
                        :
                         <div className="flex items-start" style={{marginTop:'5%',marginBotton:'5%'}}>
                                <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                                <div className="ml-3">
                                <p style={{color:'#000'}}>Project Created by</p>
                                {
                                    sectionData. owner.firstName === undefined ?
                                   <h4 className="text-sm font-bold text-gray-800">{sectionData.owner.firstname + ' ' + sectionData.owner.lastname}</h4>
                                   :
                                   <h4 className="text-sm font-bold text-gray-800">{sectionData.owner.firstName + ' ' + sectionData.owner.lastName}</h4>
                                }
                            </div>
                       </div>
                    }
                      
                   </div>
              </div>

   
                   <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
                   <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
                   <div className="grid md:grid-cols-2 gap-12 mt-4">
                       <div className="space-y-3 max-w-md">
                       <div className="flex items-center">
                           <p className="text-sm text-gray-800 font-bold">5.0</p>
                           <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                           </svg>
                           <div className="bg-gray-400 rounded w-full h-2 ml-3">
                           <div className="w-1/5 h-full rounded bg-blue-600"></div>
                           </div>
                           <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                       </div>
   
                       <div className="flex items-center">
                           <p className="text-sm text-gray-800 font-bold">4.0</p>
                           <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                           </svg>
                           <div className="bg-gray-400 rounded w-full h-2 ml-3">
                           <div className="w-1/3 h-full rounded bg-blue-600"></div>
                           </div>
                           <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                       </div>
   
                       <div className="flex items-center">
                           <p className="text-sm text-gray-800 font-bold">3.0</p>
                           <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                           </svg>
                           <div className="bg-gray-400 rounded w-full h-2 ml-3">
                           <div className="w-1/6 h-full rounded bg-blue-600"></div>
                           </div>
                           <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                       </div>
   
                       <div className="flex items-center">
                           <p className="text-sm text-gray-800 font-bold">2.0</p>
                           <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                           </svg>
                           <div className="bg-gray-400 rounded w-full h-2 ml-3">
                           <div className="w-1/12 h-full rounded bg-blue-600"></div>
                           </div>
                           <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                       </div>
   
                       <div className="flex items-center">
                           <p className="text-sm text-gray-800 font-bold">1.0</p>
                           <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                               d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                           </svg>
                           <div className="bg-gray-400 rounded w-full h-2 ml-3">
                           <div className="w-[6%] h-full rounded bg-blue-600"></div>
                           </div>
                           <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                       </div>
                       </div>
   
                       <div>
                           <ProjectReview setProceed={setProceed} sectionData={sectionData} id={props.id} authToken={authToken}  setOpenAlert={setOpenAlert} />
                          

                              {
                                reviews.map(review =>
                                    <CommentCard userReview={review} id={props.id} key={review._id} authToken={authToken} setReviews={setReviews} reviews={reviews} fetchReviews={fetchReviews} />
                                )
                              }
                            </div>
                           </div>
                        </div>
                       </div>
                   </div>
                }
               
                 

              </div>
              : step.page  === 2?
              <div> 
              <div className='checkout-section'>
               
                    <h3>Checkout</h3>
                
                
                    <div className='check-returning-copon'>
                    {authToken !== null  ?
                          <div className='check-returning'>
                              <h2> {userDetails.firstName}  {   userDetails.lastName}? <a href='/profile'> Update profile</a></h2>
                          </div>
                          :
                          <div className='check-returning'>
                              <h2> Click here to log in <a href='/auth/sigin'> Click here to log in</a></h2>
                          </div>
                    }
                          <div className='check-returning'>
                              <h2>  Have a coupon? <a>Click here to enter your code</a> </h2>
                          </div>
                      </div>
                      
                  
                    <div className="lg:max-w-7xl max-w-4xl mx-auto" >
                        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12  rounded">
                            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center" >
                              <div className='project-product'>
                                   {
                                    products.map(data => (
                                        <ProductSearchCard  product={data}/>
                                      ))
                                    }
                                </div>  
                            </div>
                            <div className="xl:col-span-2 w-full " >
                              {StateData.map((item,index) => {
                                return (
                                      <a onClick={()=>handleChange(item.id)} className={item.id === parseFloat(value) ?'orderSummary-select':'orderSummary'}>
                                          <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-2 ml-1">
                                          <input id="bordered-checkbox-1" type="checkbox" 
                                                  key={item.label}
                                                  // onChange={handleChange}
                                                  checked={item.id === parseFloat(value)}
                                                  value={item.id}
                                              />
                                 
                                                  <label htmlFor="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-black-300"> {item.label} </label>
                                              
                                                  <p style={{color:'#000',marginRight:'2%'}}>
                                                      {moneyFormat(item.amount)}
                                                  </p>
                                               </div>
                                          </a>
                                      );
                                  })}

                                  <div className="flex gap-4 max-w-md project-state-button">
                                  <button type="button" onClick={()=>NextBackToOrder()} className=" px-4 py-2.5 outline-none border border-red-600 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded">Back</button>
                                  <button type="button"  onClick={()=>NextPage()} className=" px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Next</button>
                                  </div>
                            </div>
                          </div>
                       </div>
                  </div>
              </div>
              : step.page  === 3?
                <div>
                <div className='checkout-section'>
                    <h3>Checkout</h3>
                      <div className='check-returning-copon'>
                      {authToken !== null  ?
                          <div className='check-returning'>
                              <h2> {userDetails.firstName}  {   userDetails.lastName}? <a href='/profile'> Update profile</a></h2>
                          </div>
                          :
                          <div className='check-returning'>
                              <h2> Click here to log in <a href='/auth/sigin'> Click here to log in</a></h2>
                          </div>
                      }
                          <div className='check-returning'>
                              <h2>  Have a coupon? <a>Click here to enter your code</a> </h2>
                          </div>
                      </div>
                    {
                      user === null || undefined ?
                      null
                      :
                      <div>
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
                                                    
                                                                <input  id="bordered-checkbox-1" type="checkbox" 
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
                                    <form  onSubmit={checkOutHandler} >
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
                                             
                                              </div>
                                              <div className='project-submit'>
                                              <button type="button" onClick={()=>setStep({page:2,title:'Address'})} className=" px-4 py-2.5 outline-none border border-red-600 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded">Back</button>
                                                 <button  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 ml-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                                              </div>

                                        </form>
                                    </div>
                                  }
                              </div>
                          </div>
                         }
                    </div>
                  </div>
                 :
              null
            }
         </div>
         
     )
}



export default ProjectSlide