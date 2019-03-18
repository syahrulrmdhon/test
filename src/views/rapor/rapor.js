import React, { Component } from 'react'
import './../../styles/score.scss'
import './../../styles/global/component.css'
import Header from '../global/header'
import FilterRapor from './filter'
import { apiClient } from '../../utils/apiClient'
import Page from './../../components/Title'
import NavToggle from './nav-toggle'
import NavTab from './nav-tab'
import { getClassName } from './../../utils/common'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class Rapor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      tableKnowledge: [],
      tableSkill: [],
      tableAttitude: [],
      nameClass: '',
      dTableKnowledge: [],
      dTableSkill: [],
      dTableAttitude: [],
    }
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.nameClicked = this.nameClicked.bind(this)
  }

  componentDidMount() {
    getClassName.call(this)
    this.getData()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      }, () => { this.getData() })
    }
  }

  getData() {
    let activeTab = this.state.activeTab

    let rapor = _.get(this.props, 'rapor', {})
    console.log('getData', rapor)
    let selectedStatus = rapor ? rapor.selectedStatus : ''
    let selectedSemester = rapor ? rapor.selectedSemester : ''

    let class_id = ''
    let params = {}

    let category = 'knowledge'
    switch (activeTab) {
      case '2':
        category = 'skill'
        break
      case '3':
        category = 'attitude'
        break
    }

    if (selectedSemester != '') {
      params['school_period_id'] = selectedSemester
    }
    if (category != '') {
      params['category'] = category
    }
    if (class_id == '') {
      params['class_id'] = localStorage.getItem('class_id')
    }
    if (selectedStatus != '') {
      params['risk_status'] = selectedStatus
    }

    apiClient('get', 'v1/scores/report', false, params).then(res => {
      const data = _.get(res, 'data.data', {})
      console.log('data', data)
      const { users } = data || []

      switch (category) {
        case 'knowledge':
          this.setState({
            tableKnowledge: users,
            dTableKnowledge: users[0] //take data header table
          })
          break
        case 'skill':
          this.setState({
            tableSkill: users,
            dTableSkill: users[0] //take data header table
          })
          break
        case 'attitude':
          this.setState({
            tableAttitude: users,
            dTableAttitude: users[0] //take data header table
          })
          break
      }
    })
  }

  handleSubmit() {
    this.getData()
  }

  nameClicked(e, id) {
    e.preventDefault()
    this.props.history.push({
      pathname: 'detail/' + id,
      state: { status: 'rapor' }
    })
  }

  render() {
    return (
      <Page title="Rapor">
        <div className='row-score'>
          <div className='padding-content'>
            <Header />
            <div className='margin-content'>
              <div className='content-block main-block'>
                <div className='margin-0'>
                  <div className='col-sm-3 left-block'>
                    <FilterRapor
                      handleSubmit={this.handleSubmit}
                      handlePrint={this.handlePrint}
                    />
                  </div>
                  <div className='col-sm-9 right-block w-100'>
                    <div className='padding-top-6 h-100'>
                      <div className='row'>
                        <div className='col-sm-4 col-md-4 col-lg-3'>
                          <label className='header-title'>Rapor Kelas {this.state.nameClass}</label>
                        </div>
                        <div className='col-sm-8 col-md-8 col-lg-9'>
                          <NavToggle
                            activeTab={this.state.activeTab}
                            toggle={this.toggle}
                          />
                        </div>
                      </div>
                      <NavTab
                        activeTab={this.state.activeTab}
                        tableKnowledge={this.state.tableKnowledge}
                        dTableKnowledge={this.state.dTableKnowledge}
                        nameClicked={this.nameClicked}
                        tableSkill={this.state.tableSkill}
                        dTableSkill={this.state.dTableSkill}
                        tableAttitude={this.state.tableAttitude}
                        dTableAttitude={this.state.dTableAttitude}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  rapor: state.rapor //rapor dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Rapor)