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
      token: localStorage.getItem('token')
    }
    this.onClickToogle = this.onClickToogle.bind(this)
  }
  componentDidMount() {
    this.props.getParticipant()
  }
    onClickToogle(){
        this.setState({
            height:'col-height'
        })
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
                dataArray.map(function (data) {
                  return <tr key={Math.random()}  data-toggle="collapse" data-target="#accordion" className="clickable">
                    <AvatarComponent  data={data} height={this.state.height} />
                    <td className="">{data.user.full_name}</td>
                    <td>{data.user.email}</td>
                    <Score data={data}/>
                    <td>
                      <FontAwesome name="pencil" size="lg" className="icon-table-pencil" />
                    </td>
                    <Collapse data={data} onClickToogles={this.onClickToogle}/>
                      {/*<button className="btn btn-default btn-xs"><span className="glyphicon glyphicon-eye-open"></span>*/}
                      {/*</button>*/}
                  </tr>
                },this)
              }
              <tr className="bcgreen" >
                  <td colSpan="6">
                      <div id="accordion" className=" bcgreen collapse">
                          asdasdasdsadasaasdaaaaaaaaaaaaasdddddddddddddddddddddddddddddddddddddddddddddd
                          {/*<Collapse data={data} onClickToogles={this.onClickToogle}/>*/}
                          {/*<button className="btn btn-default btn-xs"><span className="glyphicon glyphicon-eye-open"></span>*/}
                          {/*</button>*/}
                      </div>
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
  user: state.score
})

const mapDispatchToProps = dispatch => bindActionCreators({ getParticipant }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);




<table class="table table-condensed" style={{borderCollapse:'collapse'}}>

<thead>
    <tr>
        <th>&nbsp;</th>
        <th>Job Name</th>
        <th>Description</th>
        <th>Provider Name</th>
        <th>Region</th>
        <th>Status</th>
    </tr>
</thead>

<tbody>
    <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle">
        <td>
            <button class="btn btn-default btn-xs"><span className="glyphicon glyphicon-eye-open"></span></button>
        </td>
        <td>OBS Name</td>
        <td>OBS Description</td>
        <td>hpcloud</td>
        <td>nova</td>
        <td> created</td>

    </tr>
    <tr>
        <td colSpan="12" class="hiddenRow">
            <div className="accordian-body collapse" id="demo1">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td><a href="WorkloadURL">Workload link</a></td>
                            <td>Bandwidth: Dandwidth Details</td>
                            <td>OBS Endpoint: end point</td>
                        </tr>
                        <tr>
                            <th>Access Key</th>
                            <th>Secret Key</th>
                            <th>Status </th>
                            <th> Created</th>
                            <th> Expires</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>access-key-1</td>
                            <td>secretKey-1</td>
                            <td>Status</td>
                            <td>some date</td>
                            <td>some date</td>
                            <td>
                                <a href="" className="btn btn-default btn-sm">
                                    <i className="glyphicon glyphicon-cog"></i></a>
                            </td>
                        </tr>



                    </tbody>
                </table>

            </div>
        </td>
    </tr>
    <tr data-toggle="collapse" data-target="#demo2" class="accordion-toggle">
        <td>
            <button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button>
        </td>
        <td>OBS Name</td>
        <td>OBS Description</td>
        <td>hpcloud</td>
        <td>nova</td>
        <td> created</td>
    </tr>
    <tr>
        <td colspan="6" class="hiddenRow">
            <div id="demo2" class="accordian-body collapse">Demo2</div>
        </td>
    </tr>
    <tr data-toggle="collapse" data-target="#demo3" class="accordion-toggle">
        <td>
            <button class="btn btn-default btn-xs"><span className="glyphicon glyphicon-eye-open"></span></button>
        </td>
        <td>OBS Name</td>
        <td>OBS Description</td>
        <td>hpcloud</td>
        <td>nova</td>
        <td> created</td>
    </tr>
    <tr>
        <td colspan="6" class="hiddenRow">
            <div id="demo3" className="accordian-body collapse">Demo3</div>
        </td>
    </tr>
</tbody>
</table>