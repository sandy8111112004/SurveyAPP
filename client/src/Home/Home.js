import React, { Component } from 'react';
import * as $ from 'axios';
import './Home.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Grid from 'react-css-grid';


const LinkContent =(props) =>(
    <span>
    <Link to={`/survey/edit/${props.id}`}>  {props.title} </Link>     
    </span>
)
  
const SurveyEntryBox=(props)=>(
    <div className="survey-entry-box">
        {<LinkContent id={props.id} title={props.title}/>}
        <button onClick={()=>props.deleteHandler(props.id)}>Delete</button>
    </div>
)



const Home = (props) =>(
    <div>
      <nav>
      <Link to={'/'}>Home    |</Link>  
      {/* {props.surveyList? props.surveyList.map((e,i)=><LinkContent id={e._id} title={e.title} key={i}/>): 'Loading'} */}
        <Link to={'/survey/create'}>    New Survey     |</Link>
      </nav>
      Home page
      <Grid>
        {props.surveyList? props.surveyList.map((e,i)=><SurveyEntryBox deleteHandler={props.handleDelete} id={e._id} title={e.title} key={i} />): 'Loading'}
      </Grid>
    </div>
)

  export default Home;





