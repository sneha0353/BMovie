const express=require("express")
const router=express.Router()
const mysql=require("mysql")
const jsonwt=require("jsonwebtoken")
const { body, validationResult, check } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const {requireLogin}=require("../middleware/requireLogin")

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

router.post("/register",requireLogin,[
    check("phone","phone should be of 10 digits").isLength({min:10,max:10})
],(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({error:errors.array()[0].msg})
    }
    const {firstname,lastname,age,phone}=req.body
    if(!firstname || !lastname || !age || !phone)
    {
        return res.status(422).json({error:"enter the required fields"})
    }
    vals=[[uuidv4(),firstname,lastname,req.login.email,age,phone,req.login.lid]]
    con.query("insert into user values ?",[vals],function(err,ress){
        if(err)throw err;
        res.json({result:ress})
    })
})

router.get("/registered",requireLogin,(req,res)=>{
    const q = "select * from user where lid=?"
    con.query(q,[req.login.lid],function(err,resu){
        if(err) throw err;
        return res.json({result:resu})
    })
})

module.exports=router