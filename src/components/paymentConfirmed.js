import React,{useEffect,useState} from "react"
import QRCode from "react-qr-code";
import Navbar from "./navbar";
import FooterV from "./footerV";

const PaymentConfirmed=()=>{

    const [datas1,setDatas1]=useState()

    useEffect(() => {
       fetch("http://localhost:7000/api/get-details",{
           method:"post",
           headers:{
               "Content-Type":"application/json",
               Authorization:localStorage.getItem("token")
           },
           body:JSON.stringify({
               confirmed:JSON.parse(localStorage.getItem("confirmed"))
           })
       })
       .then(res=>res.json())
       .then(data=>{
           console.log(data)
          setDatas1(data)
        })
       .catch(err=>console.log(err))
    }, [])
    return(
        <div>
        <Navbar/>
        <div class="container mt-4 border bg-light shadow text-center" style={{borderRadius:"20px",height:"520px"}}>
        <h5 className="text-info card-title display-4">Payment Details</h5>
        <h4 style={{fontWeight:"bold"}}><span className="text-danger" >Booking Id : </span>{datas1 ? datas1.booking_id : ""}</h4>
        <h4 style={{fontWeight:"bold"}}><span className="text-danger">Total Tickets : </span>{datas1 ? datas1.tickets : ""}</h4>
        <h4 style={{fontWeight:"bold"}}><span className="text-danger mb-4">Total Cost including GST(15%) on Total : </span>{datas1 ? datas1.cost : ""}</h4>
        <hr />
        {datas1 ? 
            <QRCode value={datas1 ? datas1.booking_id+"-"+datas1.tickets+"-"+datas1.cost : null} />
            :
            null
        }
        
        </div>
        <FooterV />
      </div>
    )
}

export default PaymentConfirmed