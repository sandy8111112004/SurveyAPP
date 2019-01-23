import React, { Component } from 'react';
import * as $ from 'axios';
import './reset.css';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SurveyPage from './SurveyPage/SurveyPage.js';
import DataPage from './DataPage/DataPage.js';

const LinkContent =(props) =>(
  <span>
  <Link to={`/survey/edit/${props.id}`}>  {props.title} </Link>  |   
  </span>
)

const Home = (props) =>(
  <div>
    <nav>
    <Link to={'/'}>Home</Link>  |
    {props.surveyList? props.surveyList.map((e,i)=><LinkContent id={e._id} title={e.title} key={i}/>): 'Loading'}
    {/* <Link to={`/survey/edit/${props.surveyList[0]._id}`}>Wedding Survey</Link> */}
    {/* {props.surveyList[0]?console.log(props.surveyList[0]._id):'Loading'} */}
    </nav>
    Home page
  </div>
)



class App extends Component {
  state={
    allSurveys:[]
  }

  getAllSurveys = ()=>{
    $.get(`/api/allSurveys`)
    .then((result)=>{
        this.setState({allSurveys: result});
    })
  }

  componentDidMount(){
    $.get(`/api/allSurveys`)
    .then((result)=>{
        this.setState({allSurveys: result.data});
    })
  }


  render() {
    return (
      
      <BrowserRouter>
      <div>
        { this.state.allSurveys.map( (e,i)=>
          <Route exact path={`/survey/${e._id}`} component={SurveyPage} key ={i}/>)
        }
         {/* {this.state.allSurveys[0]? <Route exact path={`/api/survey/${this.state.allSurveys[0]._id}`} component={SurveyPage}/>:'waiting'}
          {this.state.allSurveys[1]?<Route exact path={`/api/survey/${this.state.allSurveys[1]._id}`} component={SurveyPage}/>:'waiting'} */}
         <Route exact path='/' 
            render = {()=><Home surveyList={this.state.allSurveys}/>} 
          />
         {/* <Route exact path='/survey/edit/5c43f9d2f15727502cad2240' component={DataPage}/> */}
         { this.state.allSurveys.map( (e,i)=>
          <Route exact path={`/survey/edit/${e._id}`} component={DataPage} key={i}/>)
          }
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
