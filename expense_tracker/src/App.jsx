import Login from "./pages/Login"
import Signup from './pages/Register' 
import Home from './pages/dashboard/Home'
import Transac from "./pages/dashboard/Transac"
import Dashboard from "./pages/dashboard/dashboard"
import Income from "./pages/dashboard/Income"
import Expense from "./pages/dashboard/Expense"
import {BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/Home"  element={<Home/>}> 
            <Route index element={<Dashboard/>}/>
            <Route path="transac" element={<Transac/>}/>
            <Route path="income" element={<Income/>}/>
            <Route path="expense" element={<Expense/>}/>
          </Route>

     </Routes>
    
    </BrowserRouter>
   
  
  )
}

export default App
