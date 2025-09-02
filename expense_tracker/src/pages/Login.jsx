import React , {useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'//
import axios from 'axios'

const Login = () => {
  const [values , setValues]=useState({
    email:'',
    password:''
  })

  const [err , setErr] = useState()
   const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.defaults.withCredentials=true;
    axios.post('http://localhost:3000/login' , values)
    .then(res=>{
      if(res.data.Status==='success'){
        navigate('/Home')
      }else{
        setErr(res.data.error)
      }
    })
    .then(err=>console.log(err))
  }
  return (
    <div className='w-full h-screen bg-blue-950'>
        
     <div className='w-[90%] min-h-[70vh] mx-auto sm:w-[50%] sm:min-h-[60vh] lg:w-[30%] lg:min-h-[75vh] translate-y-1/4 sm:translate-y-1/5 md:translate-y-1/6 rounded-md text-white bg-gray-600'>
       <div className='pl-[35px] pr-[35px] pt-[30px] flex flex-col'>
            <div className='mb-[40px]'>
                <p className='text-sm font-semibold'>Please enter your login details </p>
                <h1 className='text-3xl font-bold mt-[10px] '>Welcome back</h1>
                {err && (<p className='text-center bg-red-400 mt-[5px] p-[1px] rounded-xs'>{err}</p>)}
            </div>
            <form className='w-full' onSubmit={handleSubmit}>
                <input onChange={(e)=>{setValues({...values , email:e.target.value})}} type="email" placeholder='Enter your email' className='w-full outline-0 border-1 border-gray-500 p-[6px] rounded-md mb-[25px]' />
                <input  onChange={(e)=>{setValues({...values , password:e.target.value})}} type="password" placeholder='Enter your password ' className='w-full outline-0 border-1 border-gray-500 p-[6px] rounded-md '/>
            <div className='text-end mt-[20px] mb-[30px]'>
                <a href="#" className='text-blue-500 text-sm font-semibold'>Forgot password</a>
            </div>
            <div className='w-full'>
                <button className='w-full outline-0 bg-blue-500 text-white cursor-pointer py-[8px] px-[10px rounded-md'>Login</button>
            </div>
            </form>
            <div className='text-center mt-[20px]'>
                <p className='text-sm text-gray-400 '>Dont have an account?<Link to='/' className='text-blue-500 font-semibold'>signup</Link> </p>
            </div>
       </div>
     </div>

    </div>
  )
}

export default Login