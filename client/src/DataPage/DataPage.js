import React from 'react';
import { Link } from 'react-router-dom';
//import Chart from './Chart.js';
import Grid from 'react-css-grid';
import PieChart from 'react-minimal-pie-chart';
import * as $ from 'axios';


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
    <div>
        {props.answerContent}
    </div>
)

const QuestionEntry = (props) => (
    <div>
        {props.QuestionContents}
        {/*console.log(props.answer.find(e=>e[0].id===props.questionID))*/}
        <AnswerEntry answerContent={props.answer.find(e => e[0].id === props.questionID)[0].answer} />
    </div>
)

const SelectionEntry = (props) => (
    <div>
        {props.SelectionContents}
        {/*console.log(props.answer.find(e=>e[0].id===props.questionID))*/}
        <AnswerEntry answerContent={props.answer.find(e => e[0].id === props.questionID)[0].answer} />
    </div>
)


const DataList = (props) => (
    <div>
        {/*props.contents*/}
            <li onClick={() => props.handleDisplay(props.index)}> {props.entry[0][0].answer}</li>
            {/* <li>{props.entry[0][0].answer}</li> */}

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
        
        <PieChart
            data={[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' }]}
            radius={20}
        />

    </div>
)

class DataPage extends React.Component {

    state = {
        surveyData: [],
        selection: [],
        question: [],
        displayIndex: 0,
        attendingRate: 0
    }

    attendingRate = () => {
        //e.preventDefault();
        let result = 0;
        let answerarr = this.state.surveyData.map(resultArr => resultArr.filter(data => data[0].id === '5c43f9d2f15727502cad2244'));
        answerarr = answerarr.filter(e => e.length !== 0);
        result = answerarr.length / this.state.surveyData.length;
        result = parseFloat(result.toFixed(2));
        this.setState({ attendingRate: result });
    }

    displayHandler = (id) => {
        //e.preventDefault();
        this.setState({displayIndex: id});
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
                    question: result.data.question
                });

            }).then(
                this.attendingRate()
            );
    }



    render() {
        return (
            <div>

                <div>
                    <PageContens
                        rawData={this.state.surveyData}
                        attending={this.attendingRate}
                        drawchart={this.drawchart}
                    />
                </div>
                <Grid width='40vw' gap={0}>
                    <div>
                        <ul>
                        {this.state.surveyData ? this.state.surveyData.map((e, i) =>
                            <DataList
                                entry={e}
                                key={i}
                                index={i}
                                handleDisplay={this.displayHandler}
                            />):'Loading...'}
                        </ul>
                    </div>
                    <div>
                        <DetailedSurvey
                            question={this.state.question}
                            selection={this.state.selection}
                            answer={this.state.surveyData[this.state.displayIndex]}
                        />
                    </div>
                </Grid>
            </div>
        )
    }


}



export default DataPage;






