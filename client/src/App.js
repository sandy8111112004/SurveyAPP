import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SurveyPage from './SurveyPage/SurveyPage.js';
import DataPage from './DataPage/DataPage.js';

const Home = (props) =>(
  <div>
    <nav>
    <Link to={'/'}>Home</Link>  |
    <Link to={'/survey/edit/5c43f9d2f15727502cad2240'}>Wedding Survey</Link>
    </nav>
    Home page
  </div>
)



class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
          <Route exact path='/api/survey/5c43f9d2f15727502cad2240' component={SurveyPage} />
         <Route exact path='/' component = {Home} />
         <Route exact path='/survey/edit/5c43f9d2f15727502cad2240' component={DataPage}/>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
