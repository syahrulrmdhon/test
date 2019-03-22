import React, { Component } from 'react'
import Modal from 'react-awesome-modal'
import './../../../styles/online-test.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank } from './../../../redux-modules/modules/bank'
import BankFilter from './filter';
import BankContent from './content';

class Bank extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true
        }
    }

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
    handleOptionChange(e) {

    }
    render() {
        return (
            <section className='bank'>
                <Modal visible={this.state.visible} width="60%" height="90%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className='wrapper-content margin-side-4'>
                        <div className='header margin-top-4 margin-bottom-2'>
                            <div className='header-title padding-bottom-1'>
                                <label className='font-green'>Bank Soal</label>
                            </div>
                            <div className='border-green'></div>
                        </div>
                        <div className='select-bank'>
                            <BankFilter
                            />
                        </div>
                        
                            <BankContent
                                handleOptionChange={this.handleOptionChange.bind(this)}
                            />
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

const mapStateToProps = (state) => ({
    dataBank: state.bank //bank dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getBank
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Bank)