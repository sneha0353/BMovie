const express=require("express")
const mysql=require("mysql")
const bodyParser=require("body-parser")
const cors=require("cors")
const app=express()

const  PORT=7000


const loginRoutes=require("./routers/login")
const registerRoutes=require("./routers/register")
const bookingRoutes=require("./routers/booking")
const theatreRoutes=require("./routers/theatre")
const screenRoutes=require("./routers/screen")
const movieRoutes=require("./routers/movie")
const paymentRoutes=require("./routers/payment")
const movieShow = require("./routers/movieshow")

app.get("/",(req,res)=>{
    res.send("server running")
})

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sneha123",
    database:"movie"
})

con.connect(function(err){
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("connected to db!")
    }
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use("/api",loginRoutes)
app.use("/api",registerRoutes)
app.use("/api",bookingRoutes)
app.use("/api",theatreRoutes)
app.use("/api",screenRoutes)
app.use("/api",movieRoutes)
app.use("/api",paymentRoutes)
app.use("/api",movieShow)

app.listen(PORT,()=>{
    console.log(`app runs on port ${PORT}`)
})