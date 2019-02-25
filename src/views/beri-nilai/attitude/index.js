import React, { Component } from 'react'
import { connect } from 'react-redux'
import Panel from './panel'
import Header from './../../global/header'
import './../../../styles/attitude.scss'
import { getDataScoreAttitude } from './../../../redux-modules/modules/attitude'
import { bindActionCreators } from 'redux';

const data = 'add0e9de-bf3a-4c6b-b611-6b5f6a6893dc'
export class index extends Component {
    // constructor(props){
    //     super(props)
        
        
    // }
    componentDidMount(){
        this.props.getDataScoreAttitude(data)
    }

    render() {
        return (
            <div className="score-attitude">
                <div>
                    <Header navbar={false} />
                </div>
                <div className="padding-content">
                    <div className="margin-side bg-white margin-top-7">
                        <div className="margin-side-5">
                            <div className="padding-top-3">
                                <div className="block">
                                    <span className="score-attitude__title">Daftar Sikap Ahkir Mata Pelajaran</span>
                                </div>
                                <div>
                                    <span className="score-attitude__subject">Matematika</span>
                                </div>
                            </div>
                            <div className="padding-top-2">
                                    <Panel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // user: state.score
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({ getDataScoreAttitude }, dispatch);
  export default connect(mapStateToProps, mapDispatchToProps)(index);