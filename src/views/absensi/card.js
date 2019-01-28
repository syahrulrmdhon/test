import React, { Component } from 'react'

export default class CardAbsensi extends Component {
    render() {
        return (
            <div className="card-absensi">
                <div className="card">
                    <h6><strong>Total Kehadiran</strong></h6>
                    <h3><strong>{this.props.attended}</strong></h3>
                    <p>Murid</p>
                </div>
                <br />
                <div className="card">
                    <h6><strong>Total Ketidakhadiran</strong></h6>
                    <h3><strong>{this.props.unattended}</strong></h3>
                    <p>Murid</p>
                </div>
                <br />
                <div className="card">
                    <h6><strong>Persentase Kehadiran</strong></h6>
                    <h3><strong>{this.props.percentage}%</strong></h3>
                    <p>Murid</p>
                </div>
            </div>
        )
    }
}
