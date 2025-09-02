/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Navbar from './navbar'

const Home = () => {
  
  const [data , setData]=useState()
  const [auth , setAuth]=useState(false)
  const navigate = useNavigate()

  
  useEffect(()=>{
    axios.defaults.withCredentials= true;
    axios.get('http://localhost:3000/Home')
    .then(res=>{
      if(res.data.Status==='success'){
       setData(res.data.data)
       setAuth(true)
      }else{
        navigate('/login')
      }
    }).catch(err=>console.log(err))
  } ,[])

  let id ;
  return (

       <div className='grid grid-cols-5 bg-gray-300 dark:bg-gray-700 w-full min-h-screen relative'>
        {
          auth &&(
            <>
              <Navbar />
              <Sidebar data={data} />
              
              <div data='maame'  className='pb-[30px] lg:pb-0 dark:bg-gray-800 col-span-5 min-h-screen text-black md:ml-[280px] mt-[55px] bg-white  mr-[7px] rounded-xl mb-[10px] relative'>
                <Outlet context={data} />
               
              </div>
            </>
          )
        }
              
       
        </div>

    
    
  )
}

export default Home