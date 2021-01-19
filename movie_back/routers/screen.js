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
router.post("/add-screen",requireLogin,(req,res)=>{
    if(req.login.role==1)
    {
        const {screen_no,tid,no_seats}=req.body
        if(!tid || !no_seats ||!screen_no)
        {
            return res.status(422).json({err:"enter all the fields"})
        }
        const id = uuidv4()
        var vals=[[id,tid,no_seats,screen_no]]
        con.query("insert into screen values ?",[vals],function(err,ress){
            if(err)throw err;
            res.json({result:id})
        })
    }
})
module.exports=router
