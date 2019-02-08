import React, { Component } from 'react';
import './../../styles/beri-nilai/main.scss'
import Header from '../global/header'
import TabMenu from '../../components/TabDetail/TabDetail'
import TopContent from './top-content'
import BottomContent from './bottom-content'
import { TabContent, TabPane } from 'reactstrap'
import { apiClient } from '../../utils/apiClient'
import RightContent from './right-content'
export default class Nilai extends Component {
  constructor(props) {
    super(props)


    this.state = {
      score:[],
      activeMenu: 1,
      exam:{},
      participant_passed:{},
      participant_not_passed:[]
  }
  this.toggleMenu = this.toggleMenu.bind(this)
  this.fetchData = this.fetchData.bind(this)
  }
  toggleMenu(menu) {
    if (this.state.activeMenu !== menu) {
      this.setState({
        activeMenu: menu
      })
    }
  }
  componentDidMount(){
    // this.props.getParticipantsResult()
    this.fetchData()
}

fetchData(){
    let url = 'v1/assessments/6ae41268-d737-4a87-bb54-1a9cfd1d69f8/exams/b4aa7bda-f96d-4665-8dc3-fe263ed670ed/exam_classes/1a5e496b-ffc4-445f-93b4-ef324e80e31c/participant_results'
    apiClient('get', url).then(res => {
        console.log(res.data.data.participants.score_ranges, 'here at')
        this.setState({
            score:res.data.data.participants,
            exam:res.data.data.exam,
            participant_passed:res.data.data.participants.passed,
            participant_not_passed: res.data.data.participants.not_passed
        })
    })
        .catch(err => {
            let response = err.response
            let data = response.data
     
        })

}


  render() {
    const tabMenu = ['Perolehan Nilai', 'Evaluasi Soal'];
    console.log(this.state.score.score_ranges,"my score")
    return (
      <div className="details-nilai bg-grey">
        <Header navbar={false} />
        <div className="content-wrapper content-wrap-custom-size ">
          <div className="row detail-menu">
            <div className="offset-2 col-sm-10 tab-menu tab-position">
              <TabMenu
                menu={tabMenu}
                activeMenu={this.state.activeMenu}
                toggle={this.toggleMenu}
              />
            </div>
          </div>
          <TabContent activeTab={this.state.activeMenu}>
            <TabPane tabId={1} >
              <div className="row">
                <div className="col-sm-12">
                  <div className="content-block main-block main-height">
                  <TopContent
                    chart={this.state.score.score_ranges}
                    exam={this.state.exam}
                    participant_passed={this.state.participant_passed}
                    participant_not_passed={this.state.participant_not_passed}
                  />
                  </div>
                </div>
              </div>
              <div className="row margin-top-4 padding-bottom-6 ">
                <div className="col-sm-9">
                  <div className="content-block   main-block">
                  <BottomContent />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="content-block main-block padding-5">
                  <RightContent
                      participant_not_passed={this.state.participant_not_passed}
                  />

                  </div>
                </div>
              </div>
              
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}


