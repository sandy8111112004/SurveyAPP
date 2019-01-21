
import React from 'react';
import Header from './Header.js';
import SurveyContents from './SurveyContents';
import './SurveyPage.css';

const SurveyPage = (props)=>(
    <div id='survey-box'>
      <div id='survey-inner-box'>
          <Header />
          <SurveyContents />
      </div>
    </div>
  )
export default SurveyPage;






