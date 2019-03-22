import React, { Component } from "react";

import { apiClient } from '../../utils/apiClient'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDescription, handleChange } from './../../redux-modules/modules/description'
import { confirmAlert } from 'react-confirm-alert'; // Import

import "./../../styles/student/description.scss";

class Form extends Component {
  constructor(props) {
    super(props)
      this.state = {
        description: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleSave = this.handleSave.bind(this)
  }

  handleSubmit(description) {
    const url = `v1/students/${this.props.studentId}/score_details/${this.props.subjectId}/description?category=${this.props.category}`
    const body = {
      user_score: {
        description: description
      }
    }
    apiClient('post', url, body).then(() => {
      this.props.history.push({
        pathname: `detail/${this.props.studentId}`,
      })
    })
  }

  handleOnChange(event) {
    const description = event.target.value

    this.setState({description: description})
  }

  handleSave() {
    confirmAlert({
      customUI: ({ onClose, onConfirm }) => {
          return (
              <div className="react-confirm-alert modal-alert">
                  <div className="react-confirm-alert-body">
                      <div className="header align-center">
                          <h1>Apakah anda yakin?</h1>
                      </div>
                      <div className="react-confirm-alert-button-group toggle">
                          <div className="align-center fullwidth">
                              <a href="javascript:void(0);" className="btn default" onClick={onClose}>Belum Pasti</a>
                              <a href="javascript:void(0);" className="btn green" onClick={() => { this.props.handleSubmit(this.props.description, this.props.studentId, this.props.subjectId, this.props.category); onClose(); }}>Yakin</a>
                          </div>
                      </div>
                  </div>
              </div>
          )
      },
  })
  }

  componentDidMount() {
    this.props.getDescription({
      studentId: this.props.studentId,
      subjectId: this.props.subjectId,
      params: {
        category: this.props.category,
      }
    })
  }

  render() {

    return (
      <div className="main-block">
        <div className="score-description__field-label">Deskripsi</div>
        <textarea
          className="score-description__textarea"
          placeholder="Tulis deskripsi …"
          onChange={event => this.props.handleChange({value: event.target.value})}
          value={this.props.description || ''} />
        <input
          type="submit"
          value="Submit"
          className="btn-green"
          onClick={this.handleSave}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  description: state.description && state.description.description
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getDescription,
  handleChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);