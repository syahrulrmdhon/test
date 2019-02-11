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

var FontAwesome = require('react-fontawesome');

class BottomContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [{}],
      height:'',
      collapce:'',
      class:'td-hidden',
      token: localStorage.getItem('token')
    }
    this.onClickToogle = this.onClickToogle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleNewScore = this.handleNewScore.bind(this)
  }
  componentDidMount() {
    this.props.getParticipant(this.props.exam, this.props.class, this.props.asssessment)
  }
    onClickToogle(){
        this.setState({
            height: 'col-height'
        })
    }

    handleClick(idx){
        console.log("here class", this.state.class+idx);
        let classes = ''
        if(this.state.class === 'td-hidden'){
          classes=""
        }else{
          classes="td-hidden"
        }
        this.setState({class:classes})
    }

    handleNewScore(e, student){
        e.preventDefault()
        console.log("here go")
        this.props.handleNewScoreParent(e,student)
    }

    render() {
        let content = []
        if (this.state.data.length === 0) {
            content.push(<Table key={1} />)
        } else {
            content.push(
                <div className="margin-top-4 empty-data" key={1} >
                    Data belum tersedia.
        </div>
            )
        }

    const dataArray = this.props.user && this.props.user.data && this.props.user.data.participants;
    return (
      <div className="margin-left-3 margin-right-6 margin-bottom-2">
        <div className="table-responsive">
          <table className="table assessment" >
            <thead>
              <tr className="main-head">
                <th></th>
                <th>Nama Murid</th>
                <th>Email</th>
                <th>Nilai</th>
                <th>Beri Nilai</th>
                <th>Rincian</th>
              </tr>
            </thead>
            <tbody>
              { dataArray &&
                dataArray.map(function (data, index) {
                  return <div className="tr-row">
                     <tr key={Math.random()}  data-toggle={this.state.collapce} data-target={"#accordion1"+index} onClick={this.handleClick} className="clickable">
                    <AvatarComponent  data={data} height={this.state.height} />
                    <td className="">{data.user.full_name}</td>
                    <td>{data.user.email}</td>
                    <Score data={data}/>
                    <td>
                      <FontAwesome name="pencil" size="lg" className="icon-table-pencil" onClick={(e)=> {this.props.handleNewScoreParent(e, data.user.id)}} />
                    </td>
                    <Collapse data={data} onClickToogles={this.onClickToogle}/>
                     
                  </tr>
                  <tr className="bcgreen" >
                  <td colSpan="6" className={this.state.class+index}>
                      <div id={"accordion1"+index} className=" bcgreen collapse">
                         hit me
                      </div>
                  </td>


              </tr>
                  </div>
               },this)
              }
           
            </tbody>
          </table>
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



