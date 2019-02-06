import React, { Component } from 'react'

export default class CardAbsensi extends Component {
    render() {
        return (
            <div className="card-nilai">
                <div className="card">
                    <div className="card__label">Total Murid Lulus</div>
                    <div className="card__error"> N/A </div>
                    <div>Murid</div>
                </div>
                <br />
                <div className="card">
                    <div className="card__label">Total Murid Remedial</div>
                    <div className="card__error">N/A</div>
                    <div>Murid</div>
                </div>
            </div>
        )
    }
}
