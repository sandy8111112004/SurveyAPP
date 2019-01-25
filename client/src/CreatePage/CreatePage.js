import React, { Component } from 'react';
import * as $ from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Grid from 'react-css-grid';
import './CreatePage.css';

const SelectOption=(props)=>(
    <option>{props.optionContent}</option>
)

const Selection = (props) =>(
    <div>
        <p className='questionStyle' >{props.question}</p>
        <select >
            {props.options.map((e,i)=><SelectOption optionContent={e} key={i} />)}
        </select>
    </div>
)

const Question = (props) => (
    <div>
        <p className='questionStyle'>{props.question}</p>
    </div>
)


const CreateSurveyContents=(props)=>(
    <div>
        <div className='survey-title'>{props.title?props.title:"Let's start a new survey!!"}</div>
        <div>{props.question? props.question.map((e,i)=><Question question={e.questionContent} key={i}/>):""}</div>
        <div>{props.selection?props.selection.map((e,i)=><Selection question={e.question} options={e.options} key={i}/>):""}</div>
    </div>
)

const AppendBox=(props)=>(
    <div>
        <div>
        <p className='questionStyle'>"Please enter the title of your survey."</p>
        <input name="createTitle" value={props.titleValue} onChange={props.changeHandler}></input>
        </div>
    <div>
        <p className='questionStyle'>"Please enter your question here."</p>
        <input name="createQuestion" value={props.questionValue} onChange={props.changeHandler}></input>
    </div>
    <div>
        <p className='questionStyle'>"Please enter your question for multi-selection here."</p>
        <input name="createSelection" value={props.selectionValue} onChange={props.changeHandler}></input>
        <p className='questionStyle'>"Options: please seperate with ',' "</p>
        <input name="createOption" value={props.optionValue} onChange={props.changeHandler}></input>
    </div>
    <button onClick={props.addHandler}>Add</button>
    </div>
)

class CreatePage extends Component{
    state={
        createSelection:'',
        createQuestion:'',
        createOption:'',
        createTitle:'',
        questionList:{
            selection:[],
            question:[],
            title:''
        }
    }

    handleChange=(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }


    handleAdd=(e)=>{
        e.preventDefault();
        let previous = this.state.questionList;

        if(this.state.createQuestion){
            previous.question.push({questionContent:`${this.state.createQuestion}`});

        }
        if(this.state.createSelection && this.state.createOption){
            let optionArr=this.state.createOption.split(",")
            optionArr = optionArr.map(e=>e.trim());
            optionArr.unshift("");
            previous.selection.push({question:`${this.state.createSelection}`, options:optionArr});

        }
        if(this.state.createTitle){
            previous.title=`${this.state.createTitle}`;

        }
        
        this.setState({questionList:previous});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        $.post(`/api/survey/`,this.state.questionList)
        .then(
            (result)=>{
                alert('Thank you for submit the Survey!');           
            }
        )
    }

    render(){
        return(
    <div>
        <nav>
            <Link to={'/'}>Home</Link>

        </nav>
        <div id="append-box">
            <div>
                append box
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
        <div id="create-survey-box">
            <div>
                {/* {console.log(this.state.questionList)} */}
                <CreateSurveyContents 
                title={this.state.questionList.title}
                question={this.state.questionList.question}
                selection={this.state.questionList.selection}
                />
            </div>
        </div>
        <button onClick={this.handleSubmit}>Create A Survey!</button>
    </div>
        )
    }

}




export default CreatePage;