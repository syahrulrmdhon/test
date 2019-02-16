import React, { Component } from 'react'
import Header from '../../global/header'

class Add extends Component{
    constructor(props){
        super(props)

        this.state = {
            assessment_id: this.props.match.params.id,
        }
    }

    render(){
        return(
            <div className="padding-content">
                <Header navbar={true} location={`/exam/${this.state.assessment_id}`} />
                <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">{'asd'}</label>   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Add;