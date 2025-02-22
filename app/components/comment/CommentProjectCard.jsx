
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete, AiOutlineSend } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import { toast } from 'react-toastify';
import { Rating } from "react-simple-star-rating";
const CommentCard = ({ userReview, setReviews, reviews, fetchReviews }) => {
    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
    // let date = new Date(userReview.createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
    // let time = new Date(userReview.createdAt).toLocaleTimeString('en-US')
    const [authUser, setAuthUser] = useState()
    const [editComment, setEditComment] = useState(userReview.comment)
    const [edit, setEdit] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [value, setValue] = useState(userReview.rating);
    let authToken = localStorage.getItem('Authorization')
    useEffect(() => {
        // authToken && getUser()
    }, [])
    const getUser = async () => {
        const { data } = await axios.get(`${URL_LOCAL_END}/auth/getuser`, {
            headers: {
                'Authorization': authToken
            }
        })
        console.log('data------------------------------------->',data)
        setAuthUser(data._id);
        if (data.isAdmin === true) {
            setIsAdmin(true)
        }
    }
    const handleDeleteComment = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_DELETE_REVIEW}/${userReview._id}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            toast.success(data.msg, { autoClose: 500, theme: 'colored' })
            setReviews(reviews.filter(r => r._id !== userReview._id))
        } catch (error) {
            toast.success(error, { autoClose: 500, theme: 'colored' })
        }

    }
    const deleteCommentByAdmin = async () => {
        if (isAdmin) {
            try {
                const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_DELETE_REVIEW}/${userReview._id}`,
                    {
                        headers: {
                            'Authorization': authToken
                        }
                    })
                toast.success(data.msg, { autoClose: 500, theme: 'colored' })
                setReviews(reviews.filter(r => r._id !== userReview._id))
            } catch (error) {
                console.log(error);
                toast.success(error.response.data, { autoClose: 500, theme: 'colored' })
            }
        } else {
            toast.success("Access denied", { autoClose: 500, theme: 'colored' })
        }
    }
    const sendEditResponse = async () => {
        if (!editComment && !value) {
            toast.error("Please Fill the all Fields", { autoClose: 500, })
        }
        else if (editComment.length <= 4) {
            toast.error("Please add more than 4 characters", { autoClose: 500, })
        }
        else if (value <= 0) {
            toast.error("Please add rating", { autoClose: 500, })
        }
        else if (editComment.length >= 4 && value > 0) {
            try {
                if (authToken) {
                    const response = await axios.put(`${process.env.REACT_APP_EDIT_REVIEW}`,
                        { id: userReview._id, comment: editComment, rating: value },
                        {
                            headers: {
                                'Authorization': authToken
                            }
                        })
                    toast.success(response.data.msg, { autoClose: 500, })
                    fetchReviews()
                    setEdit(false)
                }
            }
            catch (error) {
                toast.error("Something went wrong", { autoClose: 600, })
            }
        }
    }
    return (

            <div className="flex items-start" style={{marginTop:'5%'}}>
                    <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                    <div className="ml-3">
                   
                    <h4 className="text-sm font-bold text-gray-800">{userReview.user.firstname + ' ' + userReview.user.lastname}</h4>
                    <div className="flex items-center space-x-1 mt-1">
          
                        
                        {!edit && 
                           
                            <Rating name="read-only"  readonly={true} size={14} initialValue={Math.round(userReview.rating)}  precision={0.5} />
                            
                        }
                        
                        
                    {edit &&
                        <div className='product-rating' style={{display:'flex'}}>
                         <Rating readonly={true}  size={12}
                            name="simple-controlled"
                            initialValue={Math.round(userReview.rating)} 
                            precision={0.5}
                            readonly={true}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                              />
                         </div>
                        }
                          
                        <p className="text-xs !ml-2 font-semibold text-gray-800">2 mins ago</p>
                    </div>
                    <p className="text-sm mt-3 text-gray-500">  {!edit && userReview.comment}</p>
                    </div>
            </div>
        


    )
}

export default CommentCard