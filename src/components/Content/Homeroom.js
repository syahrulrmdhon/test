import React, { Component } from 'react'

import { TabContent, TabPane, Input, Button, Form } from 'reactstrap'
import Select from 'react-select'
import { getExtracurriculars, handleEvent, addNote, handleRemoveNote } from '../../redux-modules/modules/studentDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { apiClient } from '../../utils/apiClient'
var FontAwesome = require('react-fontawesome')

class Homeroom extends Component {
  constructor () {
    super()
    this.state = {
      extracurriculars: [],
      notes: []
    }
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(index, noteId, field) {
    this.props.handleRemoveNote(index, noteId, field)
    const url = `v1/students/${this.props.studentId}/destroy_note`
    const data = {
      "achievement_type": field,
      "achievement_id": noteId
    }

    apiClient('delete', url, data)
  }

  render() {
    let homeroomId = JSON.parse(localStorage.getItem("homeroom_class")) && JSON.parse(localStorage.getItem("homeroom_class")).id
    let inputHomeroomNote = this.props.inputHomeroomNote
    let data = this.props.notes
    let extracurriculars = []
    let notes = []
    let body = []

    if (data) {
      if (data.notes) {
        if (this.props.activeTab === 2) {
          extracurriculars = data.extracurriculars
          extracurriculars.map(extracurricular => {
            extracurricular.isDisabled = false
          })
          data.notes.map((note, index) => {
            let selectedExtracurricular = extracurriculars.find(extracurricular => {return extracurricular.value === note.extracurricular_id}) || null
            if (selectedExtracurricular) {
              selectedExtracurricular.isDisabled = true
            }
            notes.push(
              <div key={index} className="mb-4 position-relative">
                <div className="note-wrapper">
                  <Select 
                    key={Math.random()}
                    classNamePrefix="select"
                    value={selectedExtracurricular}
                    onChange={event => this.props.handleEvent(event.value, 'extracurricular_id', {id: note.id, order: index})}
                    options={this.props.notes.extracurriculars}
                    placeholder='Pilih Tipe Ekstrakurikuler'
                    isDisabled={!homeroomId} />  
                  <Input 
                    onChange={(event) => this.props.handleEvent(event.target.value, 'description', {id: note.id, order: index})} 
                    value={note.description} 
                    className="homeroom-teacher__input mt-3" 
                    rows="5" 
                    type="textarea" 
                    placeholder="Tulis Deskripsi Estrakurikuler disini ..."
                    disabled={!homeroomId} />
                  </div>
                  <FontAwesome name="trash" className="remove" onClick={() => {this.handleRemove(index, note.id, 'extracurricular')}}/>
              </div>
            )
            let noteId = {}

            if (note.id) {
              noteId = {
                id: note.id
              }
            }
            body.push({extracurricular_id: note.extracurricular_id, description: note.description, id: (note.id) ? note.id : null, order: index})
          })
        }
        else if (this.props.activeTab === 3) {
          data.notes.map((note, index) => {
            notes.push(
              <div key={index} className='margin-bottom-6'>
                <Input disabled={!homeroomId} onChange={event => this.props.handleEvent(event.target.value, 'title', {id: note.id, order: index})} className="homeroom-teacher__input mt-0" type="text" placeholder="Tulis Judul Prestasi disini ..." value={note.title} />
                <Input disabled={!homeroomId} onChange={event => this.props.handleEvent(event.target.value, 'description', {id: note.id, order: index})} className="homeroom-teacher__input mt-4" rows="5" type="textarea" placeholder="Tulis Deskripsi Prestasi disini ..." value={note.description} />
              </div>
            )
            body.push({title: note.title, description: note.description, id: (note.id) ? note.id : null})
          })
        }
      }
    }

    return (
      <div>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane tabId={1}>
            <Form>
              <Input 
                className="homeroom-teacher__input" 
                rows="10"
                type="textarea"
                placeholder="Tulis Catatan Wali Kelas disini ..."
                onChange={this.props.changed}
                value={inputHomeroomNote.length !== 0 ? inputHomeroomNote[0].description : ''} 
                disabled={!homeroomId}/>           
            </Form>
            <Button 
              className="homeroom-teacher__save"
              onClick={this.props.clicked}
              disabled={this.props.disabled}>
              Simpan
            </Button> 
          </TabPane>
          <TabPane tabId={2}>
            <Form className="homeroom-teacher__form">
              {notes}
              {
                body.length < extracurriculars.length &&
                <div onClick={() => this.props.addNote('extracurricular')} className="homeroom-teacher__add-extracurricular">+ <span>Tambah Estrakurikuler lainnya</span></div>
              }
            </Form>
            <Button 
              className="homeroom-teacher__save"
              onClick={() => this.props.saveAchievement('extracurricular', 'user_extracurriculars', body)}
              disabled={data.disabled}>
              Simpan
            </Button>
          </TabPane>
          <TabPane tabId={3}>
            <Form className="homeroom-teacher__form">
              {notes}
              <div onClick={() => this.props.addNote('daily_result')} className="homeroom-teacher__add-extracurricular">+ <span>Tambah Prestasi lainnya</span></div> 
            </Form>
            <Button 
              onClick={() => this.props.saveAchievement('daily_result', 'user_achievements', body)} 
              className="homeroom-teacher__save"
              disabled={data.disabled}>
              Simpan
            </Button>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  notes: state.studentDetail,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getExtracurriculars,
    handleEvent,
    addNote,
    handleRemoveNote
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Homeroom)