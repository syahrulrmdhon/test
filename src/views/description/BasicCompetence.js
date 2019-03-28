import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames';
import _ from 'lodash'

import Competencies from './Competencies'
import { getCompetencies } from './../../redux-modules/modules/description'

class BasicCompetence extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activeTab: ''
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.props.getCompetencies({
        studentId: this.props.studentId,
        subjectId: this.props.subjectId,
        params: {
          category: this.props.category,
          predicate: tab
        }
      })

      this.setState({
        activeTab: tab
      })
    }
  }

  componentDidMount() {
    this.props.getCompetencies({
      studentId: this.props.studentId,
      subjectId: this.props.subjectId,
      params: {
        category: this.props.category,
        predicate: ''
      }
    })
  }

  render() {
    let numberOfBasicCompetencies = this.props.numberOfBasicCompetencies
    let basicCompetencies= this.props.basicCompetencies || []

    return (
      <div className="main-block">
        <div className="score-description__title">Daftar KD</div>
        <div className="score-description__basic-competencies">
          {
            (numberOfBasicCompetencies > 0) ?
              <div className="score-description__basic-competencies-status-wrapper">
                Semua
                <span className="score-description__basic-competencies-total">
                  ({numberOfBasicCompetencies})
                </span>
              </div>
            :
              <div className="empty">Tidak Ada Data</div>
          }

          <div className="score-description__basic-competencies-wrapper">
            {basicCompetencies.length > 0 && <Competencies />}
          </div>
        </div>
        <div className="score-description__predicate-wrapper bg-white">
          <Nav tabs className="toggle-predicate">
            <NavItem className={classnames({
                  active: this.state.activeTab === ""
                })}>
              <NavLink
                onClick={() => {
                  this.toggle("");
                }}
              >
                Semua
              </NavLink>
            </NavItem>
            <NavItem className={classnames({
                  active: this.state.activeTab === "A"
                })}>
              <NavLink
                onClick={() => {
                  this.toggle('A');
                }}
              >
                Sangat Baik
              </NavLink>
            </NavItem>
            <NavItem className={classnames({
                  active: this.state.activeTab === "B"
                })}>
              <NavLink
                onClick={() => {
                  this.toggle('B');
                }}
              >
                Baik
              </NavLink>
            </NavItem>
            <NavItem className={classnames({
                  active: this.state.activeTab === "C"
                })}>
              <NavLink
                onClick={() => {
                  this.toggle('C');
                }}
              >
                Cukup
              </NavLink>
            </NavItem>
            <NavItem className={classnames({
                  active: this.state.activeTab === "D"
                })}>
              <NavLink
                onClick={() => {
                  this.toggle('D');
                }}
              >
                Kurang
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    );
  }
}




const mapStateToProps = state => ({
  basicCompetencies: state.description && state.description.basic_comps,
  numberOfBasicCompetencies: state.description && state.description.count,
  description: state.description && state.description.description
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getCompetencies,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BasicCompetence);

