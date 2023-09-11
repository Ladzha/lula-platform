import React from 'react';
import { AiFillHeart } from "react-icons/ai";
import IconMore from '../../img/icon-more.svg'

const ActiveIconBox = (props) => {

const handleLike=()=>{
    console.log("I click like");
}

const handleMore=()=>{
    props.toggleComments()
    console.log("I click more information");
}

  return (
    <div className='activeIconBox'>

    {/* <img src={IconMore} className='icon-more' onClick={handleMore}/> */}
    
    <div className='likeCircle' onClick={handleMore}>
        <AiFillHeart className="icon-heart" onClick={handleLike}/>
    </div>
        
    </div>

  )
}
export default ActiveIconBox