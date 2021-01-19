import React,{useState,useEffect} from "react";
import {Form,Segment,Button,Dropdown} from "semantic-ui-react";
import {useLocation,useHistory} from "react-router-dom";
import Navbar from "./navbar"

const Booking = () => {
    const location=useLocation()
    const [tickets,setTickets] = useState();
    const [show_id,setShow_id] = useState();
    const [seatsRem,setSeatsRem]=useState()
    const [datas,setDatas]=useState()
    const history=useHistory()

    useEffect(() => {
        fetch("http://localhost:7000/api/get-onemovieshow",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem("token")
            },
            body: JSON.stringify({
                movie_id:location.state.item.movie_id 
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setDatas(data)
        })
    }, [])

    var arr=[]
    if(datas)
    {
      for(var i=0;i<datas.length;i++)
      {
        var b={key:"",text:"",value:""}
            b.key=datas[i].show_id
            b.text=datas[i].show_id+":--"+datas[i].dateshow.slice(0,10).split("-").reverse().join("-")+" "+datas[i].showtime
            b.value=datas[i].show_id+"-"+datas[i].dateshow.slice(0,10).split("-").reverse().join("-")+" "+datas[i].showtime
            arr.push(b);
      }
    }

    const MovieDate=(e)=>{
      setShow_id(e.target.innerText)
      datas.map(item=>{
        if(item.show_id == e.target.innerText.slice(0,36))
        {
          setSeatsRem(item)
        }
     })
    }

    const handleSubmit = () => {
        var cost=0
        console.log(tickets,seatsRem.class_cost)
        if(tickets > seatsRem.seats_rem)
        {
          console.log("insufficient values")
        }
        else{
          cost=seatsRem.class_cost*tickets
          cost=cost+(0.15)*cost
          console.log(cost)
        fetch("http://localhost:7000/api/booking",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:localStorage.getItem('token')
            },
            body:JSON.stringify({
                tickets,
                cost,
                show_id:show_id.slice(0,36)
            })
        })
        .then(res=>res.json())
        .then(data=>{
          localStorage.setItem("booking",JSON.stringify(data))
          history.push("/payment")
        })
        .catch(err=>console.log(err))
      }
    }

    return(
        <div>
        <Navbar/>
            <h2 className="m-2">Book Your Ticket</h2>
            <Form size='large'>
            <Segment stacked>

            {arr.length >0 ?
                
              <Dropdown
              placeholder='Select Date and Time'
              fluid
              selection
              options={arr}
              className="mb-2"
              onChange={(e)=>MovieDate(e)}
              />

              :
              <div></div>
            }

              <Form.Input fluid icon='user' 
                iconPosition='left' 
                placeholder='No of Tickets'
                value={tickets}
                type="number"
                onChange={e=>setTickets(e.target.value)}
                />

                {show_id ?
                  <div>
                <h5>Price</h5>
                  <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Cost'
                  type='number'
                  value={seatsRem ? seatsRem.class_cost : ""}
                />
                </div>
               :
                <div></div>  
                }
              

              {show_id ? 
                <div>
                <h5>Seats Remaining</h5>
                <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Seats Remaining'
                className="mb-2"
                type='number'
                value={seatsRem ? seatsRem.seats_rem : ""}
              />
              </div>
              :
              <div></div>
              }
            
              <Button color='google plus' fluid size='large' onClick={()=>handleSubmit()}>
                Book Ticket
              </Button>
            </Segment>
          </Form>
        </div>
    )
}

export default Booking;