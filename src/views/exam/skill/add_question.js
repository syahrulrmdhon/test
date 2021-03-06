import React, { Component } from 'react'
import Header from '../../global/header'
import WorkStepIndicator from './work_step_indicator'
import { NavLink } from 'react-router-dom'
import { apiClient } from './../../../utils/apiClient'
import { modal } from './../../global/modal'

// redux
import {
    getComponent,
} from './../../../redux-modules/modules/exam/skill'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {basic_comp_lists} from "../../../utils/exam";

class AddQuestion extends Component {
    constructor(props){
        super(props)

        this.state = {
            assessment_id: this.props.match.params.id,
            exam_id: this.props.match.params.exam_id || null,
        }
        
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.props.getComponent(this.state.assessment_id, this.state.exam_id)
    }

    remvoeDuplicate(arrArg){
        return arrArg.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
        });
    }


    onSubmit(event){
        event.preventDefault(); 
        const problem_types = this.props.problem_types
        const problem_type_sets = this.props.problem_type_sets
        const data = this.props.exam
        let msg = 'dibuat'
        let url;
        let action;

        let exam_questions = []
        if(problem_types.length > 0){
            problem_types.map((problem_type, idx) => {
                let arr = problem_type_sets[problem_type] || []
                exam_questions = [...exam_questions, ...arr]
            })
        }

        if(exam_questions.length > 0){
            data.assessment_id = this.state.assessment_id
            data.current_number = exam_questions.length
            data.question_count = exam_questions.length
            data.exam_questions_attributes = exam_questions
        }

        if(this.state.exam_id){
            msg = 'diubah'
            action = 'put'
            url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}`
        } else {
            action = 'post'
            url = `v1/assessments/${this.state.assessment_id}/exams/validate?step=QuestionForm&category=skill`
        }

        let basic_comps = []

        data.exam_questions_attributes.map((data, index) =>{
            basic_comps.push(data.basic_comp_id)
        })

        let length_basic_comps_afer_eliminate = this.remvoeDuplicate(basic_comps).length
        const basic_comps_pure = basic_comp_lists(this.props.assessment_basic_comps).length

        if(basic_comps_pure !== length_basic_comps_afer_eliminate){
            modal({
                message: 'Gagal',
                description: `Pilih semua kompetensi dasar.`,
                btns: [
                    {
                        label: 'Ulangi',
                        className: 'btn bcred cwhite',
                    }
                ]
            })
            return false
        }

        apiClient(action, url, data).then(response => {
            if(!this.state.exam_id){
                apiClient('post', `/v1/assessments/${this.state.assessment_id}/exams`, data).then(response => {
                    modal({
                        message: 'Selamat',
                        description: `Tugas keterampilan sudah ${msg}`,
                        btns: [
                            {
                                label: 'Selesai',
                                className: 'btn green',
                            }
                        ],
                        event: this.props.history.push(`/exam/${this.state.assessment_id}`)
                    })
                })
            } else {
                modal({
                    message: 'Selamat',
                    description: `Langkah kerja tugas berhasil ${msg}.`,
                    btns: [
                        {
                            label: 'Selesai',
                            className: 'btn green',
                        }
                    ],
                    event: this.props.history.push(`/exam/${this.state.assessment_id}`)
                })
            }
        }).catch(err => {
            modal({
                message: 'Gagal',
                description: `Detil langkah kerja gagal ${msg}. Silakan periksa ulang.`,
                btns: [
                    {
                        label: 'Ulangi',
                        className: 'btn bcred cwhite',
                    }
                ]
            })
        })
    }

    render(){
        let urlBack = ''
        if(this.state.exam_id){
            urlBack = `/exam/${this.state.assessment_id}`
        } else {
            urlBack = `/create-skill/${this.state.assessment_id}`
        }

        let problem_types = []
        if(this.props.problem_types){
            this.props.problem_types.map((problem_type, idx) => {
                problem_types.push(
                    <WorkStepIndicator 
                        index={idx}
                        key_value={problem_type}
                        key={Math.random()}
                        // removeIndicator={this.props.removeIndicator}
                    />
                )
            })
        }
        let msg = ''
        if(this.state.exam_id){
            msg = 'Ubah'
        }else{
            msg = 'Tambah'
        }

        return(
            <div className="padding-content">
                <Header navbar={true} location={urlBack} />
                <div className="container">
                    <div className="margin-content">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">{msg}  Detil Langkah Kerja</label> 
                                    {problem_types}
                                    <div className="margin-top-4 padding-top-4">
                                        <NavLink to={urlBack}>
                                            <button className="submit-btn default margin-right-2" >Kembali</button>
                                        </NavLink>
                                        <button  className="submit-btn" onClick={this.onSubmit} >Simpan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    exam: state.skill.exam,
    problem_types: state.skill.problem_types,
    problem_type_sets: state.skill.problem_type_sets,
    assessment_basic_comps: state.skill.assessment_basic_comps || [],

})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getComponent,
    // removeIndicator,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)