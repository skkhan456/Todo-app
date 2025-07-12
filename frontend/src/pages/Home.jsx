import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

const Home = () => {
  const [loggedInUser,setloggedInUser]=useState('');
  const nevigate=useNavigate();

  useEffect(() => {
    setloggedInUser(localStorage.getItem('loggedInUser'))
  }, []);

  const handlelogout=(e)=>{
      localStorage.removeItem('loggedInUser')
      localStorage.removeItem('token')
      handleSuccess('User Loggedout');

      setTimeout(() => {
            nevigate('/login');
        }, 1000)
  }
  

  return (
    <div >
     
      <h1 className='font-bold text-xl'>{loggedInUser}</h1>
      <button 
      onClick={handlelogout}
                className="border-1 bg-blue-500 p-3 rounded-md hover:bg-blue-300 ">
      LogOut
      </button>
    </div>
    
  )
}

export default Home
