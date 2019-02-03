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

const Footer = (props) => (
    <div className='bottom-style'>
        <div id='box1'>

            <div>
                <div className='bottom-title'>INSTRUCTION</div>
                <div className='bottom-contents'>
                    This is a project for Georgia Tech Coding Boot Camp coursework.
                    The website is a react application with the utilization of Mongo DB.
                        </div>
            </div>

        </div>
        <div id='box2'>

            <div>
                <div className='bottom-title'>MEMBER</div>
                <div className='bottom-contents'>
                    <a target='_blank' href='https://github.com/sandy8111112004'>Ming-Shiuan Tsai</a>
                </div>
            </div>

        </div>
        <div id='box3'>

            <div>
                <div className='bottom-title'>INSTRUCTORS</div>
                <div className='bottom-contents'>
                    <a target='_blank' href='https://github.com/CjJordan'>CJ Jorden</a>
                    <br />
                    <a target='_blank' href='https://github.com/hannahpatellis'>Hannah A. Patellis</a>
                </div>
            </div>

        </div>
        <div id='box4'>
            <div>
                <div className='bottom-title'>Github</div>
                <a target='_blank' href='https://github.com/sandy8111112004/SurveyAPP'>https://github.com/sandy8111112004/SurveyAPP</a>
            </div>
        </div>
        <div id='box5'>
            <div>
                <div className='bottom-title'>Heroku</div>
                <a href='https://gtbc-survey-app.herokuapp.com'>https://gtbc-survey-app.herokuapp.com</a>
            </div>
        </div>
        <div id='box6'>
            <div className='center-box'>
                <div>
                    <footer><i className="far fa-copyright"></i> 2019 Copyright: Ming-Shiuan Tsai</footer>
                </div>
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
        <Footer />

    </div>
)

export { Home, Footer };





