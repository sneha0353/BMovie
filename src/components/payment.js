import {React,useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
const Payment=()=>{

    const [datas,setDatas]=useState()
    const history=useHistory()
     //img src is not placed

     const handlePayment=()=>{
        history.push("/pay-payment")
        localStorage.setItem("datas",JSON.stringify(datas.cost))
     }

     const deletePayment=()=>{
         fetch("http://localhost:7000/api/delete-booking",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 Authorization:localStorage.getItem("token")
             },
             body:JSON.stringify({
                 show_id:datas.show_id,
                 tickets:datas.tickets,
                 booking_id:datas.booking_id
             })
         })
         .then(res=>res.json())
         .then(data=>{
             console.log(data)
             history.push("/home")
         })
         .catch(err=>console.log(err))
     }

    useEffect(()=>{
        fetch("http://localhost:7000/api/get-payment",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem("token")
            },
            body:JSON.stringify({
                bookingId:JSON.parse(localStorage.getItem("booking"))
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setDatas(data)
            console.log(data,"SDSF")
        })
        .catch(err=>console.log(err))
    },[])
   return(
       <div>
       <Navbar/>
    <div class="container borde shadow bg-light mt-3" style={{borderRadius:"20px",width: "100%"}}>
    <img src="DS" class="card-img-top" alt="jdcksd"/>
    <div class="card-body">
      <h4 class="card-title text-info">Booking Details</h4>
      <p class="card-text text-secondary">Proceed To Pay for Confirmation</p>
      <h5><span className="text-danger">Booking Id : </span>{datas ? datas.booking_id : ""}</h5>
      <h5><span className="text-danger">Show Id :</span> {datas ? datas.show_id : ""}</h5>
      <h5><span className="text-danger">Total Tickets : </span>{datas ? datas.tickets : ""}</h5>
      <h5><span className="text-danger">Total Cost including GST(15%) on Total : </span>Rs. {datas ? datas.cost : ""}</h5>
      <button className="btn btn-success mr-2 mt-2" onClick={()=>handlePayment()}>Proceed To Payment</button>
      <button className="btn btn-danger mt-2" onClick={()=>deletePayment()}>Cancel</button>
    </div>
  </div>
  </div>
   )
}

export default Payment