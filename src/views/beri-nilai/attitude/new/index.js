import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from './../../../../components/Title'
import Header from './../../../global/header'
import Report from './report-list'

//import style
import './../../../../styles/attitude.scss'

export class componentName extends Component {
    render() {
        return (
            <Title title="Nilai Sikap">
                <div className="padding-content">
                    <div className="score-attitude-new">
                        <Header navbar={false} location="/score/attitude/" />
                        <div className="margin-side-4 margin-top-7">
                            <div className="col-sm-12">
                                <div className="col-sm-4" >
                                    <div className="content-block main-block padding-top-2  ">
                                        {/* <Report /> */}
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </Title>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
