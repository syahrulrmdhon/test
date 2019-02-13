import React, { Component } from 'react'

export class Passed extends Component {
    
    render() {
        let classname = ''
        let passed = this.props.passed

        if(passed > 0 ) {
            classname = 'card__value'
        }else {
            classname = 'card__error'
        }

        return (
            <div className={classname}>{this.props.passed}</div>
        )
    }
}

export class NotPassed extends Component {
    render(){
        let classname = ''
        let notPassed = this.props.notPassed

        if(notPassed > 0){
            classname = 'card__value'
        }else {
            classname = 'card__error'
        }

        return (
            <div className={classname}>{this.props.notPassed}</div>
        )
    }
}
