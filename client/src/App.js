import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header.js';
import SurveyContents from './SurveyContents/SurveyContents.js';

class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <SurveyContents />
      </div>
    );
  }
}

export default App;
