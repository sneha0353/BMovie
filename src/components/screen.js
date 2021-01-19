import React,{useState} from "react";
import {Form,Segment,Button} from "semantic-ui-react";
import Navbar from "./navbar"

const Screen = ({item}) => {
    const [screen_no,setScreen_No] = useState();
    const [no_seats,setNo_Seats] = useState();

    console.log("iem",item)

    const handleSubmit = () => {
        fetch("http://localhost:7000/api/add-screen",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            Authorization:localStorage.getItem('token')
        },
        body:JSON.stringify({
            screen_no,
            no_seats,
            tid:localStorage.getItem("theatre")
        })
    }).then(res=>res.json())
    .then(resu=>{
        console.log(resu)
        localStorage.setItem("screen",resu.result)
        localStorage.setItem(`screen${item}`,`screen${item}`)
        window.location.reload(true);
    }).catch(err=>console.error(err))
    }
    
    return(
        <div>
            <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' 
                iconPosition='left' 
                placeholder='Screen Number'
                value={screen_no}
                type="number"
                onChange={e=>setScreen_No(e.target.value)}
                />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='No of Seat/s'
                type='number'
                value={no_seats}
                onChange={e=>setNo_Seats(e.target.value)}
              />
    
              <Button color='google plus' fluid size='large' onClick={()=>handleSubmit()}>
                Add Screen
              </Button>
            </Segment>
          </Form>
        </div>
    )
}

export default Screen;