import React from 'react';

const SelectOption=(props)=>(
    <option value={props.optionContent}>{props.optionContent}</option>
)

const Selection = (props) =>(
    <div>
        <p className='questionStyle' >{props.question}</p>
        <select onselect={props.selectHandler}>
            {props.options.map((e,i)=><SelectOption optionContent={e} key={i} />)}
        </select>
    </div>
)

const Question = (props) => (
    <div>
        <p className='questionStyle'>{props.question}</p>
        <input placeholder='answers here'></input>
    </div>
)


class SurveyContents extends React.Component {
    state={
        selection:[
            {   
                id:1,
                question:"Are you going to the wedding?",
                options: ['','Yes', 'No', 'Maybe'],
                answer:''
            },
            {
                id:2,
                question:'How many people are you going with (including yourself)?',
                options: ['','1', '2', '3','4','5','6'],
                answer:''
            }, 
            {
                id:3,
                question:'Are you a vegetarian?',
                options: ['','Yes', 'No'],
                answer:''
            },
            {
                id:4,
                question:'Do you eat beef?',
                options: ['','Yes', 'No'],
                answer:''
            } 
            
        ],
        question:[
            {
                id:5,
                questionContent:'What do you want to say to the couple?',
                answer:''
            },
            {
                id:6,
                questionContent:'How are you?',
                answer:''
            },
            {
                id:7,
                questionContent:'HEYYYYYYYYYYYYY!',
                answer:''
            }
        ]
    
    
    }


    handleSelect=(id)=>{
        let selResult=this.state.selection.filter(e=>e.id===id);
        let quesResult = this.state.question.filter(e=>e.id===id);

        if(selResult){        

        }else if(quesResult){

        }

    }

    handleSubmit=(e)=>{
        

    }


    render(){
        return(
            <form>
                Survey Content Start Here!
                <div>
                    <p className='questionStyle'>What's your name?</p>
                    <input ></input>
                </div>
                {this.state.selection.map((e,i)=> 
                <Selection 
                    question={e.question} 
                    options={e.options} 
                    selectHandler={this.handleSelect}
                    id={e.id} 
                    key={i} 
                /> )}
                {this.state.question.map((e,i)=>
                <Question 
                    question={e.questionContent} 
                    id={e.id} 
                    key={i}
                />)}
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default SurveyContents;
