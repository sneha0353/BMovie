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

router.post("/add-movieshow",requireLogin,(req,res)=>{
  if(req.login.role == 1)
  {
      const {screen_id,showtime,dateshow,class_cost,seats_rem,movie_id}=req.body
      if(!screen_id || !showtime ||!dateshow ||!class_cost ||!seats_rem ||!movie_id)
      {
          return res.status(422).json({error:"enter all the fields"})
      }
      var vals=[[uuidv4(),screen_id,showtime,dateshow,class_cost,seats_rem,movie_id]]
      con.query("insert into movieshow values ?",[vals],function(err,ress){
          if(err)throw err;
          res.json({result:ress})
      })
  }
  else{
      return res.status(404).json({error:"unauthorized"})
  }
})

router.get('/get-movieshow',requireLogin,(req,res)=>{
    con.query('select * from movieshow',function(err,ress){
        if(err) throw err;
        return res.json(ress);
    })
})


router.post("/get-onemovieshow",requireLogin,(req,res)=>{
    con.query("select * from movieshow where movie_id=?",[req.body.movie_id],function(err,ress){
        if(err)throw err;
        res.json(ress)
    })
})
module.exports=router