import React,{useState} from "react";
import {Form,Segment,Button} from "semantic-ui-react";
import Navbar from "./navbar"

const Theatre = () => {
    const [name_theatre,setName_Theatre] = useState();
    const [no_screen,setNo_Screen] = useState();
    const [area_theatre,setArea_Theatre] = useState();

    const handleSubmit = () => {
        fetch("http://localhost:7000/api/add-theatre",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            Authorization:localStorage.getItem('token')
        },
        body:JSON.stringify({
            name_theatre,
            no_screen,
            area_theatre
        })
    }).then(res=>res.json())
    .then(resu=>{
        console.log(resu)
        localStorage.setItem("theatre",resu.result)
        localStorage.setItem("no_of_screen",no_screen)
        window.location.reload(true);
    }).catch(err=>console.error(err))
    }
    
    return(
        <div>
        <Navbar/>
            <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' 
                iconPosition='left' 
                placeholder='Name of Theatre'
                value={name_theatre}
                onChange={e=>setName_Theatre(e.target.value)}
                />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='No of Screen/s'
                type='number'
                value={no_screen}
                onChange={e=>setNo_Screen(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Area of Theatre'
                type='text'
                value={area_theatre}
                onChange={e=>setArea_Theatre(e.target.value)}
              />
              <Button color='google plus' fluid size='large' onClick={()=>handleSubmit()}>
                Add Theatre
              </Button>
            </Segment>
          </Form>
        </div>
    )
}

export default Theatre;