import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar';
import Theatre from "./theatre";
import Screen from "./screen";
import AddMovieShow from "./addmovieshow";
import {ProgressBar} from "react-bootstrap";
import FooterV from "./footerV";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  var arr = [];
  for(var i=0;i<localStorage.getItem("no_of_screen");i++){
    arr.push(i)
  }
  console.log(arr)
  return (
      <div>
      <NavBar />
      {localStorage.getItem('movie') && !localStorage.getItem('theatre') ? 
      <ProgressBar striped animated className="mb-2" variant='success' now={25} />
      :
        <div></div>
    }
    {localStorage.getItem('theatre') && !localStorage.getItem('screen') ? 
    <ProgressBar striped animated className="mb-2" variant="success" now={50} /> 
    :
    <div></div>
    }
    {localStorage.getItem('screen') ? 
    <ProgressBar striped animated className="mb-2" variant="success" now={75} /> 
    :
    <div></div>
    }
      
    <div className={classes.root}>

    {localStorage.getItem("theatre") ? 
    <Accordion disabled>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className={classes.heading}><h2>Add Theatre</h2></Typography>
    </AccordionSummary>
        <Theatre />
  </Accordion>
    :
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
    >
      <Typography className={classes.heading}><h2>Add Theatre</h2></Typography>
    </AccordionSummary>
        <Theatre />
  </Accordion>
}

{localStorage.getItem("no_of_screen") && arr ? 
arr.map(item=>{
    return(
        localStorage.getItem(`screen${item}`) && localStorage.getItem(`movie${item}`)?
        <Accordion disabled>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        >
    <Typography className={classes.heading}><h2>Add Screen</h2></Typography>
    </AccordionSummary>
    <Screen />
    </Accordion>
    :
    <Accordion key={item}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        >
    <Typography className={classes.heading}><h2>Add Screen</h2></Typography>
    </AccordionSummary>
    <Screen item={item}/>
    <AddMovieShow item={item} />
    </Accordion>
    )
})
:
<div></div>
}
    </div>
    <FooterV />
    </div>
  );
}
