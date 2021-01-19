import React,{useState,useEffect} from "react"
import Navbar from "./navbar"
import {useHistory} from "react-router-dom";
import FooterV from "./footerV";

const ShowMovies=()=>{
    const [datas,setDatas]=useState()
    const history=useHistory()

    useEffect(()=>{
     fetch("http://localhost:7000/api/get-allmovies",{
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

    const handleClick=item=>{
       localStorage.setItem("item",JSON.stringify(item))
       history.push("/edit-movies")
    }

    return(
        <div>
        <Navbar/>
        <table className="table table-striped mt-2">
  <thead>
    <tr>
      <th scope="col">MovieName</th>
      <th scope="col">Genre</th>
      <th scope="col">Target Audience</th>
      <th scope="col">Release Date</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
  {datas && datas.map(item=>(
      <tr>
      <td>{item.moviename}</td>
      <td>{item.genre}</td>
      <td>{item.target_aud}</td>
      <td>{item.release_date.slice(0,10).split('-').reverse().join('-')}</td>
      <td><button className="btn btn-outline-warning btn-sm" onClick={()=>handleClick(item)}>Edit!</button></td>
      </tr>
  ))}

  </tbody>
</table>
    <FooterV />
        </div>
    )
}

export default ShowMovies