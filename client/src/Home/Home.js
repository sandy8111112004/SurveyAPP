import React, { Component } from 'react';
import * as $ from 'axios';
import './Home.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Grid from 'react-css-grid';


const LinkContent = (props) => (
    <span>
        <Link id='link-style' to={`/survey/edit/${props.id}`} style={{ textDecoration: 'none' }} >  {props.title} </Link>
    </span>
)

const SurveyEntryBox = (props) => (
    <div className='center-box'>
    <div className="survey-entry-box">
        <div className='box'>
            {<LinkContent id={props.id} title={props.title} />}
        </div>
        <div className='box'>
            <button onClick={() => props.deleteHandler(props.id)}>Delete</button>
        </div>
    </div>
    </div>
)



const Home = (props) => (
    <div>
        <div className='nav-style'>
            <nav>
                <Link to={'/'} style={{ textDecoration: 'none' }}>Home    </Link>
                <Link to={'/survey/create'} style={{ textDecoration: 'none' }}>    New Survey     </Link>
            </nav>
        </div>
        <div className='page-title-box'>
        <div className='page-font-title'>
            EasySurvey
        </div>
        </div>
        <Grid align='center'>
            {props.surveyList ? props.surveyList.map((e, i) => <SurveyEntryBox deleteHandler={props.handleDelete} id={e._id} title={e.title} key={i} />) : 'Loading'}
        </Grid>
    </div>
)

export default Home;





