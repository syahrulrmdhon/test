import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/student/detail.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import Content from '../../components/Content/Content'
import { apiClient } from '../../utils/apiClient'
import Page from './../../components/Title'

export default class Detail extends Component {
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
      this.setState({ profile: response.data.data })
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
    const tabMenu = [
      {
        label: 'Rincian Nilai'
      },
      {
        label: 'Rincian Absensi'
      },
      {
        label: 'Catatan Wali Kelas'
      },
    ];
    const menu = this.props.location.state.status
    let path = ''
    if (menu === 'absensi') {
      path = '/absen'
    } else if (menu === 'rapor') {
      path = '/rapor'
    } else if (menu === 'daftar-nilai') {
      path = '/daftar-nilai'
    } else {
      path = '/murid'
    }

    return (
      <Page title='Detail Murid'>
        <div className="detail bg-grey">
          <Header navbar={false} location={path} />
          <div className="content-wrapper content-wrap-custom-size">
            <div className="row detail-menu">
              <div className="offset-2 col-10 tab-menu">
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
      </Page>
    )
  }
}