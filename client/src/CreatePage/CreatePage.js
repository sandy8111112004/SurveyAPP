import React, { Component } from 'react';
import * as $ from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Grid from 'react-css-grid';
import './CreatePage.css';

const SelectOption = (props) => (
    <option>{props.optionContent}</option>
)

const Selection = (props) => (
    <div>
        <p className='questionStyle' >{props.question}</p>
        <select >
            {props.options.map((e, i) => <SelectOption optionContent={e} key={i} />)}
        </select>
    </div>
)

const Question = (props) => (
    <div>
        <p className='questionStyle'>{props.question}</p>
        <input></input>
    </div>
)


const CreateSurveyContents = (props) => (
    <div>
        <div className='survey-font-title'>{props.title ? props.title : "Let's start a new survey!!"}</div>
        <div>{props.question ? props.question.map((e, i) => <Question question={e.questionContent} key={i} />) : ""}</div>
        <div>{props.selection ? props.selection.map((e, i) => <Selection question={e.question} options={e.options} key={i} />) : ""}</div>
    </div>
)

const AppendBox = (props) => (
    <div>
        <div>
            <p className='questionStyle'>"Please enter the title of your survey."</p>
            <input name="createTitle" value={props.titleValue} onChange={props.changeHandler}></input>
        </div>
        <button name='titleBtn' onClick={props.addHandler} className="fas fa-plus"></button>
        <hr/>
        <div>
            <p className='questionStyle'>"Please enter your question here."</p>
            <input name="createQuestion" value={props.questionValue} onChange={props.changeHandler}></input>
        </div>
        <button name='questionBtn' onClick={props.addHandler} className="fas fa-plus"></button>
        <hr/>
        <div>
            <p className='questionStyle'>"Please enter your question for multi-selection here."</p>
            <input name="createSelection" value={props.selectionValue} onChange={props.changeHandler}></input>
            <p className='questionStyle'>"Options: please seperate with ',' "</p>
            <input name="createOption" value={props.optionValue} onChange={props.changeHandler}></input>
        </div>
        <button name='selectionBtn' onClick={props.addHandler} className="fas fa-plus"></button>
        
    </div>
)

class CreatePage extends Component {
    state = {
        createSelection: '',
        createQuestion: '',
        createOption: '',
        createTitle: '',
        questionList: {
            selection: [],
            question: [],
            title: ''
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }


    handleAdd = (e) => {
        e.preventDefault();
        let previous = this.state.questionList;

        if (e.target.name === 'questionBtn') {
            if (this.state.createQuestion) {
                previous.question.push({ questionContent: `${this.state.createQuestion}` });
                this.setState({
                    questionList: previous,
                    createQuestion: ''
                });

            }
        } else if (e.target.name === 'selectionBtn') {
            if (this.state.createSelection && this.state.createOption) {
                let optionArr = this.state.createOption.split(",")
                optionArr = optionArr.map(e => e.trim());
                optionArr.unshift("");
                previous.selection.push({ question: `${this.state.createSelection}`, options: optionArr });
                this.setState({
                    questionList: previous,
                    createSelection: '',
                    createOption: ''
                });

            }
        } else if (e.target.name === 'titleBtn') {
            if (this.state.createTitle) {
                previous.title = `${this.state.createTitle}`;
                this.setState({
                    questionList: previous,
                    createTitle: ''
                });
            }
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        $.post(`/api/survey/`, this.state.questionList)
            .then(
                (result) => {
                    alert('Thank you for submit the Survey!');
                    this.setState({
                        questionList: {
                            selection: [],
                            question: [],
                            title: ''
                        }
                    }
                        , function () {
                            window.location.reload();
                        }
                    );
                }
            )
    }

    render() {
        return (
            <div>
                <nav>
                    <Link to={'/'}>Home</Link>

                </nav>
                <div className='center-box'>
                <div id="append-box">
                    <div className='center-box'>
                        <div>
                            <div className='survey-font-title'>Enter Your Questions Here!</div>
                            <AppendBox
                                addHandler={this.handleAdd}
                                titleValue={this.state.createTitle}
                                questionValue={this.state.createQuestion}
                                selectionValue={this.state.createSelection}
                                optionValue={this.state.createOption}
                                changeHandler={this.handleChange}
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div className='center-box'>
                <div id="create-survey-box">
                    <div className='center-box'>
                    <div>
                        <CreateSurveyContents
                            title={this.state.questionList.title}
                            question={this.state.questionList.question}
                            selection={this.state.questionList.selection}
                        />
                    </div>
                </div>
                </div>
            </div>
            <div className='center-box'>
                <button id='create-survey-btn' onClick={this.handleSubmit}>Create A Survey!</button>
            </div>
                </div >
                )
    }

}




export default CreatePage;