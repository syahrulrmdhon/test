import React, { Component } from 'react'

import { TabContent, TabPane, Input, Button, Form } from 'reactstrap'

export default class Homeroom extends Component {
  
  render() {
    console.log(this.props.extracurricularNotes)
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
                value={this.props.inputHomeroomNote} />           
            </Form>
            <Button 
              className="homeroom-teacher__save"
              onClick={this.props.clicked}
              disabled={this.props.disabled}>
              Simpan
            </Button> 
          </TabPane>
          <TabPane tabId={2}>
            <Form>
              {
                this.props.extracurricularNotes.map((note, index) => {
                  return <div key={index}>
                    <Input className="homeroom-teacher__select" type="select" name="select">
                      {
                        this.props.extracurriculars.map((extracurricular, index) => {
                          return <option key={index}>{extracurricular.name}</option>
                        })
                      }
                    </Input>
                    <i className="homeroom-teacher__angle-down fa fa-angle-down"></i>
                    <Input value={note.description} onChange={(event) => this.props.changeExtracurricularNote(event, note.id)} className="homeroom-teacher__input mt-3" rows="5" type="textarea" placeholder="Tulis Deskripsi Estrakurikuler disini ..."/> 
                  </div>
                })
              }
              <div className="homeroom-teacher__add-extracurricular">+ <span>Tambah Estrakurikuler lainnya</span></div>
            </Form>
            <Button className="homeroom-teacher__save">Simpan</Button>

          </TabPane>
          <TabPane tabId={3}>
            <Input className="homeroom-teacher__input" type="text" placeholder="Tulis Judul Prestasi disini ..."></Input>
            <Input className="homeroom-teacher__input mt-4" rows="5" type="textarea" placeholder="Tulis Deskripsi Prestasi disini ..."/> 
            <div className="homeroom-teacher__add-extracurricular">+ <span>Tambah Prestasi lainnya</span></div>
            <Button className="homeroom-teacher__save">Simpan</Button>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
