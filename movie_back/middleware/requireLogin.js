const jwt = require('jsonwebtoken')
const {secret} = require('../key')
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",  
    user: "root",  
    password: "sneha123",
    database: "movie"
})

exports.requireLogin=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization)
    {
        res.status(404).json({message:"You need to login first"})
    }
    const token=authorization.replace('Bearer ',"")
    jwt.verify(token,secret,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({error:'U must be logged in!'})
        }
        const {email}=payload
        con.query("select * from login where email=?",[email],function(err,ress){
            if(err)throw err;
            req.login=ress[0]
            next();
        })
    })
}
