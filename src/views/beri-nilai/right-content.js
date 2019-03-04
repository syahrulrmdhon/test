import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png';

export class RightComponent extends Component {
  render() {
    // console.log(this.props.participant_not_passed.slice(0,5) ,"obj  ") 

    return (
      <div className="right-content-kkm ">
        <div className="margin-top-3  ">
          <div className="row">
            <div className="col-md-7">
              <div className="title-kkm">Nilai di Bawah KKM</div>
            </div>
            <div className="col-md-5">
            <div className="title-kkm">KKM : 100</div> 
            </div>
          </div>
        </div>
        {
          this.props.participant_not_passed.map(function (data) {
            return <div className="">
              <div className="margin-top-5" key={Math.random()}>
                <div className="margin-top-1 padding-bottom-4 d-flex align-items-center">
                  <Avatar src={Ava} size="30" round={true} />
                  <div className="name-wrapper">
                    <div className="under-kkm">{data.user.full_name}</div>
                    <div className="email-under-kkm">{data.user.email}</div>
                  </div>
                  <span className="under-kkm-score padding-5 pull-right">{data.total_average.score === null ? 'N/A' : data.total_average.score}</span>
                </div>
              </div>
            </div>
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent)