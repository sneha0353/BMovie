import React,{useEffect,useState} from "react"
import Navbar from "./navbar"
import FooterV from "./footerV";

const Deleted=()=>{
    
    const [datas,setDatas]=useState()
    useEffect(()=>{
        fetch("http://localhost:7000/api/deleted-booking",{
            method:"get",
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setDatas(data)
            console.log(data)
        })
        .catch(err=>console.log(err))
    },[])


    return(
        <div>
        <Navbar/>
        <h1 className="ml-3 mb-4">deleted details</h1>
        {datas && datas.map((item)=>(
                <div className="container border p-2 bg-light shadow" style={{borderRadius:"20px"}}>
                    <h5 style={{fontWeight:"bold"}} className="card-title"><span className="text-danger">Booking Id : </span>{item.booking_id}</h5>
                    <h5 style={{fontWeight:"bold"}} class="card-title"><span className="text-danger">User Id : </span>{item.user_id}</h5>
                    <h5 style={{fontWeight:"bold"}} class="card-title"><span className="text-danger">Tickets : {item.tickets}</span></h5>
                    <h5 style={{fontWeight:"bold"}} class="card-title"><span className="text-danger">Cost : {item.cost}</span></h5>
                    <h5 style={{fontWeight:"bold"}} class="card-title"><span className="text-danger">Show Id : {item.show_id}</span></h5>
                </div>
        ))}
            <FooterV />
        </div>
    )
      
}

export default Deleted