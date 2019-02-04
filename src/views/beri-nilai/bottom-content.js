import React, { Component } from 'react'
import './../../styles/global/component.css'
import Select from 'react-select'
import {
  Table,
} from 'reactstrap';
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png'
import './../../styles/beri-nilai/main.scss'
import { getParticipant } from './../../redux-modules/modules/score'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome');

class BottomContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [{}],
      token: localStorage.getItem('token')
    }
  }
  componentDidMount(){
    this.props.getParticipant(this.state.token)
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
    console.log(this.props,"my user")
    return (
      <div className=" margin-top-6 margin-left-3 margin-right-6 margin-bottom-2">
        <div className="table-responsive">
          <table className="table assessment">
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
              <tr>
                <td className="align-center border-left-col">
                  <Avatar src={Ava} size="30" round={true} />
                </td>
                <td>T Ritika Singh</td>
                <td>TRitikaSingh@gmail.com</td>
                <td className="label-nilai">N/A</td>
                <td>
                  <FontAwesome name="pencil" size="lg" className="icon-table-pencil" />
                </td>
                <td>
                  <FontAwesome name="ellipsis-h" size="lg" className="icon-table-pencil cgreen" />
                </td>
              </tr>

              <tr>
                <td className="align-center border-left-col">
                  <Avatar src={Ava} size="30" round={true} />
                </td>
                <td>T Ritika Singh</td>
                <td>TRitikaSingh@gmail.com</td>
                <td className="label-nilai">N/A</td>
                <td>
                  <FontAwesome name="pencil" size="lg" className="icon-table-pencil" />
                </td>
                <td>
                  <FontAwesome name="ellipsis-h" size="lg" className="icon-table-pencil cgreen" />
                </td>
              </tr>
              <tr>
                <td className="align-center border-left-col">
                  <Avatar src={Ava} size="30" round={true} />
                </td>
                <td>T Ritika Singh</td>
                <td>TRitikaSingh@gmail.com</td>
                <td className="label-nilai">N/A</td>
                <td>
                  <FontAwesome name="pencil" size="lg" className="icon-table-pencil" />
                </td>
                <td>
                  <FontAwesome name="ellipsis-h" size="lg" className="icon-table-pencil cgreen" />
                </td>
              </tr>
              <tr>
                <td className="align-center border-left-col">
                  <Avatar src={Ava} size="30" round={true} />
                </td>
                <td>T Ritika Singh</td>
                <td>TRitikaSingh@gmail.com</td>
                <td className="label-nilai">N/A</td>
                <td>
                  <FontAwesome name="pencil" size="lg" className="icon-table-pencil" />
                </td>
                <td>
                  <FontAwesome name="ellipsis-h" size="lg" className="icon-table-pencil cgreen" />
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  user: state
})

const mapDispatchToProps = dispatch => bindActionCreators({ getParticipant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);




