import React from 'react';
import { Link } from 'react-router-dom';
import Chart from './Chart.js';
import Grid from 'react-css-grid';
import PieChart from 'react-minimal-pie-chart';
import * as $ from 'axios';


const DetailedSurvey = (props) =>(
    <div>
        {props.question.map((e,i)=>
        <QuestionEntry 
        QuestionContents={e.questionContent}  
        questionID={e._id}
        answer={props.answer}
        key={i}
        />)}
    </div>
)

const AnswerEntry = (props)=>(
    <div>
        {props.answerContent}
    </div>
)

const QuestionEntry = (props) =>(
    <div>
        {props.QuestionContents}
        {props.answer?<AnswerEntry answerContent={props.answer.find(e=>e.id===props.questionID).answer}/>:'Waiting'}
    </div>
)


const DataList = (props) =>(
    <div>
        {/*props.contents*/}
        <ul>
            <li onClick={()=>props.detailedDisplay(props.index)}> {props.entry[0].answer}</li>
        </ul>

    </div>
)

const PageContens = (props) => (
    <div>
        <nav>
            <Link to={'/'}>Home</Link>  |
            <Link to={'/api/survey/5c43f9d2f15727502cad2240'}>Wedding Survey Form</Link>
        </nav>
        On the DataPage
        <button onClick={props.attending}> Attending Rate</button>
        {/*props.rawData[0]? props.rawData[0].map((e, i)=><DataList contents={e[0].answer} key={i}/>):' Loading'*/}
        {props.rawData?props.rawData.map((e,i)=>
        <DataList 
            entry={e} 
            key={i} 
            index={i}
            detailedDisplay={props.display}
        />) :'Loading...'}
        <PieChart 
            data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' }]}
            radius={20}
        />;
        
    </div>
)

class DataPage extends React.Component{

    state={
        surveyData:[],
        selection: [],
        question:[],
        displayIndex:0,
        attendingRate:0
    }

    attendingRate=()=>{
        //e.preventDefault();
        let result=0;
        let answerarr=this.state.surveyData.map(resultArr=>resultArr.filter(data=>data[0].id==='5c43f9d2f15727502cad2244'));
        answerarr=answerarr.filter(e=>e.length!==0);
        result=answerarr.length/this.state.surveyData.length;
        result = parseFloat(result.toFixed(2));
        this.setState({attendingRate: result});
    }

    displayData=(id)=>{

    }

    componentDidMount(){
        const url=window.location.href;
        const index = url.indexOf('edit/')
        const id = url.substring(index+5); 
        $.get(`/api/survey/${id}`)
        .then((result)=>{
            this.setState({
                surveyData: result.data.answer,
                selection: result.data.selection,
                question:result.data.question
            });

        }).then(
            this.attendingRate()
        );
    }



    render(){
        return(
            <div>
                <Grid width='40vw' gap={0}>
                <div>
                <PageContens 
                rawData={this.state.surveyData}
                attending={this.attendingRate} 
                drawchart={this.drawchart}
                display={this.displayData}
                />
                </div>
                <div>
                <DetailedSurvey 
                question={this.state.question} 
                selection={this.state.selection} 
                answer={this.state.surveyData[this.state.displayIndex]} 
                />
                {console.log('check answer', this.state.surveyData[this.state.displayIndex])}
                </div>
                </Grid>
            </div>
        )
    }


}



export default DataPage;






