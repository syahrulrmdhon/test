import React, { Component } from 'react'

import Header from '../global/header';
import Filter from './filter'
import Content from './content'
import '../../styles/exam.scss'
import { apiClient } from "../../utils/apiClient"
import { confirmAlert } from 'react-confirm-alert'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: this.props.match.params.id,
      exams: {
        size: 0,
        total_entries: 0,
        total_pages: 0,
        entries: []
      },
      classes: [],
      selectedClass: null,
      assessment: {
        name: ''
      }
    }

    this.addExam = this.addExam.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
    this.deleteExam = this.deleteExam.bind(this)
    this.delete = this.delete.bind(this)
    this.toEdit = this.toEdit.bind(this)
    this.getAssessments = this.getAssessments.bind(this)
    this.filterClass = this.filterClass.bind(this)
  }

  componentDidMount() {
    this.getAssessments()
  }

  onChangePage(e, classes, assessment, exam, flag) {
    if(flag===true){
      this.props.history.push({
        pathname: '/assessment/' + assessment + '/exam/' + exam + '/class/' + classes + '/flag/' + flag,
        state: { assessment: assessment, exam: exam, class: classes, flag: flag }
      })
    } else {
      this.props.history.push({
        pathname: '/beri-nilai/' + assessment + '/exam/' + exam + '/class/' + classes + '/flag/' + flag,
        state: { assessment: assessment, exam: exam, class: classes, flag: flag }
      })
    }
  }

  toEdit(id) {
    this.props.history.push({
      pathname:`/edit/${this.state.assessmentId}/exam/${id}`
   })
  }

  getAssessments() {
    let params = {}

    if (this.state.selectedClass !== null) {
      params['class_id'] = this.state.selectedClass.value
    }

    const path = `v1/assessments/${this.state.assessmentId}`

    apiClient('get', path, false, params).then(response => {
      response.data.data.exams.entries.map(function (data, index) {
        data && data.classses.map(function (i, j) {
          i.assessment_id = data.assessment_id;
          i.exam_id = data.id;
          i.flag = data.include_question
        }, this)
      }, this)
      this.setState({ exams: response.data.data.exams, classes: response.data.data.classes, assessment: response.data.data.assessment})
    })
  }

  addExam() {
    this.props.history.push({pathname: `/create-exam/${this.state.assessmentId}`})
    this.getAssessments()
  }

  deleteExam(id) {
    const path = `v1/assessments/${this.state.assessmentId}/exams/${id}`
    
    apiClient('delete', path).then(() =>{
      this.getAssessments()
    })
  }

  filterClass(event) {
    let params = {}

    if (event) {
      this.setState({selectedClass: event})
      params['class_id'] = event.value
    }
  }
  
  delete(value) {
    confirmAlert({
      customUI: ({ onClose, onConfirm}) => {
        return (
          <div className="create-exam" key={Math.random()}> 
            <div className="react-confirm-alert modal-alert ">
              <div className="react-confirm-alert-body">
                  <div className="header align-center">
                    <h1>Apakah anda yakin ingin menghapus tugas ini?</h1>
                  </div>
                  <div className="react-confirm-alert-button-group toggle">
                    <div className="align-center fullwidth">
                      <a href="javascript:void(0);" onClick={onClose} className="btn default">Tidak</a>
                      <a href="javascript:void(0);" className="btn green" onClick={() => { this.deleteExam(value); onClose(); }}>Ya</a>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )
      },
    })
  }
  
  render() {
    return (
      <div className="padding-content exam">
        <Header />
        <div className="margin-8">
          <div className="content-block main-block">
            <div className="row">
              <div className="col-sm-2 col-sm-2-custom left-block">
                <Filter classes={this.state.classes} filter={this.filterClass} selectedClass={this.state.selectedClass} getExams={this.getAssessments}/>
              </div>
              <div className="col-sm-10 col-sm-10-custom right-block">
                <Content
                  exams={this.state.exams}
                  addExam={this.addExam}
                  page={this.onChangePage}
                  assessmentId={this.state.assessmentId}
                  delete={this.delete}
                  edit={this.toEdit}
                  assessment={this.state.assessment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}