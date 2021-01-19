const express=require("express")
const router=express.Router()
const mysql=require("mysql")
const { v4: uuidv4 } = require('uuid');
const {requireLogin}=require("../middleware/requireLogin")
const { body, validationResult, check } = require('express-validator');

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "sneha123",
    database: "movie"
})

con.connect(function(err){
    if(err){
        console.log(err)
    }
})

router.post("/add-payment",requireLogin,(req,res)=>{
    const {booking_id,card_no,cardholder,amount}=req.body
    if(!booking_id || !card_no ||!cardholder ||!amount)
    {
        return res.status(422).json({error:"enter all the fields"})
    }
    con.query("select user_id from user where lid=?;",[req.login.lid],function(err,ress){
        if(err)throw err;
        const v=uuidv4()
        vals=[[v,ress[0].user_id,card_no,cardholder,booking_id,amount]]
       con.query("insert into payment values ?",[vals],function(err,ress){
        if(err)throw err;
        return res.json(v)
    })
})
})


router.post("/get-payment",requireLogin,(req,res)=>{
    console.log(req.body.bookingId)
    if(!req.body.bookingId)
    {
        return res.status(404).json({error:"page not found"})
    }
    con.query("select b.*,a.movie_logo from book b,movies a where a.movie_id=(select movie_id from movieshow where show_id=(select show_id from book where booking_id=?)) and b.booking_id=?",[req.body.bookingId,req.body.bookingId],function(err,ress){
        if(err)throw err;
            res.json(ress[0])
        })
})

router.post("/get-details",requireLogin,(req,res)=>{
 if(!req.body.confirmed)
 {
     return res.status(404).json({error:"page not found"})
 }
 con.query("select booking_id,tickets,cost from book where booking_id=(select booking_id from payment where payment_id=?)",[req.body.confirmed],function(err,ress){
     if(err)throw err;
     return res.json(ress[0])
 })
})

module.exports=router