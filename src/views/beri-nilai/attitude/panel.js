import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../../assets/images/img_avatar.png'

export class panel extends Component {
    render() {
        return (
            <div className="padding-bottom-5">
                <div className="panel padding-top-2">
                    <div className="col-sm-12">
                        <div className="col-sm-1">
                            <div className="padding-5">
                                <Avatar src={Ava} size="30" round={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel padding-top-2">
                    <div className="col-sm-12">
                        <div className="col-sm-1">
                            <div className="padding-5">
                                <Avatar src={Ava} size="30" round={true} />
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(panel)
