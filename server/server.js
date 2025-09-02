require('dotenv').config()

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const path = require('path')

const transacRoutes = require('./routes/transacRoutes')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

app.use(cors({
    origin:['http://localhost:5173'],
    methods:["POST" , "GET" , "DELETE"],
    credentials:true,
}))

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'jwt'
})


app.get('/', (req , res)=>{
    res.send('from the backend')
})

app.use(transacRoutes)

app.post('/register' , (req , res)=>{
    const sql = "INSERT INTO `user`(`name`, `email`, `password`) VALUES (?)"
    const {name , email , password , conPass} = req.body

    if(password === conPass){
        const salt = 10
        bcrypt.hash(password.toString() , salt , (err , hash)=>{
            if(err) return res.json({error:'error in hashing pass'})
            const values = [name , email , hash]
            db.query(sql , [values] , (err , result)=>{
              if(err) return res.json(err)
              return res.json({Status:'success'})
            })

        })
        

        
    }else{
      return res.json({message:'password mismatch'})
    }


})
const verifyUser = (req , res , next)=>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , decoded)=>{
            if(err){
             res.redirect('/login')
            }else{
                req.id = decoded
                next()
            }
        })

    }else{
        res.redirect('/Login')
    }
}
app.get('/Home' , verifyUser , (req , res)=>{
    const sql = "SELECT id, email , name FROM `user` WHERE id =?"
   const id = req.id
   db.query(sql , [id] , (err , data)=>{
     if(err) return res.json({error:'error occured'})
     return res.json({Status:'success' , data})
   })

})
app.post('/login' , (req , res)=>{
    const sql = 'SELECT * FROM `user` WHERE email=?'

    db.query(sql , [req.body.email] , (err , data)=>{
        if(err) return res.json({error : 'login Error'})
        if(data.length>0){
         bcrypt.compare(req.body.password.toString() , data[0].password , (err , response)=>{
            if(err){ return res.json({error:'password compare err'})}
            if(response){
                 const id = data[0].id
                 const token = jwt.sign(id , process.env.ACCESS_TOKEN_SECRET)
                 res.cookie('token' , token)
                 return res.json({Status:'success'})
                }
            else{
                return res.json({error :'password incorrect'})
            }
         })

        }else{
            return res.json({error:'incorrect email/password'})
        }
        })

})
app.get('/logout' , (req , res)=>{
    res.clearCookie('token')
    res.json({Status:'success'})
})
app.get('/transacPaginate' ,async (req , res)=>{
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit)
   const id = parseInt(req.query.id)

   const startIndex= (page-1)*limit;
   const endIndex= page*limit
  const results ={}

   const sql =  `SELECT * FROM transactions WHERE user_id =${id} AND date >= CURDATE() - INTERVAL 30 DAY ORDER BY date DESC `
   db.query(sql , (err , data)=>{
        if(err){ return res.json(err)
        }else{

        results.totalData = data.length
        results.pageCount = Math.ceil(data.length/limit)

        if(endIndex<data.length){
            results.next={
            page:page+1,
            limit:limit
            }
        }
    if(startIndex>0){
    results.previous = {
            page:page-1,
            limit:limit
        }
    }

 results.result =  data.slice(startIndex , endIndex)
 return res.json(results)
}
    
   
 })

})



app.listen(3000 , ()=>{
    console.log('running on port:3000')
})