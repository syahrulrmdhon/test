import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import LeftSide from './../../components/LeftSide/LeftSide'
import Profile from './../../components/Content/ProfileDetail'
import { apiClient } from '../../utils/apiClient'
import RightContent from './../../components/RightSide/RightSide'
import Select from 'react-select'
import { setLabelSelect } from './../../utils/common'


let choice = [
    {value:'a',label:'A'},
    {value:'b',label:'B'},
    {value:'c',label:'C'},
    {value:'d',label:'D'},
    {value:'e',label:'E'},
]

export default class Content extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTab: 1,
            essay:{
                answer:'',
                score:''
            },
            valueData:{}
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

    onChangeEssay(e, prop){
        e.preventDefault()
        console.log(e.target.value,"e.target.value")
        var dv = this.state.essay
        dv[prop] = e.target.value
        this.setState({ essay: dv })
 
    }

    // onChangeSelect(valueData){
    //     console.log(valueData,"my val")
    //     this.setState({
    //         valueData:valueData
    //     })

    // }
    onChangeSelect(event, props){
        console.log(event,"my event");
            this.setState({
                valueData: event
            })
      
    }

    generateSelect(x,index){
        let valueData = {}
        x.map((array) => {
           valueData =  {value:array.symbol.toLowerCase(),label:array.symbol}
        })
        console.log(this.state.valueData,"up here")
        console.log(this.state.valueData && valueData  ,"valudata")

        const select = (
            <Select
            onChange={(e) => {this.onChangeSelect(e)}}
            value= {setLabelSelect(choice, valueData )}
            classNamePrefix='select'
            name={index}
            placeholder='- Pilih jawaban -' 
            options={choice}
            />
        )
        return select;
    }

    generateEssay(x){
        const essay = (
            <input 
                type="text"
                className="right-content-score__uraian"
                value={this.state.essay.answer}
                onChange={(e) => {this.onChangeEssay(e,'answer')}}
            />
        )
        
        return essay;
    }

    render() {
        const { form } = this.props
        console.log(this.props.form, "my stdent")
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
                                    <table className="right-content-score____table">
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
                                                         <td className="align-left text-left">{x.problem_type === 'essay'?'Essay':'Multiple Choice'}</td>
                                                        <td className="align-center">
                                                            {x.problem_type === 'essay'?this.generateEssay(x.exam_question_choices):this.generateSelect(x.exam_question_choices,i)}
                                                        </td>
                                                        <td className="align-center">
                                                            {x.problem_type === 'essay'?<input 
                                                                type="text"
                                                                className="right-content-score__skor"
                                                                value={this.state.essay.score}
                                                                onChange={(e) => {this.onChangeEssay(e,'score')}}
                                                            />:<input type="text" className="right-content-score__skor" value={x.max_score} />}
                                                        </td>
                                                        <td>{x.weight}</td>
                                                    </tr>
                                                }, this)
                                            }

                                            {/* <tr>
                                            <td className="align-left text-center ">2</td>
                                            <td className="align-left text-left">Pilihan ganda</td>
                                            <td className="align-center">
                                            <Select 
                                                classNamePrefix='select'
                                                placeholder='- Pilih jawaban -' />
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">3</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr>
                                        <tr>
                                            <td className="align-left text-center ">4</td>
                                            <td className="align-left text-left">Uraian</td>
                                            <td className="align-center">
                                            <input type="text" className="right-content-score__uraian"/>
                                            </td>
                                            <td className="align-center">
                                                <input type="text" className="right-content-score__skor"/>
                                            </td>
                                            <td>10</td>

                                        </tr> */}

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </RightContent>
                </div>
            </div>
        )
    }
}
