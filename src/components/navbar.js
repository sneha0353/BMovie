import React from "react";
import {
  Menu, Sticky, Image
} from "semantic-ui-react";
import {Link,useHistory} from "react-router-dom";
import mov from "./images/movie.jpg"

const NavBar = () => {

  const history=useHistory()

  const handleLogout=()=>{
     localStorage.clear()
     fetch("http://localhost:7000/api/signout",{
       method:"get"
     })
     .then(res=>res.json())
     .then(data=>{
       console.log(data)
       history.push("/signup")
      })
     .catch(err=>console.log(err))
  }
  return(
  <div>
    <Sticky>
      <Menu inverted style={{ margin: 0 }}>
      <Menu.Item><Link to="/home"><Image src={mov} style={{height:'25px'}} />BMOVIE</Link></Menu.Item>
      <Menu.Item><Link to="/home">Home</Link></Menu.Item>
      {JSON.parse(localStorage.getItem("payload")).role === 1 ? 
       <>
       <Menu.Item><Link to="/addmovie">Add Movie</Link></Menu.Item>
       <Menu.Item><Link to="/form">Add Place Details</Link></Menu.Item>  
       <Menu.Item><Link to="/showmovies">Show Movies List</Link></Menu.Item>  
       <Menu.Item><Link to="/deleted">Deleted Bookings List</Link></Menu.Item>  
       </>
     :
     <div></div>
    }
        <Menu.Item><Link to="/register">Register</Link></Menu.Item>
        <Menu.Item position='right' onClick={()=>handleLogout()}>Logout</Menu.Item>
      </Menu>
    </Sticky>
  </div>
)}

export default NavBar;