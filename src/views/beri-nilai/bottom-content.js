import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
import {
  Table,
} from 'reactstrap';
import './../../styles/beri-nilai/main.scss'
import { getParticipant } from './../../redux-modules/modules/score'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Score, AvatarComponent, Collapse } from './tableCondition';
import classnames from 'classnames'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png'
import Pencil from './../../assets/images/beri_nilai.svg';
var FontAwesome = require('react-fontawesome');

class BottomContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      dataChildSubject:[],
      dataChildCompentency:[],
      key:'',
      selectIndex: -1,
      height: '',
      collapce: '',
      border: 'border-bottom',
      hidden: true,
      element:'hidden',
      token: localStorage.getItem('token')
    }
    this.onClickToogle = this.onClickToogle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleNewScore = this.handleNewScore.bind(this)
  }
  componentDidMount() {
    this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment)
  }
  onClickToogle() {
    this.setState({
      height: 'col-height'
    })
  }

  handleClick(e,id, idx) {
    let subject= []
    let competency = []
    let hidden = true;
    let  dataArray = this.props.user && this.props.user.data && this.props.user.data.participants;
    let filtering = dataArray.filter(item => item.user.id === id)
    filtering.map((x)=>{
        subject = x.scores.subject_averages
        competency = x.scores.competency_averages
    })
    if (this.state.hidden === true) {
      hidden = false;
    } else {
      hidden = true;
    }
 
    console.log(this.state.selectedQuestion,idx,"here 2")
       
    this.setState({
      hidden: hidden[1],
      key:1,
      dataChildSubject:subject,
      selectIndex: (this.state.selectIndex === idx ? -1: idx ),
      dataChildCompentency:competency
    })
  
  }

  handleNewScore(e, student,) {
    e.preventDefault()
    this.props.handleNewScoreParent(e, student)
  }


  render() {
    const dataArray = this.props.user && this.props.user.data && this.props.user.data.participants;
    return (
      <div className="margin-left-5 margin-right-5 bg-white padding-top-4 margin-bottom-2">
        <div className="content-bottom">
          <div className="header">
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-3 padding-1">
                  <span className="padding-3">Nama Murid</span>
                </div>
                <div className="col-sm-3 padding-1 align-left">
                  <span>Email</span>
                </div>
                <div className="col-sm-3 align-center padding-1">
                  <span>Nilai</span>
                </div>
                <div className="col-sm-2 padding-1">
                  <span>Beri Nilai</span>
                </div>
                <div className="col-sm-1 padding-1">
                  <span>Rincian</span>
                </div>
              </div>

            </div>
          </div>
          <div className="content-student">
            {
              dataArray && dataArray.map(function (data, index) {
                console.log(data, "my")
                return <div className="box-student margin-top-3 " key={Math.random()} >
                  <div className={classnames('border-full border-right border-left-col-red', this.state.border)}>
                    <div className="row">
                      <div className="col-sm-12 ">
                        <div className="col-sm-3  padding-1">
                          <Avatar src={Ava} size="30" round={true} />
                          <span className="padding-left-2  label-content ">{data.user.full_name}</span>
                        </div>
                        <div className="col-sm-3 align-left padding-2 ">
                          <span className="label-content">{data.user.email}</span>
                        </div>
                        <div className="col-sm-3 align-center padding-2 ">
                          <span className=" label-nilai ">N/A</span>
                        </div>
                        <div className="col-sm-2 align-left padding-2 ">
                          <img src={Pencil} alt="pencil" width="20px" className="icon-pencil" onClick={(e) => { this.props.handleNewScoreParent(e, data.user.id) }} />
                        </div>
                        <div className="col-sm-1 align-left padding-2 ">
                          <i className="fa fas fa-ellipsis-h icon-table-pencil cred" onClick={(e) => { this.handleClick(e, data.user.id, index) }} ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classnames("border-right border-bottom border-left-col-red",`${this.state.selectIndex === index ? 'display-block' : 'display-none'}`)} key={this.state.key}    >
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="margin-side-10 padding-bottom-3 margin-top-5">
                          {
                            this.state.dataChildSubject.map((data) => {
                              return <div className="second-head padding-1 " key={Math.random()}>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="col-sm-4">
                                      {data.school_subject.alias_name}
                                    </div>
                                    <div className="col-sm-4">
                                    </div>
                                    <div className="col-sm-4 align-center">
                                      {data.score}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            })
                          }
                          {
                            this.state.dataChildCompentency.map((data) => {
                              return <div className="padding-1" key={Math.random()}>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="col-sm-8">
                                      {data.basic_comp.competency_number+' '+data.basic_comp.content}
                                    </div>
                                    <div className="col-sm-4 align-center">
                                      {data.score}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }, this)
            }
            {/* start here */}

          </div>
        </div>
      </div>

    )
  }
}



const mapStateToProps = state => ({
  user: state.score
})

const mapDispatchToProps = dispatch => bindActionCreators({ getParticipant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);

