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
import { Score, AvatarComponent, Collapse  }  from './tableCondition';


var FontAwesome = require('react-fontawesome');

class BottomContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [{}],
      token: localStorage.getItem('token')
    }
  }
  componentDidMount() {
    this.props.getParticipant()
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
              { dataArray &&
                dataArray.map(function (data) {
                  return <tr key={Math.random()}>
                    <AvatarComponent  data={data} />
                    <td>{data.user.full_name}</td>
                    <td>{data.user.email}</td>
                    <Score data={data}/>
                    <td>
                      <FontAwesome name="pencil" size="lg" className="icon-table-pencil" />
                    </td>
                    <Collapse data={data} />
                  </tr>
                })
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




