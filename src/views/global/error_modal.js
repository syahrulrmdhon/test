import React, { Component } from 'react'
import classnames from 'classnames'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ErrorModal extends Component {

    componentDidMount(){
        let title = ''
        let className = ''

        switch(this.props.status){
            case 'error':
                title = 'Ulangi'
                className = 'bcred cwhite'
            break
            default:
                title = 'Berhasil'
                className = 'default'
            break
        }

        confirmAlert({
            customUI: ({ onClose, onConfirm }) => {
                return (
                    <div className="react-confirm-alert modal-alert">
                        <div className="react-confirm-alert-body">
                            <div className="header align-center">
                                <h1>{this.props.message}</h1>
                            </div>
                            <div className="react-confirm-alert-button-group toggle">
                                <div className="align-center fullwidth">
                                    <a href="javascript:void(0);" className={classnames("btn", className)} onClick={onClose}>{title}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
        })
    }

    render(){
        return(
            ''
        )
    }
}

export default ErrorModal