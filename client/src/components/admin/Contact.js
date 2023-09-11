import React from 'react'

const Contact = (props) => {
  const handleCommentSubmit = (event)=>{
    event.preventDefault()

    const userComment = event.target.commentInput.value
    console.log(userComment);
  }
  return (
    <div className='registerBox box'>
      <p className='title'>Contact Us</p>
      <form className='form' onSubmit={(event)=>handleCommentSubmit(event)}>
        <input className="input" type='text'id="inputUsername" name="inputUsername" placeholder='Username' required/>
        <input className="input" type='text'id="inputEmail" name="email" placeholder='Email' required/>
        <textarea className='input' type='text' maxLength={200} rows={5} cols={40}name='commentInput' placeholder="Your message"/>
        <button className='submitButton' type="submit">Submit</button>
      </form> 
    </div>
  )
}

export default Contact