import React, { Component } from 'react'
import Modal from 'react-awesome-modal'
import { NavLink } from 'react-router-dom'
import './../../../styles/online-test.scss'
import Select from 'react-select'

export default class Bank extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true
        }
    }
    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    handleOptionChange() {

    }
    render() {
        return (
            <section className='bank'>
                {/* <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                <Modal visible={this.state.visible} width="60%" height="90%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className='wrapper-content margin-side-4'>
                        <div className='header margin-top-4 margin-bottom-2'>
                            <div className='header-title padding-bottom-1'>
                                <label className='font-green'>Bank Soal</label>
                            </div>
                            <div className='border-green'></div>
                        </div>
                        <div className='select-bank'>
                            <div className='row margin-bottom-2'>
                                <div className='col-sm-6 col-md-6'>
                                    <Select
                                        // onChange={(e) => this.props.handleChange(e.value, 'selectedSemester')}
                                        // options={this.state.listSemester ? this.state.listSemester : []}
                                        // value={this.state.listSemester.find((e) => { return e.value == selectedSemester })}
                                        className='select'
                                        classNamePrefix='select'
                                        placeholder='Pilih Semester...'
                                    />
                                </div>
                                <div className='col-sm-4 col-md-4'>
                                    <Select
                                        // onChange={(e) => this.props.handleChange(e.value, 'selectedSemester')}
                                        // options={this.state.listSemester ? this.state.listSemester : []}
                                        // value={this.state.listSemester.find((e) => { return e.value == selectedSemester })}
                                        className='select'
                                        classNamePrefix='select'
                                        placeholder='Pilih Semester...'
                                    />
                                </div>
                                <div className='col-sm-2 col-md-2'>
                                    <button className='btn-green'>Cari</button>
                                </div>
                            </div>
                        </div>
                        <div className='content-bank margin-top-2 margin-bottom-4'>
                            <div className='wrapper'>
                                <div className='row padding-side-2'>
                                    <div className='col-sm-1 col-md-1 float-right'>
                                        <label htmlFor={'present'}></label>
                                        <input type="radio" className="rd-btn" name='present' value="present" onChange={this.handleOptionChange} checked={'present'} />
                                        <div className="check"></div>
                                    </div>
                                    <div className='col-sm-1 col-md-1 margin-top-5 text-left'>1.</div>
                                    <div className='col-sm-10 col-md-10'>
                                        <div className='kd margin-top-5'>
                                            KD. 1.1 Memahami pemanfaatan citra Penginderaan Jauh dan Geografi.
                                        </div>
                                        <div className='question margin-top-2'>
                                            Fenomena alam berupa gempa tektonik yang terjadi di Indonesia berkaitan dengan pergerakan lempeng tektonik antara Lempeng Pasifik, Eurasia, dan Lempeng Indo-Australia karena….
                                        </div>
                                        <div className='row padding-side-3 margin-vert-2'>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='wrapper'>
                                <div className='row padding-side-2'>
                                    <div className='col-sm-1 col-md-1 float-right'>
                                        <label htmlFor={'present'}></label>
                                        <input type="radio" className="rd-btn" name='present' value="present" onChange={this.handleOptionChange} checked={'present'} />
                                        <div className="check"></div>
                                    </div>
                                    <div className='col-sm-1 col-md-1 margin-top-5 text-left'>1.</div>
                                    <div className='col-sm-10 col-md-10'>
                                        <div className='kd margin-top-5'>
                                            KD. 1.1 Memahami pemanfaatan citra Penginderaan Jauh dan Geografi.
                                        </div>
                                        <div className='question margin-top-2'>
                                            Fenomena alam berupa gempa tektonik yang terjadi di Indonesia berkaitan dengan pergerakan lempeng tektonik antara Lempeng Pasifik, Eurasia, dan Lempeng Indo-Australia karena….
                                        </div>
                                        <div className='row padding-side-3 margin-vert-2'>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='wrapper'>
                                <div className='row padding-side-2'>
                                    <div className='col-sm-1 col-md-1 float-right'>
                                        <label htmlFor={'present'}></label>
                                        <input type="radio" className="rd-btn" name='present' value="present" onChange={this.handleOptionChange} checked={'present'} />
                                        <div className="check"></div>
                                    </div>
                                    <div className='col-sm-1 col-md-1 margin-top-5 text-left'>1.</div>
                                    <div className='col-sm-10 col-md-10'>
                                        <div className='kd margin-top-5'>
                                            KD. 1.1 Memahami pemanfaatan citra Penginderaan Jauh dan Geografi.
                                        </div>
                                        <div className='question margin-top-2'>
                                            Fenomena alam berupa gempa tektonik yang terjadi di Indonesia berkaitan dengan pergerakan lempeng tektonik antara Lempeng Pasifik, Eurasia, dan Lempeng Indo-Australia karena….
                                        </div>
                                        <div className='row padding-side-3 margin-vert-2'>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='wrapper'>
                                <div className='row padding-side-2'>
                                    <div className='col-sm-1 col-md-1 float-right'>
                                        <label htmlFor={'present'}></label>
                                        <input type="radio" className="rd-btn" name='present' value="present" onChange={this.handleOptionChange} checked={'present'} />
                                        <div className="check"></div>
                                    </div>
                                    <div className='col-sm-1 col-md-1 margin-top-5 text-left'>1.</div>
                                    <div className='col-sm-10 col-md-10'>
                                        <div className='kd margin-top-5'>
                                            KD. 1.1 Memahami pemanfaatan citra Penginderaan Jauh dan Geografi.
                                        </div>
                                        <div className='question margin-top-2'>
                                            Fenomena alam berupa gempa tektonik yang terjadi di Indonesia berkaitan dengan pergerakan lempeng tektonik antara Lempeng Pasifik, Eurasia, dan Lempeng Indo-Australia karena….
                                        </div>
                                        <div className='row padding-side-3 margin-vert-2'>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>A.</div>
                                                <div className='text-justify'>Berada di atas lempeng Samudra Pasifik dan Indo-Australia.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='btn-green'>Pilih</button>
                    </div>
                    {/* <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div> */}
                </Modal>
            </section>
        )
    }
}
