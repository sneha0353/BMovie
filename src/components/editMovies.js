import React from "react";
import { useState,useEffect } from "react";
import { Form,Button,Segment,Grid } from "semantic-ui-react";
import Navbar from "./navbar"

const EditMovie = () => {
    const [moviename,setMoviename] = useState();
    const [genre,setGenre] = useState();
    const [target_aud,setTarget_aud] = useState();
    const [release_date,setRelease_date] = useState();
    const [movie_logo,setMovie_logo] = useState();

    useEffect(()=>{
        setMoviename(JSON.parse(localStorage.getItem("item")).moviename)
        setGenre(JSON.parse(localStorage.getItem("item")).genre)
        setTarget_aud(JSON.parse(localStorage.getItem("item")).target_aud)
        setRelease_date(JSON.parse(localStorage.getItem("item")).release_date.slice(0,10))
        setMovie_logo(JSON.parse(localStorage.getItem("item")).movie_logo)
    },[])

    const handleSubmit = () => {
        fetch("http://localhost:7000/api/edit-movies",{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem('token')
            },
            body:JSON.stringify({
                movie_id:JSON.parse(localStorage.getItem("item")).movie_id,
                moviename,
                genre,
                target_aud,
                release_date,
                movie_logo
            })
        }).then(res=>res.json())
        .then(resu=>{
            localStorage.setItem('movie',resu.result)
            window.location.reload(true);
        })
     }
     return(
         <div>
         <Navbar/>
     <Form size='large'>
     <Segment stacked>
        
       <Form.Input fluid icon='user' 
         iconPosition='left' 
         placeholder='Movie Name'
         value={moviename  ? moviename : ""}
         required
         onChange={e=>setMoviename(e.target.value)}
         />
       
       <Form.Input
         fluid
         icon='lock'
         iconPosition='left'
         placeholder='Genre'
         type='text'
         value={genre ? genre : ""}
         required
         onChange={e=>setGenre(e.target.value)}
       />
       <Form.Input
         fluid
         icon='lock'
         iconPosition='left'
         placeholder='Target Audience'
         type='number'
         value={target_aud ? target_aud : ""}
         required
         onChange={e=>setTarget_aud(e.target.value)}
       />
       <Form.Input
         fluid
         icon='lock'
         iconPosition='left'
         placeholder='Release Date'
         type='date'
         value={release_date ? release_date : ""}
         required
         onChange={e=>setRelease_date(e.target.value)}
       />
       <Form.Input
         fluid
         icon='lock'
         iconPosition='left'
         placeholder='Movie Logo (Enter the URL)'
         type='text'
         required
         value={movie_logo ? movie_logo : ""}
         onChange={e=>setMovie_logo(e.target.value)}
       />
       <Button color='google plus' fluid size='large' onClick={()=>handleSubmit()}>
         Add Movie
       </Button>
     </Segment>
   </Form>
   </div>
     )}

     export default EditMovie