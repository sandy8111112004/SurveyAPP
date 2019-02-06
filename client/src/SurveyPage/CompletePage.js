import React, { Component } from 'react';
import {Home, Footer} from '../Home/Home.js'

import { BrowserRouter, Route, Link } from 'react-router-dom';
import Grid from 'react-css-grid';



const CompletePage = (props) => (
    <div>
        <div className='page-title-box'>
            <div className='page-font-title'>
                EasySurvey
            </div>
        </div>
        <div className='center-box'>
        <div id='home-empty-title'>
            Thank you for submitting the survey!
        </div>
        </div>
        <Footer />

    </div>
)

export default CompletePage;





