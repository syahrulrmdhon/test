import React, { Component } from 'react'
import Modal from 'react-awesome-modal'
import './../../../styles/online-test.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank, handleChange } from './../../../redux-modules/modules/bank'
import BankContent from './content'
import BankFilter from './filter'
import _ from 'lodash'

class Bank extends Component {

    componentDidMount() {
        this.props.getBank()
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

    render() {
        return (
            <section className='bank'>
                <Modal visible={this.props.visible} width="60%" height="90%" effect="fadeInUp" onClickAway={() => this.props.closeModal()}>
                    <div className='wrapper-content margin-side-4'>
                        <div className='header margin-top-4 margin-bottom-2'>
                            <div className='header-title padding-bottom-1'>
                                <label className='font-green'>Bank Soal</label>
                            </div>
                            <div className='border-green'></div>
                        </div>
                        <div className='select-bank'>
                            <BankFilter />
                        </div>
                        <BankContent />
                        <div className='button-wrapper'>
                            <button className='btn-green' onClick={this.props.onQuestionSelected}>Pilih</button>
                        </div>
                    </div>
                </Modal>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getBank,
    handleChange,
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Bank)