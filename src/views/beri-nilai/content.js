import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import { apiClient } from '../../utils/apiClient'
import RightContent from './../../components/RightSide/RightSide'
import Select from 'react-select'
import { setLabelSelect, checkProperties } from './../../utils/common'
import SelectData from './select';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setSavedata } from './../../redux-modules/modules/score'




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
            valueData: {},
            dataChoice: [],
            correct: ''
        }

        this.generateSelect = this.generateSelect.bind(this)
        this.generateEssay = this.generateEssay.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.handlSave = this.handlSave.bind(this)
        this.getDataChoice = this.getDataChoice.bind(this)
    }
    componentDidMount() {
        const choicePG = []
        let arrayData = this.props.form

        // arrayData && arrayData.exam_question_choices.map((x,i) => {
        //     choicePG.push({value:x.symbol, label:x.symbol })
        // })
        console.log(this.props.form, "PGCHOICe")
        this.setState({
            dataChoice: choicePG
        })
    }
    onChangeSelect(event, props) {
        console.log(event, props, "my event");
        let is_answer = ''

        // props.map((array) => {
        //     is_answer = array.is_correct_ans
        // })
        // if (is_answer === null) {
        //     this.setState({
        //         valueData: event,
        //         score_choice: 0
        //     })
        // } else {
        //     this.setState({
        //         score_choice: 0,
        //         valueData: event
        //     })
        // }

    }

    getDataChoice() {
        let data = this.props.form
        console.log(data, "data form")
    }




    generateSelect(x, index) {
        let valueData = {}
        let choicePG = []
        let form = this.props.form
        let arrayData = form[0]
        let correct = ''
        arrayData.exam_question_choices.map((x, i) => {
            choicePG.push({ value: x.symbol, label: x.symbol })
        })
        form.map((dt, i) => {
            dt.exam_question_choices.map((cx, i) => {
                if (cx.is_correct_ans === true) {
                    console.log('here', cx.symbol)
                }
            })
        })

        const select = (
            <Select
                onChange={(e) => { this.props.onChangeSelect(e, x) }}
                value={choicePG.find((element) => { return element.value === correct })}
                classNamePrefix='select'
                name={index}
                placeholder='- Pilih jawaban -'
                options={choicePG}
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
        this.props.handleSave(e, table)

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
                                                    return <tr key={Math.random()}>
                                                        <td className="align-left text-center">{x.qn_number}</td>
                                                        <td className="align-left text-left" key={x.problem_type}>{x.problem_type === 'essay' ? 'Essay' : 'Multiple Choice'}</td>
                                                        {
                                                            x.exam_question_choices.map((cx, i) => {
                                                                if (cx.is_correct_ans === true) {
                                                                    return <SelectData choice={this.props.choice} data={x} is_correct={cx.symbol} />
                                                                }
                                                            })
                                                                  
                                                        }
                                                        <td className="align-center">{x.max_score}</td>

                                                        {/* {
                                                             
                                                                x.exam_question_choices.map((array) => {
                                                                    return  <td className="align-center">{array.is_correct_ans === null ? this.props.score_choice : x.max_score}</td>
                                                                })
                                                            } */}
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

// const mapStateToProps = state => ({
//     // data: state
//   })

//   const mapDispatchToProps = dispatch => bindActionCreators({ setSavedata }, dispatch);
//   export default connect(mapStateToProps, mapDispatchToProps)(Content);



// this.props.valueData.hasOwnProperty('value') === false ? valueData : this.props.valueData)