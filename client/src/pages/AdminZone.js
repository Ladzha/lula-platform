import React from 'react';
import AllPending from '../components/admin/AllPending'


const AdminZone = () => {
  return (
    <div  className='adminContainer'>
      <p className='titleMain'>Waiting approval</p>
      <AllPending/>
    </div>
  )
}
export default AdminZone