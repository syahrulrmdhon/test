import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from '../../components/Content/Content'
import Axios from 'axios'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'

export default class Detail extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeMenu: 1,
      homeroomTeacherActiveTab : 1,
      startDate: null,
      endDate: null,
      studentId: this.props.match.params.id,
      profile: { 
        user: {
          full_name: '',
          phone_number: '',
          nis: '',
          nisn: '',
          class_rank: {
            rank: null
          },
          addresses: [{
            full_address: ''
          }],
        },
        parents: {
          father: {},
          mother: {}
        }
      }
    }

    this.schoolId = localStorage.getItem("school_list")
    this.token = localStorage.getItem("token")
    this.authorization = `Bearer ${this.token}`
    this.baseUrl = `${process.env.API_URL}v1/students/${this.state.studentId}`
    this.toggleMenu = this.toggleMenu.bind(this)
    this.homeroomTeacherTab =  this.homeroomTeacherTab.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.getStudentDetail = this.getStudentDetail.bind(this)
  }

  componentDidMount() {
    this.getStudentDetail()
  }
  
  getStudentDetail() {
    const url = `${this.baseUrl}?school_id=${this.schoolId}`

    return Axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.authorization
      }
    })
    .then(response => {
      this.setState({profile: response.data.data})
    })
  }

  toggleMenu(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu
      })
    }
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

  render() {
    const tabMenu = ['Rincian Nilai', 'Rincian Absensi', 'Catatan Wali Kelas'];

    return (
      <div className="detail bg-grey">
        <Header />
        <div className="bg-white">
          <div className="back">
            <Link to="/murid">&lt; Kembali</Link>
          </div>
        </div>
        <div className="content">
          <div className="row detail-menu">
            <div className="offset-2 col-10 padding-left-0">
              <TabMenu 
                menu={tabMenu}
                activeMenu={this.state.activeMenu}
                toggle={this.toggleMenu} />
            </div>
          </div>
          <Content 
            activeTab={this.state.activeMenu}
            dataProfile={this.state.profile}
            subjects={this.state.subjects} 
            studentId={this.state.studentId} />
        </div>
      </div>
    )
  }
}