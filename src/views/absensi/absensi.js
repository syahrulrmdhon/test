import React, { Component } from 'react'
import './../../styles/absensi.css'

import Header from '../global/header'
import MenuBar from '../global/navbar'

// import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Table, TabContent, Card, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default class Absensi extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {

  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }
  handleDayClick(day) {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }
  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
  handleShowCalendar() {
    console.log(DayPicker);
    this.setState({render: DayPicker});
  }
  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div className="absensi">
        <Header></Header>
        <MenuBar></MenuBar>
        <br /><br />
        <div className="content">
          <div className="row">
            <div className="col-lg-10 row">
              <div className="col-3 left-content">
                <h5><strong>Filter</strong></h5>
                <br />
                <form onSubmit={this.handleSubmit}>
                  <label onClick={this.handleShowCalendar.bind(this.DayPicker)}>Pilih Range Tanggal</label>
                  <DayPicker
                    className="Range"
                    numberOfMonths={1}
                    fromMonth={from}
                    selectedDays={selectedDays}
                    disabledDays={disabledDays}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                    onDayMouseEnter={this.handleDayMouseEnter}
                  />
                  <label>
                    {/* {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'} */}
                    {from &&
                      to &&
                      `${from.toLocaleDateString()} s/d ${to.toLocaleDateString()}`
                    }
                    {' '}
                    {from &&
                      to && (
                        <button className="btn-green" onClick={this.handleResetClick}>
                          Reset
                      </button>
                      )
                    }
                  </label>
                  <br /><br />
                  <label>Kelas</label>
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="x2">X IPA 2</option>
                    <option value="x1">X IPA 1</option>
                  </select>
                  <br /><br />
                  <label>Mata Pelajaran</label>
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="bi">Bahasa Indonesia</option>
                    <option value="mtk">Matematika</option>
                    <option value="english">Bahasa Inggris</option>
                  </select>
                  <br /><br />
                  <button type="submit" className="btn-green">Filter</button>
                </form>

              </div>
              <div className="col-9 center-content">
                <h5><strong>Absensi Harian</strong></h5>
                <br />
                <Table bordered striped responsive hover sm>
                  <thead>
                    <tr>
                      <th>NIS</th>
                      <th>NISN</th>
                      <th>Nama Murid</th>
                      <th>Kehadiran Rata-Rata</th>
                      <th>Nilai Rata-Rata</th>
                      <th>Peringkat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">13010036</th>
                      <td>36010033</td>
                      <td>Muhammad Jihaduddin Fikri Amrillah</td>
                      <td>87%</td>
                      <td>78</td>
                      <td>13</td>
                    </tr>
                    <tr>
                      <th scope="row">13010036</th>
                      <td>36010033</td>
                      <td>Muhammad Jihaduddin Fikri Amrillah</td>
                      <td>87%</td>
                      <td>78</td>
                      <td>13</td>
                    </tr>
                    <tr>
                      <th scope="row">13010036</th>
                      <td>36010033</td>
                      <td>Muhammad Jihaduddin Fikri Amrillah</td>
                      <td>87%</td>
                      <td>78</td>
                      <td>13</td>
                    </tr>
                    <tr>
                      <th scope="row">13010036</th>
                      <td>36010033</td>
                      <td>Muhammad Jihaduddin Fikri Amrillah</td>
                      <td>87%</td>
                      <td>78</td>
                      <td>13</td>
                    </tr>
                    <tr>
                      <th scope="row">13010036</th>
                      <td>36010033</td>
                      <td>Muhammad Jihaduddin Fikri Amrillah</td>
                      <td>87%</td>
                      <td>78</td>
                      <td>13</td>
                    </tr>
                  </tbody>
                </Table>

              </div>
            </div>
            <div className="col-lg-2 right-content">
              <div className="card">
                <h6><strong>Total Kehadiran</strong></h6>
                <h3><strong>19</strong></h3>
                <p>Murid</p>
              </div>
              <br />
              <div className="card">
                <h6><strong>Total Ketidakhadiran</strong></h6>
                <h3><strong>1</strong></h3>
                <p>Murid</p>
              </div>
              <br />
              <div className="card">
                <h6><strong>Persentase Kehadiran</strong></h6>
                <h3><strong>99%</strong></h3>
                <p>Murid</p>
              </div>
            </div>
          </div>
        </div>
        <br /> <br /> <br />
      </div >
    )
  }
}
