import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar';
import Ava from './../../../assets/images/img_avatar.png'

export class panel extends Component {
    render() {
        return (
            <div className="padding-bottom-5">
                <div className="row margin-top-4">
                    <div className="panel margin-side-3">
                        <div className="col-sm-12">
                            <div className="col-sm-1 padding-4">
                                <Avatar src={Ava} size={40} round={true} />
                            </div> 
                            <div className="col-sm-6 padding-4">
                                <Avatar src={Ava} size={40} round={true} />
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="row margin-top-4">
                    <div className="panel margin-side-3">
                        asdasdas
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
