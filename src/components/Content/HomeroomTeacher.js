import React, { Component } from 'react'

import { TabContent, TabPane, Input, Button, Form } from 'reactstrap'

export default class AbsenceTable extends Component {
  render() {
    return (
      <div>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane tabId={1}>
            <Form>
              <Input className="homeroom-teacher__input" rows="10" type="textarea" placeholder="Tulis Catatan Wali Kelas disini ..."/> 
              <Button className="homeroom-teacher__save">Simpan</Button> 
            </Form>
          </TabPane>
          <TabPane tabId={2}>
            <Form>
              <Input className="homeroom-teacher__select" type="select" name="select">
                <option>OSIS</option>
                <option>PRAMUKA</option>
                <option>BASKET</option>
                <option>FUTSAL</option>
              </Input>
              <i className="homeroom-teacher__angle-down fa fa-angle-down"></i>
              <Input className="homeroom-teacher__input mt-3" rows="5" type="textarea" placeholder="Tulis Deskripsi Estrakurikuler disini ..."/> 
              <div className="homeroom-teacher__add-extracurricular">+ <span>Tambah Estrakurikuler lainnya</span></div>
              <Button className="homeroom-teacher__save">Simpan</Button>
            </Form>
          </TabPane>
          <TabPane tabId={3}>
            <Input className="homeroom-teacher__input" type="text" placeholder="Tulis Judul Prestasi disini ..."></Input>
            <Input className="homeroom-teacher__input mt-3" rows="5" type="textarea" placeholder="Tulis Deskripsi Prestasi disini ..."/> 
            <div className="homeroom-teacher__add-extracurricular">+ <span>Tambah Prestasi lainnya</span></div>
            <Button className="homeroom-teacher__save">Simpan</Button>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
