import React, { Component } from 'react';
import * as $ from 'axios';
import './reset.css';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SurveyPage from './SurveyPage/SurveyPage.js';
import DataPage from './DataPage/DataPage.js';
import { Home, Footer } from './Home/Home.js'
import CreatePage from './CreatePage/CreatePage.js'



class App extends Component {
  state = {
    allSurveys: []
  }

  getAllSurveys = () => {
    $.get(`/api/allSurveys`)
      .then((result) => {
        this.setState({ allSurveys: result });
      })
  }

  componentDidMount() {
    $.get(`/api/allSurveys`)
      .then((result) => {
        this.setState({ allSurveys: result.data });
      })
  }

  handleDelete = (id) => {
    $.delete(`/api/survey/${id}`)
      .then((result) => {
        $.get(`/api/allSurveys`)
          .then((result) => {
            this.setState({ allSurveys: result.data });
          })
      });
  }



  render() {
    return (

      <BrowserRouter>
        <div>
          {this.state.allSurveys.map((e, i) =>
            <Route exact path={`/survey/${e._id}`} component={SurveyPage} key={i} />)
          }

          <Route exact path='/'
            render={() => <Home surveyList={this.state.allSurveys} handleDelete={this.handleDelete} />}
          />

          {this.state.allSurveys.map((e, i) =>
            <Route exact path={`/survey/edit/${e._id}`} component={DataPage} key={i} />)
          }
          <Route exact path={'/survey/create'} component={CreatePage} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
