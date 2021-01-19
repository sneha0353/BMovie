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

router.post("/add-movies",requireLogin,(req,res)=>{
    if(req.login.role == 1)
    {
        const {moviename,genre,target_aud,release_date,movie_logo}=req.body
        if(!moviename || !genre || !target_aud || !release_date || !movie_logo)
        {
            return res.status(422).json({error:"enter all the fields"})
        }
        const id = uuidv4()
        var vals=[[id,moviename,genre,target_aud,release_date,movie_logo]]
        con.query("insert into movies values ?",[vals],function(err,ress){
            if(err)throw err;
            return res.json({result:id})
        })
    }
    else{
        return res.status(404).json({error:"unauthorized"})
    }
})

router.get("/get-movies",requireLogin,(req,res)=>{
    const q = "select a.*,b.*,c.*,d.* from movieshow a,screen b,theatre c,movies d where a.screen_id=b.screen_id and b.tid=c.tid and d.movie_id=a.movie_id;";
    con.query(q,function(err,resu){
        if(err) throw err;
        return res.json({movie:resu})
    })
})

router.get("/get-allmovies",requireLogin,(req,res)=>{
    con.query("select * from movies",function(err,ree){
        if(err)throw err;
        res.json(ree)
    })
})

router.put("/edit-movies",requireLogin,(req,res)=>{
    const {moviename,genre,target_aud,release_date,movie_logo,movie_id}=req.body
        if(!moviename || !genre || !target_aud || !release_date || !movie_logo ||!movie_id)
        {
            return res.status(422).json({error:"enter all the fields"})
        }
       // var vals=[[moviename,genre,target_aud,release_date,movie_logo,movie_id]]
        con.query("update movies set moviename=?,genre=?,target_aud=?,release_date=?,movie_logo=? where movie_id=?",[moviename,genre,target_aud,release_date,movie_logo,movie_id],function(err,ree){
            if(err)throw err;
            res.json(ree)
        })
})

module.exports=router