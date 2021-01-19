import React, { useState } from "react";
import axios from "axios";
import mov from "./images/movie.jpg";
import {useHistory} from "react-router-dom";

import {
    Grid,
    Segment,
    Header,
    Form,
    Button,
    Image,
    Message} from "semantic-ui-react";

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const history = useHistory();

    const handleSubmit = () => {
        axios({
            url:"http://localhost:7000/api/signin",
            method:'post',
            headers:{
                "Content-Type":"application/json",
            },
            data:{
                email,
                password
            }
        }).then(res=>{
            if(res.err){
                console.log(res.err)
            }else{
               console.log(res.data)
                localStorage.setItem('token',res.data.token)
                localStorage.setItem("payload",JSON.stringify(res.data.payload))
                history.push('/register')
            }
        }).catch(err => {
            console.error(err)
        })
    }

    

    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='violet' textAlign='center'>
            <Image src={mov} /> Login to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' 
                iconPosition='left' 
                placeholder='E-mail address'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
    
              <Button color='violet' fluid size='large' onClick={()=>handleSubmit()}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            A new user? <a href='/signup'>Signup to continue!</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
}

export default Login;