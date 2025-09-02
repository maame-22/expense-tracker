import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const [values , setValues] = useState({
    name:'',
    email:'',
    password:'',
    conPass:''
  })
  const [msg , setMsg] = useState()
  const navigate= useNavigate()

const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/register' , values)
    .then(res=>{
      if(res.data.Status==='success'){
        navigate('/login')
      }else{
       setMsg(res.data.message)
      }
    })
    .then(err=>console.log(err))
}


  return (
    <div className='w-full h-screen bg-blue-950'>

     <div className='w-[90%] h-[80vh]   sm:w-[50%] lg:w-[40%]  xl:w-[30%]  mx-auto translate-y-1/5 sm:translate-y-1/5 lg:translate-y-1/6 rounded-md text-white bg-gray-600'>
       <div className='pl-[35px] pr-[35px] pt-[30px] flex flex-col'>
            <div className='mb-[25px]'>
                <p className=' text-sm font-semibold'>Please enter your signup details </p>
                <h1 className='text-3xl font-bold mt-[10px] '>Create an account</h1>
            </div>
            {
              msg&&(
                <p className='text-red-600 text-center'>{msg}</p>
              )
            }
            

            <form className='w-full' onSubmit={handleSubmit}>

                <input onChange={(e)=>setValues({...values , name:e.target.value})} type="text" placeholder='Enter your name' className='w-full outline-0 border-1 border-gray-500 p-[6px] rounded-md mb-[25px]' />
                <input onChange={(e)=>setValues({...values , email:e.target.value})} type="email" placeholder='Enter your email' className='w-full outline-0 border-1 border-gray-500 p-[6px] rounded-md mb-[25px]' />
                <input onChange={(e)=>setValues({...values , password:e.target.value})} type="password" placeholder='Enter your password ' className='w-full outline-0 border-1 border-gray-500 p-[6px] rounded-md mb-[25px] '/>
                <input onChange={(e)=>setValues({...values , conPass:e.target.value})} type="password" placeholder='Confirm password ' className='w-full outline-0 border-1 border-gray-500 p-[6px] rounded-md mb-[25px] '/>
            
              <div className='w-full'>
                  <button className='w-full outline-0 bg-blue-500 text-white cursor-pointer py-[8px] px-[10px rounded-md'>Signup</button>
              </div>
            </form>
            <div className='text-center mt-[20px]'>
               
                <p className='text-sm text-gray-400 '>Already have an account?<Link to='/login'  className='text-blue-500 font-semibold'>Login</Link> </p>
            </div>
       </div>
     </div>

   
    </div>
  )
}

export default Register