import React, { Component } from 'react'
import { Passed } from './conditions';
import { NotPassed } from './conditions'

export default class CardNoQuestions extends Component {
    render() {
        return (
            <div className="card-nilai margin-top-4">
                <div className="card">
                    <div className="card__label">Total Murid Lulus</div>
                    <Passed
                        passed={this.props.passed}
                    />
                    <p>Murid</p>
                </div>
                <br />
                <div className="card">
                    <div className="card__label">Total Murid Remedial</div>
                    <NotPassed
                        notPassed={this.props.notPassed}
                    />
                    <p>Murid</p>
                </div>
            </div>
        )
    }
}
