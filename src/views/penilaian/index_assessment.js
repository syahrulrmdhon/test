import React, { Component } from 'react'
import Table from './index/table'

export default class IndexAssessment extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.data !== prevProps.data){
            this.setState({
                data: this.props.data,
            })
        }
    }
    

    render() {
        let content = []
        if(this.state.data.length > 0){
            content.push(<Table 
                key={Math.random()}
                data={this.state.data} 
                category={this.props.category}
            />)            
        } else {
            content.push(
                <div className="margin-top-4 empty-data" key={1} >
                    Data belum tersedia.
                </div>
            )
        }

        return(
            <div className="empty-wrapper">
                {content}
            </div>
        )
    }
}