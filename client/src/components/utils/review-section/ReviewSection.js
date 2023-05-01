import { React, useEffect } from 'react'
import { Button } from '@material-ui/core';
import style from './style.module.css';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getReviewsById, deleteReviewById, postReview } from '../../../slices/reviewSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function ReviewSection() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review.data[0]?.reviews);
  useEffect(() => {
    dispatch(getReviewsById(id))
  }, [])
  return (
    <>
      <h2>Review Section</h2>
      <div className={style.existingReviews}>
        {reviews?.map(review => <div key={review._id} className={style.review} ><AccountCircleIcon sx={{ fontSize: 50 }}/><div >{review.message}</div></div>)}
      </div>
      <div className={style.newReview}>


        <textarea placeholder='Add a review...' />
        <div className={style.buttonDiv}>
          <Button variant='contained'>Cancel</Button>
          <Button variant='contained'>Post</Button>
        </div>
      </div>
    </>
  )
}

export default ReviewSection