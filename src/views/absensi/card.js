import React, { Component } from 'react'

export default class CardAbsensi extends Component {
    render() {
        return (
            <div className="card-absensi">
                <div className="card">
                    <div className="card__label">Total Kehadiran</div>
                    <div className="card__value">{this.props.attended}</div>
                    <div>Murid</div>
                </div>
                <br />
                <div className="card">
                    <div className="card__label">Total Ketidakhadiran</div>
                    <div className="card__value">{this.props.unattended}</div>
                    <div>Murid</div>
                </div>
                <br />
                <div className="card">
                    <div className="card__label">Persentase Kehadiran</div>
                    <div className="card__value">{this.props.percentage}{this.props.percentage !== '-' ? '%' : false}</div>
                    <div>Murid</div>
                </div>
            </div>
        )
    }
}
