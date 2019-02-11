import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import { apiClient } from '../../utils/apiClient'
import RightContent from './../../components/RightSide/RightSide'
import Select from 'react-select'
import { setLabelSelect, checkProperties } from './../../utils/common'


let choice = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'd', label: 'D' },
    { value: 'e', label: 'E' },
]

export default class Content extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTab: 1,
            essay: {
                answer: '',
                score: ''
            },
            score_choice: 0,
            valueData: {}
        }

        this.generateSelect = this.generateSelect.bind(this)
        this.generateEssay = this.generateEssay.bind(this)
        this.onChangeEssay = this.onChangeEssay.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
    }

    componentDidMount() {
        // if (this.state.activeTab === 1) {
        //     this.getKnowledgeScore()
        // }
    }

    onChangeEssay(e, prop) {
        // e.preventDefault()
        console.log(e.target.value, "e.target.value")
        var dv = this.state.essay
        dv[prop] = e.target.value
        this.setState({ essay: dv })

    }

    onChangeSelect(event, props) {
        console.log(event, props, "my event");
        let is_answer = ''
        props.map((array) => {
            is_answer = array.is_correct_ans
        })
        if (is_answer === null) {
            this.setState({
                valueData: event,
                score_choice:0
            })
        }else{
            this.setState({
                score_choice:0,
                valueData: event
            })
        }

    }

    generateSelect(x, index) {
        let valueData = {}
        x.map((array) => {
            valueData = { value: array.symbol.toLowerCase(), label: array.symbol }
        })
        console.log(this.state.valueData.hasOwnProperty('value') === false ? valueData : this.state.valueData, "valuedata")
        // let obj=''
        // for(let i in this.state.valueData){
        //     console.log(this.state.valueData[i],'valuedata')
        // }

        const select = (
            <Select
                onChange={(e) => { this.onChangeSelect(e, x) }}
                value={setLabelSelect(choice, this.state.valueData.hasOwnProperty('value') === false ? valueData : this.state.valueData)}
                classNamePrefix='select'
                name={index}
                placeholder='- Pilih jawaban -'
                options={choice}
            />
        )
        return select;
    }

    generateEssay(x) {
        const essay = (
            <input
                type="text"
                className="right-content-score__uraian"
                value={this.state.essay.answer}
                onChange={(e) => { this.onChangeEssay(e, 'answer') }}
            />
        )

        return essay;
    }

    handlSave(e){
        console.log(e.target,"index")
        var table = document.getElementById('table-score');
        for (var r = 0, n = table.rows.length; r < n; r++) {
            for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                alert(table.rows[r].cells[c].innerHTML);
            }
        }
        // var rowIdx;
        // var rowData= [];
        // var table= document.getElementById('table-score');
        // var rows= table.getElementsByTagName('tr');
        // var selectedRow;
        // var rowCellValue;
        // for(let i= 0;i<rows.length;i++){
        //     console.log(rows[i].textContent ||
        //         rows[i].innerText,".index")
        //     // rowCellValue= 
        //     //         rowData.push('cell '+i+': '+rowCellValue);
        //     // // rows[i].onclick= function(){
        //     // //     rowIdx= this.rowIndex;
        //     // //     selectedRow= this.cells;
                 
        //     //     alert("Row #"+ rowData);
        //     // // }
        // }
    }
    render() {
        const { form } = this.props
        console.log(this.state.valueData, "here ch")
        return (
            <div className="bg-white margin-top-8 container-fluid container-fluid-custom rounded-corners">
                <div className="row rounded-10">
                    <LeftSide>
                        <Profile dataProfile={this.props.student} />
                    </LeftSide>
                    <RightContent>
                        <div className="right-content-score">
                            <div className="right-content-score__title">
                                Masukan Nilai
                    </div>
                            <div>
                                <div className="table-responsive">
                                    <table id="table-score" className="right-content-score____table">
                                        <thead className="right-content-score__table-head">
                                            <th className="right-content-score__no align-left text-center">No</th>
                                            <th>Tipe Soal</th>
                                            <th className="align-center">Jawaban Soal</th>
                                            <th className="align-center">Skor</th>
                                            <th>Bobot</th>
                                        </thead>
                                        <tbody>
                                            {
                                                form.map(function (x, i) {
                                                    return <tr key={Math.random()}>
                                                        <td className="align-left text-center ">{x.qn_number}</td>
                                                        <td className="align-left text-left">{x.problem_type === 'essay' ? 'Essay' : 'Multiple Choice'}</td>
                                                        <td className="align-center">
                                                            {x.problem_type === 'essay' ? this.generateEssay(x.exam_question_choices) : this.generateSelect(x.exam_question_choices, i)}
                                                        </td>
                                                        <td className="align-center">
                                                            {x.problem_type === 'essay' ? <input
                                                                type="text"
                                                                className="right-content-score__skor"
                                                                value={this.state.essay.score}
                                                                onChange={(e) => { this.onChangeEssay(e, 'score') }}
                                                            /> : 
                                                            x.exam_question_choices.map((array) => {
                                                                console.log(this.state.score_choice,"xxxx")
                                                                return    <input type="text" className="right-content-score__skor" value={array.is_correct_ans ===null?this.state.score_choice:x.max_score} />
                                                            })
                                                         }
                                                        </td>
                                                        <td>{x.weight}</td>
                                                    </tr>
                                                }, this)
                                            }

                                        </tbody>

                                    </table>
                                    <div className="margin-top-3 align-right">
                                    <button className="submit-btn" onClick={this.handlSave}>Submit </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </RightContent>
                </div>
            </div>
        )
    }
}
