import React, { Component } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'

import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from './content'
import { apiClient } from '../../utils/apiClient'

export default class New extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeMenu: 1,
      startDate: null,
      endDate: null,
      studentId: this.props.match.params.id,
      profile: { 
        user: {
          full_name: '',
          phone_number: '',
          nis: '',
          nisn: '',
          addresses: [{
            full_address: {}
          }],
        },
        class_rank: {
          rank: null
        },
        parents: {
          father: {},
          mother: {}
        }
      }
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.getStudentDetail = this.getStudentDetail.bind(this)
  }

  componentDidMount() {
    this.getStudentDetail()
  }
  
  getStudentDetail() {
    const url = `v1/students/${this.state.studentId}`

    apiClient('get', url).then(response => {
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
        <Header navbar={false} />
       
        <div className="content-wrapper content-wrap-custom-size ">
          <Content 
            dataProfile={this.state.profile}
            subjects={this.state.subjects} 
            studentId={this.state.studentId}
        

        />
        </div>
      </div>
    )
  }
}