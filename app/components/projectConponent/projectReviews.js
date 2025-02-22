import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import { Rating } from "react-simple-star-rating";


import {
    MdSentimentSatisfiedAlt,
    MdSentimentDissatisfied,
    MdSentimentVeryDissatisfied,
    MdSentimentNeutral,
    MdSentimentVerySatisfied,
    MdStarRate,
    MdOutlineSentimentVeryDissatisfied,
    MdSend,
    MdOutlineFilterAlt
} from 'react-icons/md'
// import './CollectionReview.css'
// import CommentCard from '../Card/Comment Card/CommentCard';
// import { customerReview } from '../../Assets/Images/Image';
import CommentCard from '../comment/CommentProjectCard'


const labels = {
    0: <MdOutlineSentimentVeryDissatisfied style={{ color: 'red' }} />,
    0.5: <MdOutlineSentimentVeryDissatisfied style={{ color: 'red' }} />,
    1: <MdSentimentVeryDissatisfied style={{ color: 'red' }} />,
    1.5: <MdSentimentVeryDissatisfied style={{ color: 'red' }} />,
    2: <MdSentimentDissatisfied style={{ color: 'orange' }} />,
    2.5: <MdSentimentDissatisfied style={{ color: 'orange' }} />,
    3: <MdSentimentNeutral style={{ color: 'gold' }} />,
    3.5: <MdSentimentNeutral style={{ color: 'gold' }} />,
    4: <MdSentimentSatisfiedAlt style={{ color: 'green' }} />,
    4.5: <MdSentimentSatisfiedAlt style={{ color: 'green' }} />,
    5: <MdSentimentVerySatisfied style={{ color: 'green' }} />,
};


function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const ProjectReview = ({ authToken, setProceed, setOpenAlert, id ,sectionData}) => {
    const URL_END = "https://ufuon-store.vercel.app/api";
    const URL_LOCAL_END = "http://localhost:43000/api";
    const [loading,setLoading]= useState(false)
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState('');
    const [reviews, setReviews] = useState([])
    const [comment, setComment] = useState('')
    const [filterOption, setFilterOption] = useState('All')
    const [title, setTitle] = useState('All')
    const [rating, setRating] = useState(0)


    console.log('--ProjectReview-------id-------->',id)

    const commentFilter = ["All", "Most Recent", "Old", "Positive First", "Negative First"]
    const handleChange = (e) => {
        setFilterOption(e.target.value.split(" ").join(""))
        setTitle(e.target.value)
        fetchReviews()
    }
    const fetchReviews = async () => {
        const filter = filterOption
        const { data } = await axios.get(`${URL_LOCAL_END}/review/fetchreview-collection/${id}`, { filterType: filter })
console.log('data ProjectReview -------------#### review---->',data)
        setReviews(data)
    }
    useEffect(() => {
        fetchReviews()
    }, [title, id])



    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value , index) => console.log(value, index)

    const handleRating = (rate) => {
        console.log('----------------->',rate)
        setRating(rate)
      }


    const handleSubmitReview = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!comment && !value) {
            toast.error("Please Fill the all Fields", { theme: "colored", autoClose: 500, })
            setLoading(false)
        }
        else if (comment.length <= 4) {
            toast.error("Please add more than 4 characters", { theme: "colored", autoClose: 500, })
            setLoading(false)
        }
        else if (rating <= 0) {
            toast.error("Please add rating", { theme: "colored", autoClose: 500, })
            setLoading(false)
        }
        else if (comment.length >= 4 && rating > 0) {
            try {
                console.log('------------send ------------data------->',comment,value)
                if (setProceed) {
                    const { data } = await axios.post(`${URL_LOCAL_END}/review/add-collectionreview`, { id: id, comment: comment, rating: rating }, {
                        headers: {
                            'Authorization': authToken
                        }
                    })
                    toast.success(data.msg, { theme: "colored", autoClose: 500, })
                    fetchReviews()
                }
                else {
                    setOpenAlert(true)
                }
                setComment('')
                setValue(null)
                setRating(0)
                setLoading(false)
            }
            catch (error) {
                toast.error(error.response.data.msg, { theme: "colored", autoClose: 600, })
                setComment('')
                setValue('')
                setLoading(false)

            }
        }
    }

 
    return (

            <div>

             
                    <div className='collectionReview-Form'>
                        <div>
                          <form onSubmit={handleSubmitReview} >
                                <div   className='project-rating'>
                                <Rating
                                    VGstyle={{ display: "inline" }}
                                    VGclassName="inline"
                                    size={24}
                                    onPointerEnter={onPointerEnter}
                                    onPointerLeave={onPointerLeave}
                                    onPointerMove={onPointerMove}
                                    onClick={handleRating} initialValue={rating}
                                    /* Available Props */
                                  />
                                    {
                                    //     <Rating
                                    //     name="hover-feedback"
                                    //     value={value}
                                    //     precision={0.5}
                                    //     value={3}
                                     
                                    //     getLabelText={getLabelText}
                                    //     id="rating"
                                    //     onChange={(event, newValue) => {
                                    //         setValue(newValue);
                                    //     }}
                                    //     onChangeActive={(event, newHover) => {
                                    //         setHover(newHover);
                                    //     }}
                                    //     emptyIcon={<MdStarRate style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    // />
                                    // {value !== null && (
                                    //     <div className='expression-icon' sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</div>
                                    // )}
                                    }
                                    
                                   
                                {rating !== null && (
                                    <div className='expression-icon' sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</div>
                                )}
                                </div>
                            <div class="mb-4">
                          
                                <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                 Comment
                                </label>
                            
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                value={comment} onChange={(e) => {
                                    setComment(e.target.value)
                                }}     id="username" type="text" placeholder="Commet" />
                            </div>
                            {
                                loading === true?
                                     <div role="status">
                                               <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                               </svg>
                                               <span className="sr-only">Loading...</span>
                                     </div>
                                     :
                                 <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                                     Send
                                 </button>
                            }
                            
                        </form>
                        </div>
                    </div>
                {reviews.length >= 1 ? 
                    null
                        :
                        <div className='collectionReview-no-com'>
                          <p >No reviews have been submitted for this product yet. Be the first to add a review!</p>
                        </div>
                      
                    }

                    {
                      reviews.map(review =>
                         <CommentCard userReview={review}  key={review._id} authToken={authToken} setReviews={setReviews} reviews={reviews} fetchReviews={fetchReviews} />
                      )
                    }
                      
         </div>

    
    )
}

export default ProjectReview




