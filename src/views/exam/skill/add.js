import React, { Component } from 'react'
import Header from '../../global/header'
import Select from 'react-select';
import WorkStep from './work_step'
import {examTypes} from './../../../utils/common'
import { apiClient } from './../../../utils/apiClient'
import { modal } from './../../global/modal'
import { basic_comp_lists } from './../../../utils/exam'


// redux
import {
    getNew,
    handleEvent,
} from './../../../redux-modules/modules/exam/skill'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Add extends Component{
    constructor(props){
        super(props)

        this.state = {
            assessment_id: this.props.match.params.id,
            exam_id: this.props.match.params.exam_id,
            examTypes: []
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.props.getNew(this.state.assessment_id, this.state.exam_id)
        examTypes.call(this, {category: 'skill'})
    }


    onSubmit(event){
        event.preventDefault(); 
        let data = {}
        data['exam'] = this.props.exam
        data['problem_types'] = this.props.problem_types
        data.include_question = false
        let url = `/v1/assessments/${this.state.assessment_id}/exams/validate?step=BasicForm&category=skill`
        let msg = 'dibuat'
        let action = 'post'
        let route = `/question-skill/${this.state.assessment_id}`
        let addText = ', selanjutnya masuk ke form beri soal'

        if(this.state.exam_id){
            url = `v1/assessments/${this.state.assessment_id}/exams/${this.state.exam_id}`
            msg = 'ubah'
            action = 'put'
            route = `/exam/${this.state.assessment_id}`
            addText = ''
        }

        apiClient(action, url, data).then(response => {
            modal({
                message: 'Selamat',
                description: `Tugas keterampilan berhasil  ${msg}`,
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push(route)
                    }
                ]
            })
        }).catch(err => {
            console.log(err.response)
            modal({
                message: 'Gagal',
                description: `Tugas keterampilan gagal ${msg}. Silakan periksa ulang.`,
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
        const { exam_type, name, is_remedial } = this.props.exam ? this.props.exam : [] 
        let msg = ''
        if(this.state.exam_id){
            msg = 'Ubah'
        }else{
            msg = 'Tambah'
        }
        return(
            <div className="padding-content">
                <Header navbar={true} location={`/exam/${this.state.assessment_id}`} />
                <div className="container">
                    <div className="margin-content">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">{msg} Tugas</label>   
                                    <div className="row">
                                        <div className="col-sm-12 margin-top-10">
                                            <div className="content-input">
                                                <label className="content-label">Tipe Tugas</label>
                                                <Select
                                                    isClearable
                                                    className= "select-list"
                                                    classNamePrefix= "select"
                                                    placeholder= "Pilih tipe tugas"
                                                    name= "exam_type"
                                                    options={this.state.examTypes}
                                                    onChange={(event) => this.props.handleEvent(event.value, 'exam_type')}
                                                    value={this.state.examTypes.find((element) => { return element.value == exam_type })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="content-input margin-top-4">
                                                <label className="content-label">Judul Tugas</label>
                                                <input 
                                                    className="fullwidth" 
                                                    placeholder="Contoh: Produk 1" 
                                                    name="name"
                                                    onChange={(event) => {this.props.handleEvent(event.target.value, 'name')}}
                                                    defaultValue={name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom margin-vert-6"></div>
                                    <WorkStep />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="margin-top-6">
                                                <button className="submit-btn" onClick={this.onSubmit}>Lanjut</button>
                                            </div>
                                        </div>
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
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    getNew,
    handleEvent,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Add)