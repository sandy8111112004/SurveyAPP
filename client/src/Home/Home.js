import React, { Component } from 'react';
import * as $ from 'axios';
import './Home.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Grid from 'react-css-grid';


const LinkContent =(props) =>(
    <span>
    <Link id='link-style' to={`/survey/edit/${props.id}`}>  {props.title} </Link>     
    </span>
)
  
const SurveyEntryBox=(props)=>(
    <div className="survey-entry-box">
    <div className='box'>
        {<LinkContent id={props.id} title={props.title}/>}
        </div>
        <div className='box'>
        <button onClick={()=>props.deleteHandler(props.id)}>Delete</button>
        </div>
    </div>
)



const Home = (props) =>(
    <div>
      <nav>
      <Link to={'/'}>Home    |</Link>  
        <Link to={'/survey/create'}>    New Survey     |</Link>
      </nav>
      Home page
      <Grid>
        {props.surveyList? props.surveyList.map((e,i)=><SurveyEntryBox deleteHandler={props.handleDelete} id={e._id} title={e.title} key={i} />): 'Loading'}
      </Grid>
    </div>
)

  export default Home;





