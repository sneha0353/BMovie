const express=require("express")
const router=express.Router()
const mysql=require("mysql")
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

router.post("/add-theatre",requireLogin,(req,res)=>{
    if(req.login.role == 1)
    {
        const {name_theatre,no_screen,area_theatre}=req.body
        if(!name_theatre || !no_screen || !area_theatre)
        {
            return res.status(422).json({error:"enter all the fields"})
        }
        const id = uuidv4()
        var vals=[[id,name_theatre,no_screen,area_theatre]]
        con.query("insert into theatre values ?",[vals],function(err,ress){
            if(err)throw err;
            return res.json({result:id})
        })
    }
})
module.exports=router;
