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


router.post("/delete-booking",requireLogin,(req,res)=>{
  const {show_id,tickets,booking_id}=req.body
  if(!show_id ||!tickets ||!booking_id)
  {
      return res.status(404).json({error:"not found"})
  }
  const q = 'select seats_rem from movieshow where show_id=?'
  let rem=0;
  con.query(q,show_id,function(err,resul){
    if(err) throw err;
    rem = resul[0].seats_rem + tickets;
    var q1 = "update movieshow set seats_rem=? where show_id=?";
    con.query(q1,[rem,show_id],function(err,results){
       if(err) throw err;
    con.query("delete from book where booking_id=?",[booking_id],function(err,ress){
        if(err)throw err;
       return res.json(ress)
       })
       //return res.json(results);
    })
})
})


router.post("/booking",requireLogin,(req,res)=>{
    const {tickets,cost,show_id}=req.body
    if(!tickets || !cost ||!show_id)
    {
        return res.status(422).json({error:"enter the reqd fields"})
    }
    con.query("select user_id from user where lid=?;",[req.login.lid],function(err,ress){
        if(err)throw err;
        const id = uuidv4()
        var vals=[[id,ress[0].user_id,tickets,cost,show_id]]
        con.query("insert into book values ?",[vals],function(err,result){
            if(err)throw err;
            const q = 'select seats_rem from movieshow where show_id=?'
            let rem = 0
            con.query(q,show_id,function(err,resul){
                if(err) throw err;
                rem = resul[0].seats_rem - tickets;
                if(rem >= 0)
                {
                var q1 = "update movieshow set seats_rem=? where show_id=?";
             con.query(q1,[rem,show_id],function(err,results){
                if(err) throw err;
                return res.json(id);
                })
            }
            else{
                return res.json({error:"insufficient seats"})
            }
            })
        })
    })
})

router.get("/deleted-booking",requireLogin,(req,res)=>{
    con.query("select * from delete_booking",function(err,ress){
        if(err)throw err
        res.json(ress)
    })
})

module.exports=router