import React from 'react'
import icon from '../../assets/icon.jfif'
import dashboard from '../../assets/icons/dashboard.svg'
import transac from '../../assets/icons/transaction.svg'
import income from '../../assets/icons/income.svg'
import expense from '../../assets/icons/expense.svg'
import axios from 'axios'
import { CiMenuFries } from "react-icons/ci";
import { LuReceipt } from "react-icons/lu";


import {NavLink, useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Sidebar = (Props) => {
  const navigate = useNavigate()
  const [open , setOpen] = useState(false)

  const handleDelete = ()=>{
    axios.get('http://localhost:3000/logout')
    // eslint-disable-next-line no-unused-vars
    .then(res=>{
      navigate('/login')
      location.reload(true)
      
    })
    .catch(err=>console.log(err))
  }


  return (
    <>
     <CiMenuFries className='cursor-pointer absolute top-4 dark:text-white left-[5%] z-100 lg:hidden' onClick={()=>setOpen(!open)} />
     <div className={`${open?'w-[250px]' :'w-0 overflow-hidden '} w-0 overflow-hidden  md:w-[250px] flex flex-col justify-between rounded-md bg-white dark:bg-gray-800 dark:text-white text-black fixed top-[55px] left-0 bottom-0 z-90`}>
        
      <div className='ml-[20px] mt-[10px]'>
        <div className='flex gap-2 items-center mb-[30px] '>
            <img src={icon} alt="" className='w-[50px] rounded-full'/>
            <div>
                <h3 className='text-sm font-semibold dark:text-gray-400'>{Props.data[0].name}</h3>
                <p className='text-xs dark:text-gray-400'>{Props.data[0].email}</p>
            </div>
            
        </div>
        <div className='container flex flex-col gap-4'>
            <NavLink to='/Home' end  className='flex gap-3 items-center'>
            <img  src={dashboard} className='w-[20px]'/>
                <h3 className='text-md font-semibold dark:text-gray-400'>Dashboard</h3>
            </NavLink>
        
            <NavLink to= 'transac' className='flex gap-3 items-center'>
               <img  src={transac} className='w-[20px]'/>
                <h3 className='text-md font-semibold dark:text-gray-400'>View Transactions</h3>
            </NavLink>
        
            <NavLink to= 'income' className='flex gap-3 items-center'>
                <img  src={income} className='w-[20px]'/>
                <h3 className='text-md font-semibold dark:text-gray-400'>Income</h3>
            </NavLink>
            <NavLink to= 'expense' className='flex gap-3 items-center'>
                 <img  src={expense} className='w-[20px]'/>
                <h3 className='text-md font-semibold dark:text-gray-400'>Expense</h3>
            </NavLink>
        </div>
      </div>
      <div className='text-end mb-[20px] mr-[20px]'>
        <button onClick= {handleDelete} className='border-0 outline-0 bg-blue-500 p-[5px] rounded-md dark:text-gray-400 text-white w-[50%] cursor-pointer '>
          Logout
        </button>
      </div>

        
    </div>
    
    
    
    
    
    </>
   
  )
}

export default Sidebar