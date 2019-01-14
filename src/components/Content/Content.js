import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'

import AbsenceTable from './AbsenceTable'
import HomeroomTeacher from './HomeroomTeacher'
import LeftSide from '../LeftSide/LeftSide'
import Profile from './ProfileDetail'
import RightSide from '../RightSide/RightSide'
import ScoreTable from './ScoreTable'
import Tab from '../TabContent/TabContent'

export default class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: 1,
      homeroomTeacherActiveTab: 1,
      startDate: null,
      endDate: null
    };
    this.toggle = this.toggle.bind(this)
    this.homeroomTeacherTab = this.homeroomTeacherTab.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
  }

  homeroomTeacherTab(tab) {
    if (this.state.homeroomTeacherActiveTab !== tab) {
      this.setState({
        homeroomTeacherActiveTab: tab
      })
    }
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  
  render() {
    const tabScore = ['Pengetahuan', 'Keterampilan', 'Sikap'];
    const tabHomeRoom = ['Catatan Wali Kelas', 'Estrakurikuler', 'Prestasi']

    return (
      <div>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane tabId={1}>
            <div className="row rounded-10">
              <LeftSide>
                <Profile />
              </LeftSide>
              <RightSide>
                <Tab
                  tab={tabScore}
                  className="total-score"
                  toggle={this.toggle}
                  activeTab={this.state.activeTab} />
                <ScoreTable activeTab={this.state.activeTab} />
              </RightSide>
            </div>
          </TabPane>
          <TabPane tabId={2}>
            <div className="row rounded-10 absences-detail">
              <LeftSide>
                <div className="absences-detail__title">
                  Rekapitulasi Absensi
                  </div>
                <Form className="absences-detail__form-date">
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Dari Tanggal</Label>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStartDate}
                      className="absences-detail__input" />
                    <i className="absences-detail__angle-down-date fa fa-angle-down"></i>
                  </FormGroup>
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Sampai Tanggal</Label>
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleChangeEndDate}
                      className="absences-detail__input" />
                    <i className="absences-detail__angle-down-date fa fa-angle-down"></i>
                  </FormGroup>
                </Form>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Hadir</div>
                  <div className="absences-detail__amount">39</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Sakit</div>
                  <div className="absences-detail__amount">2</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Izin</div>
                  <div className="absences-detail__amount">1</div>
                </div>
                <div className="absences-detail__total-wrapper">
                  <div className="absences-detail__label">Alpha</div>
                  <div className="absences-detail__amount">7</div>
                </div>
              </LeftSide>
              <RightSide>
                <Form inline className="absences-detail__form-date">
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Status</Label>
                    <Input className="absences-detail__select" type="select">
                      <option>Semua Status</option>
                      <option>Alpha</option>
                      <option>Izin</option>
                      <option>Sakit</option>
                    </Input>
                    <i className="absences-detail__angle-down fa fa-angle-down"></i>
                  </FormGroup>
                  <FormGroup className="absences-detail__form-group">
                    <Label className="absences-detail__filter-label" for="exampleSelect">Mata Pelajaran</Label>
                    <Input className="absences-detail__select" type="select">
                      <option>Pilih Mata Pelajaran</option>
                      <option>Fisika Dasar</option>
                      <option>Matematika</option>
                    </Input>
                    <i className="absences-detail__angle-down fa fa-angle-down"></i>
                  </FormGroup>
                </Form>
                <AbsenceTable />
              </RightSide>
            </div>
          </TabPane>
          <TabPane tabId={3}>
            <div className="row rounded-10 homeroom-teacher">
              <LeftSide>
                <Profile />
              </LeftSide>
              <RightSide>
                <Tab
                  tab={tabHomeRoom}
                  className="total-score"
                  toggle={this.homeroomTeacherTab}
                  activeTab={this.state.homeroomTeacherActiveTab} />
                <HomeroomTeacher activeTab={this.state.homeroomTeacherActiveTab} />
              </RightSide>
            </div>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
