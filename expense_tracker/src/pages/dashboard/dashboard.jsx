import React , {useState , useEffect} from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'

import {Chart as ChartJS} from 'chart.js/auto'
import {Bar,Doughnut} from 'react-chartjs-2'
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const context = useOutletContext();
  const id = context[0].id
 console.log(id)
  const [expense , setExpense] = useState(0)
  const [income , setIncome] = useState(0)
  const [transac , setTransac] = useState()

  useEffect(()=>{
    axios.get(`http://localhost:3000/addTransac/totalExpense/`+id)
    .then(res=>setExpense(res.data[0].total))
    .catch(err=>console.log(err))
  } , [])

  useEffect(()=>{
    axios.get(`http://localhost:3000/addTransac/totalIncome/`+id)
    .then(res=>setIncome(res.data[0].total))
    .catch(err=>console.log(err))
  } , [])


  useEffect(()=>{
    axios.get('http://localhost:3000/transac/'+id)
    .then(res=>setTransac(res.data))
    .catch(err=>console.log(err))
  } , [])





  return (
      <div  className='grid grid-cols-1 min-h-[100vh] pb-[40px] md:pb-0 lg:grid-cols-2 gap-4 ml-[20px] mr-[20px] mt-[10px] '>
        <div className='flex flex-col col-span-1 '>
          <h1 className='text-xl md:text-3xl font-semibold dark:text-gray-400'>All Transcations</h1>
          <div className='w-full h-[250px] pl-[10%] pb-[10px] md:pl-[25%] rounded-xl bg-gray-200 dark:bg-gray-400/80 mt-[20px]'>
            <Doughnut
             data={{
              labels: ['Current Balance' ,'Income' , 'Expense'],
              datasets:[
                {
                  label:'Income',
                  data:[income-expense , income , expense],
                  backgroundColor:[
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(67, 160, 71 ,1)',
                    'rgba(220, 38, 38, 1)'
                  ]
                }
                
              ]
             }}
            />

          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className=' h-[90px] bg-gray-200 dark:bg-gray-400/80  mt-[10px] rounded-md p-[5px]'>
              <h1 className='text-md sm:text-lg font-semibold'>Total Income</h1>
              <h1  className='text-sm sm:text-md font-semibold text-green-600 dark:text-green-800'>ETB:{income}</h1>
            </div>
            <div className=' h-[90px] bg-gray-200 dark:bg-gray-400/80 mt-[10px] rounded-md p-[5px]'>
              <h1 className='text-md sm:text-lg font-semibold'>Total Expense</h1>
              <h1  className='text-sm sm:text-md font-semibold text-red-600 dark:text-red-800'>ETB:{expense}</h1>
            </div>
            <div className=' h-[90px] bg-gray-200 dark:bg-gray-400/80  mt-[10px] rounded-md p-[5px]'>
              <h1 className='text-md sm:text-lg font-semibold'>Current Balance</h1>
              <h1  className='text-sm sm:text-md font-semibold text-green-600 dark:text-green-800'>ETB:{
                income-expense
                }</h1>
            </div>
          </div>

        </div>
        <div className='lg:mt-[50px]'>
          <h1 className='text-3xl font-semibold dark:text-gray-400'>Recent History</h1>
          <div className='flex flex-col gap-2 w-full mt-[20px] '>

            {
              transac&&(
                transac.map(item=>{
                  return(
                    <div key={item.id} className='w-[95%] mx-auto h-[30px]  flex justify-between items-center rounded-sm bg-gray-200 dark:bg-gray-400 p-[20px]'>
                      <p className='capitalize'>{item.title}</p>
                      {
                        item.category==='expense'?(
                          <p className='text-red-600 dark:text-red-800'>ETB:-{item.amount}</p>
                        ):(
                          <p className='text-green-600 dark:text-green-800'>ETB:+{item.amount}</p>
                        )
                      }
                      
                      
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

export default Dashboard