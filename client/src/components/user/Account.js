import React from 'react'

const Account = (props) => {

    const myRecords = []

    const showList =(myRecords)=>{

        myRecords.map(oneRecord =>{
            return (<div>oneRecord</div>)
        })

    }
    const changeAvatar  = ()=>{
        console.log("Change avatar");
    }

  return (
    <div>Account
        <img className='userIconInComment' src={props.img} onClick ={changeAvatar}></img>
        <button>Edit</button>
        <p>Name {props.username}</p>
        <p>Text about me{props.about}</p>  
        <p>{myRecords.length > 0? showList(myRecords):"You don't have any records yet."}</p>
    </div>
  )
}

export default Account