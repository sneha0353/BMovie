import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import axios from "axios";
import {useHistory,Link} from "react-router-dom"
import Footer from "./footerV";

const Homepage = () => {
    const history=useHistory()
    const [movies,setMovies] = useState()


    const Book=item=>{
        console.log(item)
        history.push('/booking',{item:item})
      
    }

    useEffect(()=>{
        axios({
            url:"http://localhost:7000/api/get-movies",
            method:"get",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>{
            console.log(res)
            setMovies(res.data.movie)
        })
        .catch(err=>console.error(err))
    },[])
    
    return(
        <div>
            <Navbar />
            <h2 style={{fontWeight:"bold"}} className="display-4 mt-2 mb-2 text-dark text-center">Book Your Tickets!</h2>
            <div className="row">
            {movies && movies.map((item) => {
                return(
                    <div className='col-4'>
                    <div class="card mb-2 mt-2 bg-light shadow" style={{width: "100%",height:"450px",borderRadius:"20px"}}>
                        <div className="text-center">
                        {item.movie_logo &&  <h2><img className="text-center" style={{height:'220px',width:"100%",borderRadius:"20px"}} class="card-img-top" src={item.movie_logo} alt="Card image cap" /></h2>}
                        </div>
                        <div class="card-body">
                            <div className="border p-2 shadow" style={{borderRadius:'20px',backgroundColor:"white"}}>
                            <h5 class="card-title">Movie : {item.moviename}</h5>
                            <h5 class="card-title">Genre : {item.genre}</h5>
                            <h5 class="card-title">Release Date : {item.release_date.slice(0,10).split("-").reverse().join('-')}</h5>
                            <h5 class="card-title">Target Audience : {item.target_aud}</h5>
                            </div>
                            <div className="border p-2 mt-4 shadow" style={{borderRadius:'20px',backgroundColor:'white'}}>
                            <h3>Place Details</h3>
                            <h5 class="card-title">Theatre Name :{item.name_theatre}</h5>
                            <h5 class="card-title">Theatre Area :{item.area_theatre}</h5>
                            <h5 class="card-title">Screen Number :{item.screen_no}</h5>
                            </div>
                            <button className="mt-3 btn btn-outline-primary" onClick={()=>Book(item)}><Link to="/booking">Book Tickets!</Link></button>
                        </div> 
                    </div>
                </div>
                )
            })}
            <Footer />
            </div>
            
        </div>
    )
}

export default Homepage;