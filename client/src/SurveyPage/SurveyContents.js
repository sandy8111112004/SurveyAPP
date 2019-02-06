import React from 'react';
import * as $ from 'axios';
import {Redirect} from 'react-router-dom';

const SelectOption=(props)=>(
    <option value={props.optionContent}>{props.optionContent}</option>
)

const Selection = (props) =>(
    <div>
        <p className='questionStyle' >{props.question}</p>
        <select name ={props.id} value ={props.value} onChange={props.changeHandler}>
            {props.options.map((e,i)=><SelectOption optionContent={e} key={i} />)}
        </select>
    </div>
)

const Question = (props) => (
    <div>
        <p className='questionStyle'>{props.question}</p>
        <input name={props.id} value={props.value} onChange={props.changeHandler}></input>
    </div>
)


class SurveyContents extends React.Component {
    state={
        selection:[],
        question:[],
        answer:[],
        title:'',
        redirect:false
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        const url=window.location.href;
        const index = url.indexOf('survey/')
        const id = url.substring(index+7); 
        $.put(`/api/survey/answer/${id}`,{answer:this.state.answer}).then(
            (data)=>{
                this.setState({redirect:true});
            }
        )
    }

    handleChange=(e)=>{
        e.preventDefault();
        let previous = this.state.answer;
        previous.find(ele=>ele.id===e.target.name).answer = e.target.value;
        this.setState({answer: previous});
    }

    componentDidMount(){
        const url=window.location.href;
        const index = url.indexOf('survey/')
        const id = url.substring(index+7); 
        
    $.get(`/api/survey/${id}`)
        .then((result)=>{
            let answerForm=[];
            result.data.question.map(e=>answerForm.push({id:e._id,answer:""}));
            result.data.selection.map(e=>answerForm.push({id:e._id,answer:""}));
            this.setState({
                selection: result.data.selection,
                question:result.data.question,
                answer:answerForm,
                title:result.data.title,
                redirect:false
            })
        })
    }


    render(){
        return(
            <div>
                {!this.state.redirect?
            <form>
                <div className='survey-font-title'>{this.state.title} </div>
                {this.state.question.map((e,i)=>
                <Question 
                    question={e.questionContent} 
                    value={this.state.answer.find(ele=>ele.id===e._id).answer}
                    changeHandler={this.handleChange}
                    id={e._id} 
                    key={i}
                />)}

                {this.state.selection.map((e,i)=> 
                <Selection 
                    question={e.question} 
                    options={e.options} 
                    changeHandler={this.handleChange}
                    value={this.state.answer.find(ele=>ele.id===e._id).answer}
                    id={e._id} 
                    key={i} 
                /> )
                }
                <div className='center-box'>
                <button id='submit-survey-btn' onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>

            :<Redirect to='/completed' />}
            </div>
        )
    }
}

export default SurveyContents;



