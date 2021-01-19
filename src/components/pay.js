import React,{useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import {Form,Segment,Button,Grid,Header} from "semantic-ui-react"
import Navbar from "./navbar"
const Pay=()=>{

    const [card_no,setCard_No]=useState()
    const [cardholder,setCardholder]=useState()
    const history=useHistory()

    const payment=()=>{
        console.log("SDSDs")
        fetch("http://localhost:7000/api/add-payment",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem("token")
            },
            body:JSON.stringify({
                booking_id:JSON.parse(localStorage.getItem("booking")),
                card_no,
                cardholder,
                amount:JSON.parse(localStorage.getItem("datas"))
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            localStorage.setItem("confirmed",JSON.stringify(data))
            history.push("/payment-confirmed")
        })
        .catch(err=>console.log(err))
    }

    //check for 16 digits in card number

    return(
        <div>
        <Navbar/>
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>Payment Portal</Header>
            <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' 
                iconPosition='left' 
                placeholder='Enter Card Number'
                minLength="10"
                maxLength="10"
                value={card_no}
                type="number"
                onChange={e=>setCard_No(e.target.value)}
                
                />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Enter name of cardholder'
                type='text'
                value={cardholder}
                onChange={e=>setCardholder(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Amount to be paid'
                type='number'
                value={localStorage.getItem("datas") ? localStorage.getItem("datas") : ""}
              />
    
              <Button color='google plus' fluid size='large' onClick={()=>payment()}>
                Add Payment
              </Button>
            </Segment>
          </Form>
          </Grid.Column>
          </Grid>
        </div>
    )
}

export default Pay;