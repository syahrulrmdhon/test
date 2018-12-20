import React, { Component } from 'react'
import {
    Popover,
    Tooltip,
    Modal
} from 'react-bootstrap';

export default class ModalAbsensi extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        }
    }

    handleShow() {
        this.setState({ show: true })
    }
    handleClose() {
        this.setState({ show: false })
    }
    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal Heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>This is modal body</h1>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
