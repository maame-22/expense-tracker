/* eslint-disable no-unused-vars */
import React  , {useState} from 'react'
import { useEffect } from 'react';
import { FaTrash } from "react-icons/fa6";
import axios from 'axios'
import { useOutletContext } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import { IoMdClose } from "react-icons/io";
// import Receipt from '../../assets/images.jfif'

const Transac = () => {
  const context = useOutletContext();

  const id = context[0].id
  const [data , setData]= useState()
  const [limit , setlimit]=useState(6)
  const [pageCount , setPageCount] = useState(1)
  const currentPage = useRef(1)
  const [showModal , setShowModal] = useState()
  const [displayImg , setDisplayImg] = useState()

  console.log(displayImg)

console.log(showModal)
//this line gets all transactions from the database
useEffect(()=>{
  currentPage.current =1

  getTransac()

 } , [])


//  this line fetches specific paginated data based on given page and limit
 const getTransac = ()=>{
  axios.get(`http://localhost:3000/transacPaginate?page=${currentPage.current}&limit=${limit}&id=${id}`)
  .then(res=>{setPageCount(res.data.pageCount) , setData(res.data.result)})
  .catch(err=>console.log(err))
 }


 const handlePageClick =(e)=>{
  currentPage.current = e.selected+1
  getTransac()

 }


  return (
    <div className='ml-[30px] min-h-screen mt-[40px] flex flex-col relative'>
       <h1 className='text-lg sm:text-xl md:text-3xl font-semibold mb-[30px] dark:text-gray-400'>Transaction</h1>
       <div>
        <h1 className='text-md sm:text-lg md:text-xl font-semibold text-gray-500 dark:text-gray-300'>Transaction List<span className='text-sm capitalize'>(last : 30days)</span></h1>
        <div className='grid grid-cols-1 lg:grid-cols-2  gap-3 mb-[50px] md:mb-20px mt-[10px] mr-[20px]'>

          {
            data &&(
              data.map(item=>{
                return(
                  <div key={item.tran_id} className='w-full bg-gray-200 dark:bg-gray-400 p-[10px] rounded-xl flex justify-between items-center '>
                      <div className=''>
                        
                        <div className='flex flex-col  gap-1'>
                          <div className='flex items-center justify-between gap-5'>
                            <h1 className='text-lg font-semibold'>{item.title}</h1>
                            {
                            item.category==='expense'?(
                             <p className='text-red-600 dark:text-red-800 '>ETB:{item.amount}<span className='text-black'>({item.type})</span></p>
                            ):(
                              <p className='text-green-600 dark:text-green-800'>ETB:{item.amount}<span className='text-black'>({item.type})</span></p>
                            )
                           }

                          </div>
                    
                          <div className='flex gap-3 items-center'>
                              <p>{item.desc}</p>
                              <p>Date:{item.date}</p>
                              <a  className='cursor-pointer text-blue-500'  onClick={()=>{setShowModal(true) , setDisplayImg(item.receipt)}} >View receipt</a>
                             
                          </div>
                         
                        </div>
          
                      </div>
                      <div  >
                        <div className='bg-black p-[8px] rounded-full text-white'>
                          <FaTrash className='cursor-pointer'  />
                        </div>
                        
          
                      </div>
                        
          
                   </div>

                )
              })
            )
          }
        
          
         

        </div>
        
        <div className={`h-[60vh] ${showModal?'w-[40%]' :'w-0 overflow-hidden '} absolute top-0 translate-x-1/2 rounded-md translate-y-1/10  bg-gray-400`}>
            <div className='relative w-full h-full'>
               <IoMdClose className='absolute top-2 right-2 text-xl cursor-pointer' onClick={()=>setShowModal(false)} />
                <img src={`http://localhost:3000/images/`+displayImg} className='w-full h-full rounded-md'/>
            </div>
           
        </div>

        <div  className='cursor-pointer'>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName={'flex justify-center items-center space-x-2 mt-4'}
              pageClassName={'px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100'}
              pageLinkClassName={'text-gray-700 dark:text-gray-400'}
              activeClassName={'bg-blue-500 text-white'}
              previousClassName={'px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100'}
              previousLinkClassName={'text-gray-700 dark:text-gray-400'}
              nextClassName={'px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100'}
              nextLinkClassName={'text-gray-700 dark:text-gray-400'}
              breakClassName={'px-3 py-2 text-gray-500 dark:text-gray-400'}
            /> 
        </div>
       </div>



    </div>
  )
}

export default Transac