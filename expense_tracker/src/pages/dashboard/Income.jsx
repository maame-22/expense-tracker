import React, { useEffect, useState } from 'react'
import { FaPlus , FaTrash } from "react-icons/fa6";
import axios from 'axios'
import { useOutletContext } from 'react-router-dom';

const Income = () => {
  // 
  const context = useOutletContext();

  const id = context[0].id

  const [values , setValues] = useState({
    id:id,
    title:'',
    amount:'',
    date:'',
    desc:'',
    category:'income',
    type:'',
    img:''
  })
  const [data , setData]= useState();

  const [total , setTotal] = useState();
  console.log(values.date)

//  this line gets total income data from the server
  useEffect(()=>{
    axios.get(`http://localhost:3000/addTransac/totalIncome/`+id)
    .then(res=>setTotal(res.data[0].total))
    .catch(err=>console.log(err))
  } , [])

// this line gets income data from the server 
  useEffect(()=>{
  axios.get(`http://localhost:3000/addTransac/`+id)
  .then(res=>{
    setData(res.data)
  } )
  .catch(err=>console.log(err))
} , [])

// this line sends input values to server to be stored in the database
  const handleSubmit = (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', id)
    formData.append('title', values.title)
    formData.append('amount' ,values.amount)
    formData.append('date', values.date)
    formData.append('desc', values.desc)
    formData.append('category', values.category)
    formData.append('type',values.type)
    formData.append('img', values.img)

    axios.post('http://localhost:3000/addTransac' ,formData)
    .then(res=>console.log(res))
    .then(err=>console.log(err))
  }
// this code tells the server to delete row with specified id from the database
const handleDelete = (e)=>{
    const id = e;
    axios.defaults.withCredentials= true;
    axios.delete(`http://localhost:3000/addTransac/`+id)
    .then(res=>{console.log(res.data) , location.reload()})
    .catch(err=>console.log(err))
  }



  return (
    <div className='flex flex-col gap-4 mt-[10px] pb-[40px] '>
      <h1 className='text-2xl font-semibold ml-[20px] dark:text-gray-400'>Income</h1>
      <div className='w-[95%] mx-auto bg-gray-200 dark:bg-gray-400/80 text-center p-[10px] rounded-xl'>
        <h1 className='text-xl font-semibold'>Total Income:
          {
            total&&(
              <span className='text-green-700 text-lg'>ETB{total}</span>
            )
          }
        </h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 w-[95%] mx-auto'>
        <div className='col-span-1'>
          <form className='w-full flex flex-col gap-2 ' onSubmit={handleSubmit}>
            <div className='w-full'>
              <input required onChange={(e)=>setValues({...values , title:e.target.value})} type="text" placeholder='Title' className='dark:text-white placeholder-gray-300 border-1 border-gray-400 outline-0 w-full p-[5px] rounded-md dark:caret-white' />
            </div>
            <div className='w-full'>
              <input required onChange={(e)=>setValues({...values , amount:e.target.value})} type="number" placeholder='Amount'className='dark:text-white dark:caret-white placeholder-gray-300 border-1 border-gray-400 outline-0 w-full p-[5px] rounded-md' />
            </div>
            <div>
              <input required onChange={(e)=>setValues({...values , date:e.target.value})} type="date"   placeholder='Date' className=' border-1 border-gray-400 outline-0 w-full p-[5px] rounded-md'  />
            </div>
             <div>
              <input required onChange={(e)=>setValues({...values , img:e.target.files[0]})} type="file"  placeholder='file' className=' border-1 dark:text-white border-gray-400 outline-0 w-full p-[5px] rounded-md'  />
            </div>
              <select onChange={(e)=>setValues({...values , type:e.target.value})}  className=' border-1 dark:text-gray-400 border-gray-400 outline-0 w-full p-[5px] rounded-md'  >
              <option value="Select type">Select type</option>
              <option value="Cash">Cash</option>
              <option value="Wallet">Wallet</option>
              <option value="Bank">Bank</option>
            </select>
            <div>
              <textarea required onChange={(e)=>setValues({...values , desc:e.target.value})} placeholder='Describtion' className='dark:text-white dark:caret-white placeholder-gray-300 resize-none border-1 border-gray-400 outline-0 w-full p-[5px] rounded-md' ></textarea>
            </div>
            <div>
              <button onClick={(e)=>{location.reload() , e.stopPropagation()}} className='text-white  hover:opacity-85 border-0 outline-0 bg-green-600 py-[5px] px-[8px] rounded-md cursor-pointer flex items-center gap-1'><FaPlus /> Add Income</button>
            </div>
          </form>

        </div>
        <div className='flex flex-col gap-2 col-span-2 mt-[20px] lg:mt-0'>
          {
            data &&(
              data.map(item=>{
                return(
                  <div key={item.tran_id}  className='w-full bg-gray-200 dark:bg-gray-400 p-[10px] rounded-xl flex justify-between items-center '>
                          <div>
                          <h1 className='text-lg font-semibold capitalize'>{item.title}</h1>
                          <div className='flex flex-col sm:flex-row gap-3'>
                            <p className='text-green-600'>ETB:{item.amount}<span className='text-black'>({item.type})</span></p>
                            <p>{item.date}</p>
                            <p>{item.desc}</p>
                          </div>

                          </div>
                          <div>
                            <div className='bg-black p-[8px] rounded-full text-white dark:text-gray-400 cursor-pointer'>
                              <FaTrash onClick={()=>handleDelete(item.tran_id)}/>
                             
                            </div>
                          

                          </div>
                

                  </div>

                )
              })
            )
          }
      

        </div>


      </div>

      

    </div>
  )
}

export default Income