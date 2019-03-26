import React, { Component } from 'react'
import Select from 'react-select'
import Modal from 'react-awesome-modal'
import './../../../styles/online-test.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank, handleChange } from './../../../redux-modules/modules/bank'
import BankFilter from './filter';
import BankContent from './content'
import { basicComps, getProblemTypes } from './../../../utils/common'

class Bank extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true,
            id: props.match.params.id,
            basic_comps: [],
            problemTypes: [],
        }
    }

    componentDidMount() {
        this.props.getBank()
        basicComps.call(this, { assessment_id: this.state.id }, { listOptions: true }),
        getProblemTypes.call(this)
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
        let dataBank = _.get(this, 'props.dataBank', {})
        let problem_type = dataBank ? dataBank.selectedProblemType : null
        let basic_comp_id = dataBank ? dataBank.selectedBasicComp : null
        this.props.getBank(problem_type, basic_comp_id)
    }
    render() {
        let dataBank = _.get(this, 'props.dataBank', {})
        let selectedBasicComp = dataBank ? dataBank.selectedBasicComp : null
        let selectedProblemType = dataBank ? dataBank.selectedProblemType : null
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
                            <div className='row margin-bottom-2'>
                                <div className='col-sm-6 col-md-6'>
                                    <Select
                                        onChange={(e) => { this.props.handleChange(e.value, 'selectedBasicComp') }}
                                        options={this.state.basic_comps ? this.state.basic_comps : []}
                                        value={this.state.basic_comps.find((element) => { return element.value == selectedBasicComp })}
                                        className='select'
                                        classNamePrefix='select'
                                        placeholder='Pilih KD...'
                                    />
                                </div>
                                <div className='col-sm-4 col-md-4'>
                                    <Select
                                        onChange={(e) => { this.props.handleChange(e.value, 'selectedProblemType') }}
                                        options={this.state.problemTypes ? this.state.problemTypes : []}
                                        value={this.state.problemTypes.find((element) => { return element.value == selectedProblemType })}
                                        className='select'
                                        classNamePrefix='select'
                                        placeholder='Pilih Type...'
                                    />
                                </div>
                                <div className='col-sm-2 col-md-2'>
                                    <button className='btn-green' onClick={this.handleOptionChange.bind(this)}>Cari</button>
                                </div>
                            </div>
                        </div>
                        <BankContent
                            handleOptionChange={this.handleOptionChange.bind(this)}
                        />
                        <div className='wrapper-button'>
                            <button className='btn-green'>Pilih</button>
                        </div>
                    </div>
                </Modal>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    dataBank: state.bank //bank dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getBank,
    handleChange
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Bank)