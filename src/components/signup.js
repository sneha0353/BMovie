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

const Signup = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const history = useHistory();

    const handleSubmit = () => {
        axios({
            url:"http://localhost:7000/api/signup",
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
                history.push('/login')
            }
        }).catch(err => {
            console.error(err)
        })
    }

    
    return(
        <Grid id="gg" textAlign='center' style={{ height: '100vh'}} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={mov} /> SignUp to your account
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
    
              <Button color='teal' fluid size='large' onClick={()=>handleSubmit()}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <a href='/login'>Login!</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
}

export default Signup;