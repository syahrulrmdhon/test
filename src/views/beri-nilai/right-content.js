import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../assets/images/img_avatar.png';

export class RightComponent extends Component {

  render() {
    return (
      <div className="right-content-kkm">
        <div className="margin-top-3 ">
          <div className="row">
            <div className="col-sm-7">
              <span className="kkm__title">Nilai di Bawah KKM</span>
            </div>
            <div className="col-sm-5">
              <span className="kkm__showall">Lihat Semua</span>
            </div>
          </div>
        </div>
        { 
          this.props.participant_not_passed.map(function(data){
            return   <div className="margin-top-5" key={Math.random()}>
            <div className="row  margin-top-1 padding-bottom-4">
                    <div className="col-sm-1">
                      <Avatar src={Ava} size="30" round={true} />
                    </div>
                    <div className="col-sm-6">
                      <div className="col-sm-12">
                        <span className="kkm__name">{data.user.full_name }</span>
                      </div>
                      <div className="col-sm-12">
                        <span className="kkm__email">{data.user.email}</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <span className="kkm__nilai">{data.total_average.score === null?0:data.total_average.score}</span>
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
