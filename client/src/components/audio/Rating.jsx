import React from 'react'
import { useState } from 'react'

const Rating = () => {

  const [likesCount, setLikesCount] = useState(0)
  const [disLikesCount, setDisLikesCount] = useState(0)
  const [rating, setRating] = useState('Record rating: Brilliant')

  const handleLikes =()=>{
    console.log(likesCount)
    setLikesCount(likesCount+1)
  }

  const handleDisLikesCount =()=>{
    console.log(disLikesCount)
    setDisLikesCount(disLikesCount+1)
  }

  return (
    <div>
      <div onClick={(likesCount)=>handleLikes(likesCount)}>Like {likesCount}</div>
      <div onClick={(likesCount)=>handleDisLikesCount(likesCount)}>Dis Like {disLikesCount}</div>
      <div> {rating} </div>

    </div>

  )
}

export default Rating