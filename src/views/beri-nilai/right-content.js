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
            <div className="col-sm-7">
              <span className="title-kkm">Nilai di Bawah KKM</span>
            </div>
            <div className="col-sm-5">
              <span className="show-all">Lihat Semua</span>
            </div>
          </div>
        </div>
        {
          this.props.participant_not_passed.map(function (data) {
            return <div className="">
             <div className="margin-top-5" key={Math.random()}>
              <div className="row margin-top-1 padding-bottom-4">
                <div className="col-sm-1">
                  <Avatar src={Ava} size="30" round={true} />
                </div>
                <div className="col-sm-6">
                  <div className="col-sm-12">
                    <span className="under-kkm">{data.user.full_name}</span>
                  </div>
                  <div className="col-sm-12">
                    <span className="email-under-kkm">{data.user.email}</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <span className="under-kkm-score padding-5">{data.total_average.score === null ? 'N/A' : data.total_average.score}</span>
                </div>
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