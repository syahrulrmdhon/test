import React, { Component } from 'react'

import { TabContent, TabPane, Input, Button, Form } from 'reactstrap'
import Select from 'react-select'
import { getData, getExtracurriculars, handleEvent, handleNumber } from './../../redux-modules/modules/teacherNote'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Homeroom extends Component {

  render() {
    let inputHomeroomNote = this.props.inputHomeroomNote
    // let inputExtracurricularNote = this.props.extracurricularNotes
    let achievements = this.props.achievements
    let data = this.props.notes
    let extracurriculars = []
    let notes = []
    // let disable = true
    let body = []
    
    if (data) {
      extracurriculars = data.extracurriculars
      if (data.notes) {
        data.notes.map((note, index) => {
          notes.push(
            <div key={index}>
              <Select
                // className="create-exam__input"
                classNamePrefix="select"
                value={extracurriculars.find(extracurricular => {return extracurricular.value === note.extracurricular_id}) || null}
                onChange={event => this.props.handleEvent(event.value, 'extracurricular_id', note.id)}
                options={extracurriculars}
                placeholder='Pilih Tipe Ekstrakurikuler' />  
              <Input value={note.description} onChange={event => this.props.handleEvent(event.target.value, 'description', note.id)} className="homeroom-teacher__input mt-3" rows="5" type="textarea" placeholder="Tulis Deskripsi Estrakurikuler disini ..."/>   
            </div>
          )
          let noteId = {}
          if (note.id) {
            noteId = {
              id: note.id
            }
          }
          body.push({extracurricular_id: note.extracurricular_id, description: note.description, id: (note.id) ? note.id : ''})
        })
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
                value={inputHomeroomNote.length !== 0 ? inputHomeroomNote[0].description : ''} />           
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
              <div onClick={this.props.addExtracurricularNote} className="homeroom-teacher__add-extracurricular">+ <span>Tambah Estrakurikuler lainnya</span></div>
            </Form>
            <Button className="homeroom-teacher__save" onClick={() => this.props.saveAchievement('extracurricular', 'user_extracurriculars', body)}>Simpan</Button>

          </TabPane>
          <TabPane tabId={3}>
          <Form className="homeroom-teacher__form">

          {
            achievements.length === 0 ?
              <div>
                <Input className="homeroom-teacher__input" type="text" placeholder="Tulis Judul Prestasi disini ..."></Input>
                <Input className="homeroom-teacher__input mt-4" rows="5" type="textarea" placeholder="Tulis Deskripsi Prestasi disini ..."/> 
              </div>
            :
              achievements.map(achievement => {
                return (
                  <div key={achievement.id} className='margin-bottom-6'>
                    <Input onChange={(event) => this.props.changeAchievementNote(event, achievement.id, 'title')} className="homeroom-teacher__input mt-0" type="text" placeholder="Tulis Judul Prestasi disini ..." value={achievement.title} />
                    <Input onChange={(event) => this.props.changeAchievementNote(event, achievement.id, 'description')} className="homeroom-teacher__input mt-4" rows="5" type="textarea" placeholder="Tulis Deskripsi Prestasi disini ..." value={achievement.description} />
                  </div>
                )
              })
            }
            
            <div className="homeroom-teacher__add-extracurricular">+ <span>Tambah Prestasi lainnya</span></div>
            </Form>
            <Button onClick={() => this.props.saveAchievement('daily_result', 'achievements')} className="homeroom-teacher__save">Simpan</Button>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  notes: state.teacherNote,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getData,
    getExtracurriculars,
    handleEvent
  }, dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Homeroom)