import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const data = this.props.data || {}
        const fieldname = this.props.fieldname || null

        let result = ''

        if(!!(data[fieldname])){
            result = <div className="error-message">{data[fieldname]}</div>
        }

        return(
            <div>{result}</div>
        )
    }
}