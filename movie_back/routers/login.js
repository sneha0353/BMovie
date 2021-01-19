const express=require("express")
const router=express.Router()
const mysql=require("mysql")
const bcrypt=require("bcrypt")
const jsonwt=require("jsonwebtoken")
const crypto=require("crypto")
const { body, validationResult, check } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const key = require('../key');

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

router.post("/signup",[
    check("password","password should be atleast 3 characters").isLength({min:3})
],(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    if(!req.body.email || !req.body.password)
    {
        return res.status(422).json({error:"Enter all the fields"})
    }
    con.query("select email from login",function(err,ress){
        if(err) throw err;
        if(ress && (req.body.email==ress[0].email))
        {
            return res.status(422).json({error:"email already present!"})
     }else{
         var sql='insert into login values ?'
       bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
            if(err)throw err;
            var role=0
            var values=[[uuidv4(),req.body.email,hash,role]]
            con.query(sql,[values],function(err,result){
                if(err)throw err;
                res.json({result:result})
            })
        })
        })
     }
    })
})

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:1})
],(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({error:"fields are required"})
    }
    con.query("select * from login where email=?",[req.body.email],function(err,ress){
        if(ress.length==0)
        {
            return res.status(422).json({error:"Email And Password do not match!"})
        }
        else{
            const hash=ress[0].password
            bcrypt.compare(req.body.password,hash)
            .then(success=>{
                if(success)
                {
                    const payload={
                        email:ress[0].email,
                        lid:ress[0].lid,
                        role:ress[0].role
                    }
                    console.log(payload)
                    jsonwt.sign(
                        payload,
                        key.secret,
                        (err,token)=>{
                            if(err)throw err;
                            return res.json({
                                success:true,
                                token:'Bearer '+token,
                                payload:payload
                            })
                        }
                    )
                }
                else{
                    return res.status(422).json({error:"Email And Password do not match!"})
                }
            })
        }
    })
})

router.get("/signout",(req,res)=>{
    res.clearCookie("token")
    return res.json({
        message:"User signout successfully"
    })
})

module.exports=router;
