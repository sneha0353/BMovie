import React,{useState,useEffect} from "react";
import {Form,Segment,Button,Dropdown} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar"

const AddMovieShow = ({item}) => {
    const [dateShow,setDateShow] = useState();
    const [class_cost,setClass_cost] = useState();
    const [seats_rem,setSeats_rem] = useState();
    const [showtime,setShowtime] = useState();
    const [movies,setMovies] = useState();

    const[movie,setMovie] = useState();

    useEffect(()=>{
      axios({
          url:"http://localhost:7000/api/get-movies",
          method:"get",
          headers:{
              "Content-Type":"application/json",
              Authorization:localStorage.getItem('token')
          }
      }).then(res=>{
          setMovies(res.data.movie)
          console.log(res.data.movie)
      })
      .catch(err=>console.error(err))
  },[])

  var arr = [];
  if(movies){
          for(var i=0;i<movies.length;i++){
            var b={key:"",text:"",value:""}
            b.key=movies[i].moviename
            b.text=movies[i].moviename
            b.value=movies[i].movie_id
            arr.push(b);
          }
  }
    const history = useHistory()

    const handleSubmit = (e) => {
       e.preventDefault()
      const mov_id = movies.filter(item => item.moviename===movie);
        fetch("http://localhost:7000/api/add-movieshow",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            Authorization:localStorage.getItem('token')
        },
        body:JSON.stringify({
            screen_id:localStorage.getItem('screen'),
            showtime:showtime,
            dateshow:dateShow,
            class_cost:class_cost,
            seats_rem:seats_rem,
            movie_id:mov_id[0].movie_id
        }) 
    }).then(res=>res.json())
    .then(resu=>{
        console.log(resu)
        localStorage.setItem(`movie${item}`,`movie${item}`)
        window.location.reload(true);

    }).catch(err=>console.error(err))
    }

    
    return(
        <div>
        <h3 className='ml-3 mt-2'>Show Details</h3>
            <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' 
                iconPosition='left' 
                placeholder='Screen ID'
                value={localStorage.getItem('screen')}
            />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Show Time'
                type='time'
                value={showtime}
                onChange={e=>setShowtime(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Date of Show'
                type='date'
                value={dateShow}
                onChange={e=>setDateShow(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Cost of Show'
                type='int'
                value={class_cost}
                onChange={e=>setClass_cost(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Seats Remaining'
                type='int'
                value={seats_rem}
                onChange={e=>setSeats_rem(e.target.value)}
              />
              {movies ? 
                <Dropdown
                placeholder='Select Friend'
                fluid
                selection
                options={arr}
                onChange={e=>setMovie(e.target.innerText)}
                />
                :
              <div></div>
              }
              
              
              <Button color='google plus' fluid size='large' onClick={(e)=>handleSubmit(e)}>
                Add Show
              </Button>
            </Segment>
          </Form>
        </div>
    )
}

export default AddMovieShow;