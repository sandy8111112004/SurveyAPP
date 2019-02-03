
import React from 'react';
import Header from './Header.js';
import SurveyContents from './SurveyContents';
import './SurveyPage.css';

const SurveyPage = (props)=>(
  <div>
    <Header />
    <div id='survey-box'>
      <div id='survey-inner-box' className='center-box'>
          <SurveyContents />
      </div>
    </div>
  </div>
  )
export default SurveyPage;






