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
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            score_choice: 0,
            valueData: {}
        }

        this.generateSelect = this.generateSelect.bind(this)
        this.generateEssay = this.generateEssay.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.handlSave = this.handlSave.bind(this)
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
                score_choice: 0
            })
        } else {
            this.setState({
                score_choice: 0,
                valueData: event
            })
        }

    }

    generateSelect(x, index) {
        console.log(x, "my xxxxx")
        let valueData = {}
        x.map((array) => {
            valueData = { value: array.symbol.toLowerCase(), label: array.symbol }
        })
        const select = (
            <Select
                onChange={(e) => { this.props.onChangeSelect(e, x) }}
                value={setLabelSelect(choice, this.props.valueData.hasOwnProperty('value') === false ? valueData : this.props.valueData)}
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
                value={this.props.essay.answer}
                onChange={(e) => { this.props.onChangeEssay(e, 'answer') }}
            />
        )

        return essay;
    }

    handlSave(e) {
        var table = document.getElementById('table-score');
        this.props.handleSave(e,table)
   
    }
    render() {
        const { form } = this.props
        return (
            <div className=" margin-top-8 bg-white container-fluid container-fluid-custom rounded-corners">
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
                                                    console.log("data xxxxx", x)
                                                    return <tr key={Math.random()}>
                                                        <td className="align-left text-center">{x.qn_number}</td>
                                                        <td className="align-left text-left" key={x.problem_type}>{x.problem_type === 'essay' ? 'Essay' : 'Multiple Choice'}</td>
                                                        <td className="align-center">
                                                            {x.problem_type === 'essay' ? this.generateEssay(x.exam_question_choices) : this.generateSelect(x.exam_question_choices, i)}
                                                        </td>
                                                        <td className="align-center">
                                                            {
                                                                x.problem_type === 'essay' ? <input
                                                                type="text"
                                                                className="right-content-score__skor"
                                                                value={this.props.essay.score}
                                                                onChange={(e) => { this.props.onChangeEssay(e, 'score') }}
                                                            /> :
                                                                x.exam_question_choices.map((array) => {
                                                                    return  <td className="align-center">{array.is_correct_ans === null ? this.props.score_choice : x.max_score}</td>
                                                                })
                                                            }
                                                        </td>
                                                        <td>{x.weight}</td>
                                                    </tr>
                                                },this)    
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
