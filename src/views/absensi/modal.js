import React, { Component } from 'react'
import './../../styles/absensi/modal.css'
import Modal from 'react-awesome-modal';

export default class ModalAbsensi extends Component {
    render() {
        console.log('MODAL', this.props.modal);
        return (
            <Modal
                visible={this.props.modal}
                width="400"
                height="300"
                effect="fadeInUp"
                onClickAway={() => this.props.toggle}
            >
                <div>
                    <div className="row">
                        <div className="header-modal col-2"></div>
                        <div className="header-modal col-8">
                            <h5>Keterangan</h5>
                            <h6><strong>Anton Akamsi</strong></h6>
                        </div>
                        <div className="header-modal col-2">
                            <i className="fa fa-close" onClick={this.props.toggle}></i>
                        </div>
                    </div>
                    <div className="content-header">
                        <label className="col-12">Status</label>
                        <input className="col-12" type="text" placeholder="Status Absen" readOnly></input>
                        <br/><br/>
                        <label className="col-12">Keterangan</label>
                        <textarea className="col-12" rows="10" cols="50" placeholder="Tulis keterangan..."></textarea>
                    </div>
                    <br/>
                    <div className="footer-modal">
                        <button className="btn-green">Simpan</button>
                    </div>
                </div>
            </Modal>
        )
    }
}
