import React,{useState,useEffect} from "react"
import {Form,Segment,Button,Grid,Header,Image}from "semantic-ui-react"
import Navbar from "./navbar"
import mov from "./images/movie.jpg"
import {useHistory} from "react-router-dom"
import FooterV from "./footerV";
import axios from "axios"

const Register=()=>{
    const [firstname,setFirstName]=useState()
    const [lastname,setLastName]=useState()
    const [phone,setPhone]=useState()
    const [age,setAge]=useState()
    const history=useHistory()

    const [details,setDetails] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:7000/api/registered',{
        headers:{
          'Content-Type':"application/json",
          Authorization:localStorage.getItem('token')
        }
      }).then(res=>res.json())
      .then(resu=>{
        console.log(resu.result)
        setDetails(resu.result)
      })
      .catch(err=>{
        console.error(err)
      })
      
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        fetch("http://localhost:7000/api/register",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem("token")
            },
            body:JSON.stringify({
                firstname,
                lastname,
                phone,
                age
            })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        history.push("/home")
    })
    }

    return(
        <div>
        <Navbar/>
        {details && details.length>0 ? 
          <div className="container">
          <div className="card mt-4 p-2 bg-light shadow" style={{width:"100%",borderRadius:"20px"}}>
          <h4 className="text-center" style={{fontSize:"30px"}}><span style={{fontWeight:"bold"}} className="text-danger">{details[0].firstname} {details[0].lastname}</span>'s Details</h4>
          <div class="card-body">
            <h5 class="card-title"><span className="text-danger">User ID : </span>{details[0].user_id}</h5>
            <h5 class="card-title"><span className="text-danger">Name : </span>{details[0].firstname} {details[0].lastname}</h5>
            <h5 class="card-title"><span className="text-danger">Email : </span>{details[0].email}</h5>
            <h5 class="card-title"><span className="text-danger">Phone : </span>{details[0].phone}</h5>
            <h5 class="card-title"><span className="text-danger">Age : </span>{details[0].age} years</h5>
          </div>
        </div>
          </div>
          :
          <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
          <Image src={mov} /> Register Your Details!
          </Header>
          <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' 
              iconPosition='left' 
              placeholder='Firstname'
              value={firstname}
              required
              onChange={e=>setFirstName(e.target.value)}
              />
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Lastname'
              value={lastname}
              required
              onChange={e=>setLastName(e.target.value)}
            />
              <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Phone'
              value={phone}
              required
              onChange={e=>setPhone(e.target.value)}
              />
              <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Age'
              type="number"
              value={age}
              required
              onChange={e=>setAge(e.target.value)}
          />
  
            <Button color='google plus' fluid size='large' onClick={(e)=>handleSubmit(e)}>
              Add Screen
            </Button>
          </Segment>
        </Form>
        </Grid.Column>
        </Grid>
        }
        
      <FooterV/>
        </div>
       
    )
}

export default Register