import React from 'react'
import { IoIosSunny ,  IoIosMoon} from "react-icons/io";
import { useState , useEffect} from 'react';


const Navbar = () => {
 const element = document.documentElement

 const [toggle ,  setToggle] = useState(
     localStorage.getItem('theme') ?  localStorage.getItem('theme') : 'light'
    )

  useEffect(()=>{
    if(toggle=='dark'){
        element.classList.add('dark')
        localStorage.setItem('theme' , 'dark')
    }else{
         element.classList.remove('dark')
        localStorage.setItem('theme' , 'light')
    }



    } , [toggle])


  return (
    <div className='fixed top-0 left-0 text-end flex justify-end right-0 text-2xl bg-white text-black dark:text-white dark:bg-gray-800 z-100 py-[13px] px-[3%]'>
      {
        toggle === 'light' ? (
            <IoIosMoon className='cursor-pointer' onClick={()=>setToggle('dark')} /> 
        ):(
             <IoIosSunny  className='cursor-pointer'  onClick={()=>setToggle('light')} />
        )
      }

      

    </div>
  )
}

export default Navbar