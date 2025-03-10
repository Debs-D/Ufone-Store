"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

// import { Link, useParams,useNavigate } from 'react-router-dom'
import { Box } from "@mui/system";
import { useContext } from "react";
import { ContextFunction } from "../../../Context/Context";
import {
  getCart,
  getWishList,
  handleLogOut,
  handleClickOpen,
  Transition,
} from "../../../Constants/Constant";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
// import { Rating } from 'react-simple-star-rating'
import { Rating } from "react-simple-star-rating";
import ImageGallery from "react-image-gallery";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useDropzone } from "react-dropzone";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "next/navigation";

// import Share from './Projectshare'

const ProjectSlide = (props) => {
  const URL_END = "https://ufuon-store.vercel.app/api";
  const URL_LOCAL_END = "http://localhost:43000/api";
  const code = `# title\n\nHello World!\n\n`;
  const { setCart } = useContext(ContextFunction);
  // const { id, cat } = useParams()
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [section,setSection] = useState(null);
  const [section, setSection] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [sectionData, setSectionData] = useState(null);
  const [images, setImages] = useState([]);
  const [showData, setShowData] = useState(null);
  const [totalProduct, setTotalProduct] = useState(0);
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate()
  const [getData, setGetData] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [shareMoald, setShareMoald] = useState(false);
  const [quantitys, setQuantitys] = useState([]);
  const [step, setStep] = useState({ page: 1, title: "collection" });
  const [loadPublish, setLoadPublish] = useState(false);
  const [publish, setPublish] = useState(false);
  const [markdownVal, setMarkdownVal] = useState(code);
  const shareUrl = "https://www.store.ufuon.com/project/detail";
  // console.log("markdownVal:", markdownVal);
  const [login, setLogin] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [showImageUi, setShowImageUi] = useState(false);
  const [source, setSource] = useState("");
  const [showProductData, setShowProductData] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  // let navigate = useNavigate()
  const [myFiles, setMyFiles] = useState([]);
  const [allFile, setAllFile] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productDelete, setProductDetele] = useState(null);
  const [type, setType] = useState(null);
  const [typeName, setTypeName] = useState(null);
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams;
  const [productInfo, setProductInfo] = useState({
    name: "",
    title: "",
    Description: "",
    description: "",
  });
  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken ? true : false;
  useEffect(() => {
    console.log("get user --------params------------------->", params);
    setLoading(true);
    getAllSection();
    callCategories();
    window.scroll(0, 0);
  }, []);

  const getAllSection = async () => {
    const ArrayDATA = [];
    setLoading(true);
    console.log("{URL_LOCAL_END}/sections==---all me now--------->", props.id);
    // console.log('process.env.REACT_APP_GET_CART',process.env.REACT_APP_GET_CART)

    var { data } = await axios.get(`${URL_LOCAL_END}/sections/${props.id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    setLoading(false);
    setSectionData(data.data);
    CountTotal(formattedData(data.data.products, data.data.quantity));
    setSection(data.data.products[0]);
    setProducts(formattedData(data.data.products, data.data.quantity));
    if (data.data.products.length === 0) {
      // console.log('checking data---true---------->', data.data.products.length )
      setLoading(false);
      setSection(null);
    } else {
      setSection(data.data.products[0]);
      if (data.data.publish === undefined) {
        setPublish(false);
      } else {
        if (data.data.publish === false) {
          setPublish(false);
        } else {
          setPublish(true);
        }
      }
      if (data.data.category === null || data.data.category === undefined) {
        setTypeName("Pick category");
      } else {
        setTypeName(data.data.category.name);
        setType(data.data.category._id);
      }

      setProducts(formattedData(data.data.products, data.data.quantity));
      setQuantitys(data.data.quantity);
      CountTotal(formattedData(data.data.products, data.data.quantity));
      setShowData(data.data.products[0]);
      console.log("product eorror -----------i");
      var images = data.data.products[0];
      for (let i = 0; i < images.images.length; i++) {
        // console.log('data----------images------->',images.images[i].url)
        const newData = {
          original: images.images[i].url,
          thumbnail: images.images[i].url,
        };
        //  setImages([...images, newData])
        ArrayDATA.push(newData);
      }
      setImages(ArrayDATA);
      setLoading(false);
    }

    setLoading(false);
    setImages(ArrayDATA);
    setLoading(false);
  };

  const callCategories = async () => {
    var { data } = await axios.get(`${URL_LOCAL_END}/categories`, {
      headers: {
        Authorization: authToken,
      },
    });
    console.log("-----------------category------->", data);
    setProjects(data.data);
  };

  const handleClose = () => {
    setOpenAlert(false);
    setShareMoald(false);
    setDeleteModal(false);

    // setOpenEdit(false)
  };

  const handleOnchange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const clickModal = () => {
    setOpenAlert(true);
  };

  // const [productInfo, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })

  const SendDataSelect = (data) => {
    props.pickSelection(data);
    // props.SendDataToCallection(data)
  };

  const SendDataToCallection = (data) => {};

  const ClickToShow = (data) => {
    console.log("data----------images------============----------->", data);
    setShowData(data);
    const ArrayDATA = [];
    var images = data.images;
    for (let i = 0; i < data.images.length; i++) {
      // console.log('data----------images------->', data.images[i].url)
      const newData = {
        original: data.images[i].url,
        thumbnail: data.images[i].url,
      };
      //  setImages([...images, newData])
      ArrayDATA.push(newData);
    }
    setImages(ArrayDATA);
    setShowProductData(true);
  };

  const CountTotal = (data) => {
    // const  quantity = 1
    // console.log('--------CountTotal---------1------------>',data)
    var totaltAll = data.reduce(function (res, item) {
      return res + item.price * item.quantity;
    }, 0);
    setTotalProduct(totaltAll);
    console.log(totaltAll);
    return totaltAll;
  };

  // const getProduct = (data) =>{
  //   // console.log('data product--------->',data)
  //   navigate('/list')
  // }

  const shareProduct = (data) => {
    // console.log('--------data--------->',data)
    setShareMoald(true);
  };

  const removeProductData = async (data, index) => {
    console.log("data----------images------->", data, index);
    setLoadingData(true);
    var removeBook = products.filter((item) => item._id !== data._id);
    setProducts(removeBook);
    CountTotal(removeBook);
    const ArrayDATA = [];
    // var images =  data.images
    var product = removeBook[0];
    if (removeBook.length === 0) {
    } else {
      for (let i = 0; i < product.images.length; i++) {
        // console.log('data----------images------->', product.images[i].url)
        const newData = {
          original: product.images[i].url,
          thumbnail: product.images[i].url,
        };
        //  setImages([...images, newData])
        ArrayDATA.push(newData);
      }
    }

    if (removeBook.length === 0) {
      setImages([]);
    } else {
      setImages(ArrayDATA);
    }

    try {
      const { data } = await axios.put(
        `${URL_LOCAL_END}/sections/${sectionData._id}`,
        {
          products: removeBook,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setOpenAlert(false);
      if (data.status === true) {
        toast.success("Collection Updated", {
          autoClose: 500,
          theme: "colored",
        });
        setSectionData(data.data);
        setLoadingData(false);
        setOpenEdit(false);
        setDeleteModal(false);
      } else {
        setLoadingData(false);
        toast.error("Some thing went wrong", {
          autoClose: 500,
          theme: "colored",
        });
      }
    } catch (error) {
      setLoadingData(false);
      toast.error(error.response.data.error, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  const moneyFormat = (price, sign = "N") => {
    const pieces = parseFloat(price).toFixed(2).split("");
    let ii = pieces.length - 3;
    while ((ii -= 3) > 0) {
      pieces.splice(ii, 0, ",");
    }
    return sign + pieces.join("");
  };

  //  const EditCollection = () =>{
  //     setOpenAlert(true)
  //     productInfo.name = sectionData.name
  //     productInfo.description =  sectionData.description
  //  }

  const EditCollection = () => {
    console.log("-EditCollection------------------------>", sectionData);
    setOpenAlert(true);
    productInfo.name = sectionData.name;
    productInfo.Description = sectionData.title;
    productInfo.description = sectionData.description;
    setMarkdownVal(sectionData.description);
    // productInfo.description
  };

  const UpdateSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    console.log(
      "---------UpdateSubmit--------1---------data",
      productInfo.name,
      productInfo.Description,
      type
    );
    try {
      if (!productInfo.name) {
        toast.error("Please Fill the all Fields", {
          autoClose: 500,
          theme: "colored",
        });
        setLoadingData(false);
      } else {
        console.log(
          "---------UpdateSubmit--------2---------data",
          productInfo.name,
          `${URL_LOCAL_END}/${sectionData._id}`
        );
        const { data } = await axios.put(
          `${URL_LOCAL_END}/sections/${sectionData._id}`,
          {
            name: productInfo.name,
            company: "store",
            description: markdownVal,
            category: type,
            title: productInfo.Description,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setOpenAlert(false);
        // console.log('-----------------4---------data',data)
        if (data.status === true) {
          toast.success("Collection Updated", {
            autoClose: 500,
            theme: "colored",
          });
          // console.log('-----------------4---------data',data.data)
          setSectionData(data.data);
          setLoadingData(false);
          setOpenEdit(false);
        } else {
          setLoadingData(false);
          toast.error("Some thing went wrong", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      setLoadingData(false);
      toast.error(error.response.data.error, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  const GetProduct = () => {
    console.log("data-------------click-------->");
    if (authToken !== null) {
      setStep({ page: 2, title: "Address" });
    } else {
      setLoginOpen(true);
    }
  };

  function ToSeoUrl(url) {
    // make the url lowercase
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and
    encodedUrl = encodedUrl.split(/\&+/).join("-and-");

    // remove invalid characters
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters
    encodedUrl = encodedUrl.trim("-");

    return encodedUrl;
  }

  const handleToLogin = () => {
    navigate("/login");
  };

  const dataForSwitch = async () => {
    setLoadPublish(true);

    try {
      const { data } = await axios.post(
        `${URL_LOCAL_END}/sections/publish`,
        {
          id: sectionData._id,
          publish: !publish,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      // setOpenAlert(false);
      // console.log('-----------------4---------data',data)
      if (data.status === true) {
        toast.success("Collection Updated", {
          autoClose: 500,
          theme: "colored",
        });
        setLoadPublish(false);
        setPublish(!publish);
        setLoadPublish(false);
      } else {
        setLoadPublish(false);
        toast.error("Some thing went wrong", {
          autoClose: 500,
          theme: "colored",
        });
      }
    } catch (error) {
      setLoadPublish(false);
      toast.error(error.response.data.error, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  const handleType = (e) => {
    // console.log("----=--------->",e.target.value )
    setType(e.target.value);
    //  props.getAge(e.target.value)
  };

  const onDrop = useCallback((acceptedFiles) => {
    setMyFiles([...myFiles, ...acceptedFiles]);
  });

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": [],
      },
      maxFiles: 1,
      maxSize: 2000000,
      //   onDropRejected,
    });

  const formattedData = (data, array) =>
    data.map((obj, i) => ({
      ...obj,
      quantity: array[i],
    }));

  const openImageData = () => {
    setOpenImage(true);
    setShowImageUi(true);
  };

  const openImageBack = () => {
    setOpenImage(false);
    setShowImageUi(false);
  };

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const uploadFileAws = () => {
    console.log("data-------------->", myFiles);

    var arrayData = null;
    setLoadingImage(true);
    //   console.log('data-------------->',bucket)
    const uploaders = myFiles.map((image) => {
      const formData = new FormData();
      // console.log('done image---->',  image);
      formData.append("file", image);
      formData.append("upload_preset", "tutorial");
      formData.append("cloud_name", "breellz");
      const options = {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          "access-control-allow-origin": "*",
          //   'Authorization': Auth.getToken(),
        },
        url: "https://api.cloudinary.com/v1_1/dghjdfdfz/image/upload",
      };
      // Make an AJAX upload request using Axio
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dghjdfdfz/image/upload",
          formData,
          options.headers
        )
        .then((response) => {
          console.log("response", response.data);

          const data = {
            data: response.data.asset_id,
            version_id: response.data.asset_id,
            public: response.data.public_id,
            url: response.data.url,
            versionNum: response.data.version,
          };
          arrayData = data;
          // setAllFile([...allFile, data])
          console.log("save data---------->", data);
          if (response.data.status === "success") {
          } else {
            toast.success("Uploadeding");
          }
        });
    });

    // Once all the files are uploaded
    axios
      .all(uploaders)
      .then(() => {
        setAllFile(arrayData);
        sendImageUpdata(arrayData);
      })
      .catch((err) => toast.error(err));
  };

  const sendImageUpdata = async (dataFile) => {
    console.log("sending file to server----------->", dataFile);
    try {
      const { data } = await axios.put(
        `${URL_LOCAL_END}/sections/${sectionData._id}`,
        {
          imageFile: dataFile,
          url: dataFile.url,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      // setOpenAlert(false);
      // console.log('-----------------4---------data',data)
      if (data.status === true) {
        toast.success("Collection Updated", {
          autoClose: 500,
          theme: "colored",
        });
        toast.success("Uploadeding");
        setOpenImage(false);
        setShowImageUi(false);
        setLoadingImage(false);
        setOpenAlert(false);
        setSectionData(data.data);
      } else {
        setLoadingData(false);
        setLoadingImage(false);
        toast.error("Some thing went wrong", {
          autoClose: 500,
          theme: "colored",
        });
      }
    } catch (error) {
      setLoadingData(false);
      setLoadingImage(false);
      toast.error(error.response.data.error, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  const files = myFiles.map((img, index) => (
    <div className="w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3">
      <div className="flex justify-between">
        <div className="w-[70%] flex justify-start items-center space-x-2">
          <div
            className="text-[#5E62FF] text-[37px] cursor-pointer"
            onClick={() => showImage(img.photo)}
          >
            {img.type.match(/image.*/i) ? (
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
            )}
          </div>
          <div className=" space-y-1">
            <div className="text-xs font-medium text-gray-500">{img.name}</div>
            <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
              img.size / 1024
            )} KB`}</div>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="space-y-1">
            <div
              className="text-gray-500 text-[17px] cursor-pointer"
              onClick={removeFile(img)}
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </div>
            <div className="text-[10px] font-medium text-gray-400">Done</div>
          </div>
        </div>
      </div>
    </div>
  ));

  const GetProductModal = (data, index) => {
    console.log("--------------------------------------->", data, index);
    setProductDetele({ data, index });
    setDeleteModal(true);
  };

  const timePush = (data) => {
    setTimeout(function () {
      navigate("/");
    }, 1500);
  };

  return (
    <div>
      <div>
        {loading === true ? (
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
          <div className="font-sans bg-white">
            {
              // console.log('props--------------data--->',props.section,props.products)
            }
            <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
              <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded">
                <div className="lg:col-span-2 w-full lg:sticky top-0 text-center">
                  {showProductData === true ? (
                    <div className="px-4 py-10 rounded shadow-md relative">
                      {loading ? (
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
                      ) : images.length === 0 ? (
                        <h3 className="productDetail-title">
                          {sectionData.name}{" "}
                        </h3>
                      ) : (
                        <ImageGallery
                          items={images}
                          sizes={90}
                          originalClass="w-4/5 aspect-[251/171] rounded object-cover mx-auto"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-10 rounded shadow-md relative">
                      {props.section.url ? (
                        <img
                          src={props.section.url}
                          className="w-4/5 aspect-[251/171] rounded object-cover mx-auto"
                        />
                      ) : (
                        <div
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            paddingTop: "5%",
                          }}
                        >
                          <br />
                          <h1> No Image Yet</h1>
                        </div>
                      )}
                      {
                        // <img src="https://readymadeui.com/images/laptop5.webp" alt="Product" className="w-4/5 aspect-[251/171] rounded object-cover mx-auto" />
                        // <button type="button" className="absolute top-4 right-4">
                        //     <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                        //     <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                        //     </svg>
                        // </button>
                      }
                    </div>
                  )}

                  {showProductData === true ? (
                    <div style={{ marginTop: "5%" }}>
                      <h3
                        className="text-xl  text-gray-800 t"
                        style={{ textAlign: "left" }}
                      >
                        {" "}
                        {showData.name}
                      </h3>

                      <div className="flex flex-wrap gap-4 mt-2">
                        <p className="text-gray-800 text-2xl font-bold">
                          {moneyFormat(showData.price)}
                        </p>
                      </div>
                      <div
                        className="product-rating"
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: "2%",
                        }}
                      >
                        {
                          <Rating
                            readonly={true}
                            size={22}
                            initialValue={Math.round(showData.rating)}
                          />
                        }
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="xl:col-span-3 w-full project-detail">
                  <div className="project-share">
                    <div className="flex   myProject-button">
                      <button
                        onClick={() => EditCollection()}
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ml-1 text-sm p-2 h-8 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => EditCollection()}
                      >
                        Edit
                        <svg
                          class="ml-1 w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </button>
                      {loadPublish === true ? (
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
                      ) : (
                        <div>
                          {publish ? (
                            <button
                              onClick={() => dataForSwitch()}
                              type="button"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg ml-1 text-sm p-2 h-8 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Publish
                              <svg
                                class="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={() => dataForSwitch()}
                              type="button"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ml-1 text-sm p-2 h-8 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Publish
                              <svg
                                class="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}

                      <a
                        href="/my-project/list"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-1 p-2 h-8 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {" "}
                        Products
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2M3 11h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"
                          />
                        </svg>
                      </a>
                      {
                        // <button type="button" className=" px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Share</button>
                      }
                    </div>
                  </div>
                  {props.section == null ? null : (
                    <h3 className="text-xl font-bold text-gray-800">
                      {props.section.name}
                    </h3>
                  )}
                  <div className="flex items-center space-x-1 mt-2">
                    <svg
                      className="w-4 h-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <h4 className="text-gray-500 text-base !ml-3">
                      500 Reviews
                    </h4>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {" "}
                    {props.section.title}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    {props.products === undefined ? null : (
                      <p className="text-gray-800 text-2xl font-bold">
                        {moneyFormat(totalProduct)}
                      </p>
                    )}

                    {
                      //      <p className="text-gray-500 text-base"><strike>$1500</strike> <span className="text-sm ml-1">Tax included</span></p>
                    }
                    {
                      // <Share  title={props.section.name} postDesc={props.section.title} id={props.section._id} keywords={props.section.name} description={props.section.title} image={props.section.imageFile.url} />
                    }
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Products
                    </h3>
                  </div>
                  {props.products === undefined ? null : (
                    <div className="mt-4 flex flex-wrap  gap-4 ">
                      {products.map((item, index) => (
                        <div
                          key={index}
                          class="flex max-sm:flex-col items-center gap-6 overflow-hidden cursor-pointer"
                        >
                          <div
                            onClick={() => ClickToShow(item)}
                            class="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden rounded-lg"
                          >
                            <img
                              src={item.images[0].url}
                              alt="product1"
                              class="h-full w-full object-contain"
                            />
                          </div>
                          <div class=" max-sm:text-center">
                            <h3
                              class="text-sm sm:text-base font-bold text-gray-800"
                              onClick={() => ClickToShow(item)}
                            >
                              {" "}
                              {item.name.length > 19
                                ? item.name.slice(0, 19) + "..."
                                : item.name}
                            </h3>
                            <h4
                              class="text-sm sm:text-base text-blue-600 font-bold mt-2 "
                              onClick={() => ClickToShow(item)}
                            >
                              {" "}
                              {moneyFormat(item.price)}
                            </h4>
                            {loadingData ? (
                              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 float-right">
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                      fill="currentFill"
                                    />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => GetProductModal(item, index)}
                                type="button"
                                class="text-white float-right bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none flont focus:ring-red-300 font-medium rounded-lg ml-1 text-sm p-2 h-8 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              >
                                <svg
                                  class="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        // <a href='#' onClick={()=>ClickToShow(item)}>
                        //     <div key={index}  class="w-40 h-auto relative block bg-gray-100 p-3 rounded-xl text-center font-[sans-serif] mt-4">
                        //       <img src={item.images[0].url}  class="w-full rounded-xl" />
                        //       <h4 class="text-sm text-gray-800 mt-4 font-bold">Emma Berger</h4>
                        //     </div>
                        //  </a>
                        // <div key={index} className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center rounded p-2 shadow-md cursor-pointer">
                        //     <a href='#' onClick={()=>ClickToShow(item)}>
                        //         <img src={item.images[0].url} alt="Product2" className="w-full object-cover object-top" />
                        //     </a>
                        //  </div>
                      ))}
                    </div>
                  )}
                  {sectionData === null || undefined ? null : (
                    <MarkdownPreview source={sectionData.description} />
                  )}
                  {
                    // <div className="flex gap-4 mt-12 max-w-md">
                    // <button type="button" className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">Buy now</button>
                    // <button type="button" className="w-full px-4 py-2.5 outline-none border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
                    // </div>
                  }

                  {sectionData === null || undefined ? null : (
                    <div
                      className="flex items-start"
                      style={{ marginTop: "5%", marginBotton: "5%" }}
                    >
                      <img
                        src="https://readymadeui.com/team-2.webp"
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div className="ml-3">
                        <p style={{ color: "#000" }}>Project Created by</p>
                        {sectionData.owner.firstName === undefined ? (
                          <h4 className="text-sm font-bold text-gray-800">
                            {sectionData.owner.firstname +
                              " " +
                              sectionData.owner.lastname}
                          </h4>
                        ) : (
                          <h4 className="text-sm font-bold text-gray-800">
                            {sectionData.owner.firstName +
                              " " +
                              sectionData.owner.lastName}
                          </h4>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
                <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
                <div className="grid md:grid-cols-2 gap-12 mt-4">
                  <div className="space-y-3 max-w-md">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">5.0</p>
                      <svg
                        className="w-5 fill-blue-600 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div className="bg-gray-400 rounded w-full h-2 ml-3">
                        <div className="w-1/5 h-full rounded bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">
                        66%
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">4.0</p>
                      <svg
                        className="w-5 fill-blue-600 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div className="bg-gray-400 rounded w-full h-2 ml-3">
                        <div className="w-1/3 h-full rounded bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">
                        33%
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">3.0</p>
                      <svg
                        className="w-5 fill-blue-600 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div className="bg-gray-400 rounded w-full h-2 ml-3">
                        <div className="w-1/6 h-full rounded bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">
                        16%
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">2.0</p>
                      <svg
                        className="w-5 fill-blue-600 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div className="bg-gray-400 rounded w-full h-2 ml-3">
                        <div className="w-1/12 h-full rounded bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">1.0</p>
                      <svg
                        className="w-5 fill-blue-600 ml-1"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <div className="bg-gray-400 rounded w-full h-2 ml-3">
                        <div className="w-[6%] h-full rounded bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {openAlert ? (
          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
          >
            <div
              class="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="myproject-imageIcon">
                      <div class="w-full max-w-sm min-w-[200px]">
                        <div class="relative">
                          <select
                            onChange={handleType}
                            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                          >
                            <option selected disabled>
                              {" "}
                              {typeName}
                            </option>
                            {projects.map((item) => (
                              <option
                                value="brazil"
                                label={item.name}
                                key={item.name}
                                value={item._id}
                              >
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.2"
                            stroke="currentColor"
                            class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                            />
                          </svg>
                        </div>
                      </div>
                      {showImageUi === true ? (
                        <button
                          type="button"
                          onClick={() => openImageBack(!openImage)}
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm ml-1 p-2 h-8 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 12h14M5 12l4-4m-4 4 4 4"
                            />
                          </svg>
                          Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openImageData(!openImage)}
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-1 p-2 h-8 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-black sm:mx-0 sm:size-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          class="on bbb"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          ></path>
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          class="text-base font-semibold text-gray-900"
                          id="modal-title"
                        >
                          Edit Project
                        </h3>
                      </div>
                    </div>
                  </div>
                  {sectionData === null ? null : (
                    <div className="mb-2 pl-2 pr-2">
                      {showImageUi === true ? (
                        <div>
                          <form>
                            <small style={{ float: "right", color: "red" }}>
                              Length of image {files.length}
                            </small>
                            {files.length === 0 ? (
                              <p style={{ marginBottom: "5px" }}>
                                <b> Add Image or drag and drop image </b>
                              </p>
                            ) : null}
                            <section className="containerDropzone">
                              {files.length === 0 ? (
                                <div className="flex  justify-center items-center px-5 pt-10 pb-10 bg-slate-400">
                                  <div
                                    {...getRootProps({
                                      className: "dropzone disabled",
                                    })}
                                  >
                                    <input
                                      {...getInputProps()}
                                      multiple={false}
                                    />
                                    <p>
                                      Drag 'n' drop some files here, or click to
                                      select files
                                    </p>
                                  </div>
                                </div>
                              ) : null}

                              <aside className="file-column">{files}</aside>
                            </section>

                            {loadingImage === true ? (
                              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                      fill="currentFill"
                                    />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto">
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleClose()}
                                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      ) : (
                        <div className="image-and-select">
                          <form onSubmit={UpdateSubmit}>
                            <div className="select">
                              {
                                // <h4>Edit Collections</h4>
                              }

                              <div style={{ width: "100%" }}>
                                <div className="mb-2 ml-1">
                                  <label className="block mb-2 text-sm font-medium text-black dark:text-black-500">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    id="success"
                                    label="name"
                                    name="name"
                                    value={productInfo.name}
                                    onChange={handleOnchange}
                                    variant="outlined"
                                    className="bg-black-50 border border-green-500 text-green-900 dark:text-black-400 placeholder-green-700 dark:placeholder-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 white w-full p-2.5 dark:bg-white-700 dark:border-blue-500"
                                    placeholder="Name"
                                  />
                                  {
                                    /// <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p>
                                  }
                                </div>

                                <div className="mb-2 ml-1">
                                  <label
                                    for="message"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                  >
                                    Title
                                  </label>
                                  <textarea
                                    id="message"
                                    rows="4"
                                    name="Description"
                                    value={productInfo.Description}
                                    onChange={handleOnchange}
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                  ></textarea>
                                </div>
                                <div className="mb-2 ml-1">
                                  <label
                                    for="message"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                  >
                                    Description
                                  </label>
                                  <MarkdownEditor
                                    light="Light"
                                    value={markdownVal}
                                    onChange={(value) => {
                                      setMarkdownVal(value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {loadingData ? (
                              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                      fill="currentFill"
                                    />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto">
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleClose()}
                                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {deleteModal ? (
          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
          >
            <div
              class="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg
                          class="size-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          class="text-base font-semibold text-gray-900"
                          id="modal-title"
                        >
                          Delete product
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Are you sure you want to delete this product?{" "}
                            {productDelete.data.name}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {loadingData === true ? (
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={() =>
                          removeProductData(
                            productDelete.data,
                            productDelete.index
                          )
                        }
                        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => handleClose()}
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectSlide;
