import React from 'react';
import { Link } from 'react-router-dom';
//import Chart from './Chart.js';
import './DataPage.css'
import Grid from 'react-css-grid';
import PieChart from 'react-minimal-pie-chart';
import * as $ from 'axios';

const Legend = (props) =>(
    <div>
        {props.title}: {props.value} <span><div className='color-box' style={props.color}></div></span>
    </div>
)


const DrawPieChart =(props)=>(
    <div>
        <div className='question-style'>
        {props.selection[props.index].question}
        </div>
    <div className='chart-box'>
        <div id='pie-box' className='box'>
        <PieChart
            data={props.data}
            radius={20}
        />
        </div>
        <div className='legend-box box'>
            {props.data.map((e,i)=><Legend key={i} title={e.title} value={e.value} color={{'backgroundColor':e.color}}/>)}
        </div>
    </div>
    </div>
)

const ResultDataList =(props)=>(
    <div>
        <div className='question-style'>{props.selection[props.index].question}</div>
        <div className='answer-style'>Total: {props.content} </div>
    </div>
)

const  ResultBox = (props) => (
    <div>
        <div>
            <div className='question-style'>
        Total Submit Survey Number: {props.total}
        </div>
        {props.dataCal?props.dataCal.map((e,i)=>e.length===1?<ResultDataList selection={props.selection} index={i} content={e[0]} key={i}/>:null):null}
        </div>
        <Grid width='40vw' gap={0} >
        {props.dataCal?props.dataCal.map((e,i)=>e.length===1?null:<DrawPieChart selection={props.selection} index={i} data={e.slice(1,e.length)} key={i} colorArr={props.colorArr}/>):null}
        </Grid>
    </div>
)


const DetailedSurvey = (props) => (
    <div>
        {props.question.map((e, i) =>
            <QuestionEntry
                QuestionContents={e.questionContent}
                questionID={e._id}
                answer={props.answer}
                key={i}
            />)}
        {props.selection.map((e, i) =>
            <SelectionEntry
                SelectionContents={e.question}
                questionID={e._id}
                answer={props.answer}
                key={i}
            />)}
    </div>
)

const AnswerEntry = (props) => (
    <div className='answer-style'>
        {props.answerContent}
    </div>
)

const QuestionEntry = (props) => (
    <div>
        <div className='question-style'>
        {props.QuestionContents}
        </div>
        {props.answer?
        <AnswerEntry answerContent={props.answer.find(e => e[0].id === props.questionID)[0].answer} />
        :"No Answer"}
    </div>
)

const SelectionEntry = (props) => (
    <div>
        <div className='question-style'>
        {props.SelectionContents}
        </div>
        {props.answer?
        <AnswerEntry answerContent={props.answer.find(e => e[0].id === props.questionID)[0].answer} />
        :"No Answer"}
    </div>
)


const DataList = (props) => (
    <div>
        <li className='dataEntry' onClick={() => props.handleDisplay(props.index)}> {props.entry[0][0].answer} 
        <span>  <button id='deleteListBtn' onClick={()=>props.answerDeleteHandler(props.index)}  class="fas fa-trash-alt"></button></span></li>
        
    </div>
)

const PageContens = (props) => (
    <div>
        <nav>
            <Link to={'/'}>Home</Link>  |
            <Link to={`/survey/${props.pageID}`}>{props.pageTitle} Form</Link>
        </nav>
        On the DataPage

        <div className='chart-box'>

        <ResultBox dataCal={props.dataCal} selection={props.selection} total={props.total}/>
          
        
        </div>
    </div>
)


class DataPage extends React.Component {

    state = {
        surveyData: [],
        selection: [],
        question: [],
        displayIndex: 0,
        attendingRate: 0,
        pageID:'',
        pageTitle:'',
        dataCal:[],
        colorArr:['#E38627', '#C13C37','#6A2135','#35A5A5', '#FB0A27','#0AFB14','#210AFB','#29FB0A']
    }

   

    dataAnalysis=()=>{
        //e.preventDefault();
        const lenSel = this.state.selection.length;
        const lenQue = this.state.question.length;
        const drawingData = this.state.surveyData;
        let numArr = [];
        
        for(let i=0;i<lenSel;i++){
            numArr[i]=[0];
            for(let j=0;j<drawingData.length;j++){
                if(!isNaN(drawingData[j][lenQue+i][0].answer)){
                    numArr[i][0] += parseFloat(drawingData[j][lenQue+i][0].answer);
                }else{
                    // console.log(drawingData[j][lenQue+i][0].answer);
                    if(numArr[i].find(e=>e.title === drawingData[j][lenQue+i][0].answer)){
                        let index=numArr[i].findIndex(e=>e.title===drawingData[j][lenQue+i][0].answer);
                        numArr[i][index].value += 1;
                    }else{
                        numArr[i].push({title: drawingData[j][lenQue+i][0].answer, value: 1, color:this.state.colorArr[(j+i)%(this.state.colorArr.length)]});
                    }
                }
            }
            
        }
        //console.log(numArr);
        this.setState({dataCal:numArr});
    }

    displayHandler = (id) => {
        //e.preventDefault();
        this.setState({ displayIndex: id });
    }

    componentDidMount() {
        const url = window.location.href;
        const index = url.indexOf('edit/')
        const id = url.substring(index + 5);
        $.get(`/api/survey/${id}`)
            .then((result) => {

                this.setState({
                    surveyData: result.data.answer,
                    selection: result.data.selection,
                    question: result.data.question,
                    pageID: result.data._id,
                    pageTitle: result.data.title
                }, function(){

                    this.dataAnalysis();
                });

            });
    }

    handleAnswerDelete = (index)=>{
        const url = window.location.href;
        const StringIndex = url.indexOf('edit/')
        const id = url.substring(StringIndex + 5);
        $.delete(`/api/survey/answer/${id}/${index}`)
        .then(
            (result) =>{
                this.setState({
                    surveyData: result.data.answer,
                    selection: result.data.selection,
                    question: result.data.question,
                    pageID: result.data._id,
                    pageTitle: result.data.title
                }, function(){
                   // this.attendingRate();
                   this.dataAnalysis();
                });
            }
        );
    }

    render() {
        return (
            <div>

                <div>
                    <PageContens
                        rawData={this.state.surveyData}
                        dataCal={this.state.dataCal}
                        drawchart={this.drawchart}
                        pageID= {this.state.pageID}
                        pageTitle={this.state.pageTitle}
                        checkData = {this.dataAnalysis}
                        colorArr={this.state.colorArr}
                        selection={this.state.selection}
                        total={this.state.surveyData.length}
                    />
                </div>
                <div id='raw-data-display'>
                    <Grid width='40vw' gap={0}>
                        <div id='dataEntry-box'>
                            <ul>
                                {this.state.surveyData ? this.state.surveyData.map((e, i) =>
                                    <DataList
                                        entry={e}
                                        key={i}
                                        index={i}
                                        handleDisplay={this.displayHandler}
                                        answerDeleteHandler={this.handleAnswerDelete}
                                    />) : 'Loading...'}
                            </ul>
                        </div>
                        <div id='detailed-box'>
                            <DetailedSurvey
                                question={this.state.question}
                                selection={this.state.selection}
                                answer={this.state.surveyData[this.state.displayIndex]}
                            />
                        </div>
                    </Grid>
                </div>
            </div>
        )
    }


}



export default DataPage;






