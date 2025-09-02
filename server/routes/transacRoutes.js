const express = require('express')
const mysql = require('mysql')

const multer = require('multer')
const cors = require('cors')
const path = require('path')

const router = express.Router()

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'jwt'
})

// multer setup to stores images in the disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , '../public/images'))
  },
  filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
   //  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   //  cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//start of adding , getting  and deleting transactions from the database

router.post('/addTransac' , upload.single('img') , (req , res)=>{
    const sql = "INSERT INTO `transactions`(`user_id`, `title`, `amount`, `date`, `desc`, `category`, `type` ,`receipt`) VALUES (?)"
    
    const values =[
        req.body.id,
        req.body.title,
        req.body.amount,
        req.body.date,
        req.body.desc,
        req.body.category,
        req.body.type,
        req.file.filename
    ]
    db.query(sql , [values] , (err , data)=>{
        if(err) return res.json(err)
        return res.json({Status:'success'})
    })
})

router.get('/addTransac/addExpense/:id' , (req , res)=>{
 const id = req.params.id
 const sql = `SELECT * FROM transactions WHERE category='expense' AND user_id=${id} ORDER BY date DESC LIMIT 4`
  
 db.query(sql , (err , data)=>{
    if(err) return res.json(err)
    res.json(data)
 })

})

router.get('/addTransac/totalIncome/:id' , (req , res)=>{
 const id = req.params.id
 const sql = `SELECT SUM(amount) as total FROM transactions WHERE category='income' AND user_id=${id}`
  
 db.query(sql , (err , data)=>{
    if(err) return res.json(err)
    res.json(data)
 })

})
router.get('/addTransac/totalExpense/:id' , (req , res)=>{
 const id = req.params.id
 const sql = `SELECT SUM(amount) as total FROM transactions WHERE category= 'expense' AND user_id=${id}`
  
 db.query(sql , (err , data)=>{
    if(err) return res.json(err)
    res.json(data)
 })

})

router.get('/addTransac/:id' , (req , res)=>{
 const id = req.params.id
 const sql = `SELECT * FROM transactions WHERE category= 'income' AND user_id=? AND date >= CURDATE() - INTERVAL 30 DAY ORDER BY date DESC LIMIT 4`
  
 db.query(sql , [id] , (err , data)=>{
    if(err) return res.json(err)
    res.json(data)
 })

})
router.delete('/addTransac/:id' , (req , res)=>{
 const id = req.params.id
 const sql = `DELETE FROM transactions WHERE tran_id=?`
 db.query(sql , [id] , (err , data)=>{
    if(err) return res.json(err)
    res.json({Status:'success'})
 })

})


router.get('/transac/:id' , (req , res)=>{
 const id = req.params.id
 const sql = `SELECT * FROM transactions WHERE user_id =${id} AND date >= CURDATE() - INTERVAL 30 DAY ORDER BY date DESC `

 db.query(sql , (err , data)=>{
    if(err) return res.json(err)
    res.json(data)
 })
})



module.exports= router

