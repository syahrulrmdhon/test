import React, { Component } from 'react'
import Select from 'react-select'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    getBank,
    handleChange
} from './../../../redux-modules/modules/bank'
import { basicComps, getProblemTypes } from './../../../utils/common'

class BankFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            basic_comps: [],
            problemTypes: [],
        }
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }
    componentDidMount() {
        getProblemTypes.call(this)
    }
    handleOptionChange() {
        let dataBank = _.get(this, 'props.dataBank', {})
        let problem_type = dataBank ? dataBank.selectedProblemType : undefined
        let basic_comp_id = dataBank ? dataBank.selectedBasicComp : undefined
        this.props.getBank(problem_type, basic_comp_id)
    }
    render() {
        let dataBank = _.get(this, 'props.dataBank', {})
        let selectedBasicComp = dataBank ? dataBank.selectedBasicComp : null
        let selectedProblemType = dataBank ? dataBank.selectedProblemType : null
        const basicCompetencies = this.props.basicCompetencies

        return (
            <div className='row'>
                <div className='col-sm-6 col-md-6'>
                    <Select
                        onChange={(e) => { this.props.handleChange(e.value, 'selectedBasicComp') }}
                        options={basicCompetencies}
                        value={basicCompetencies.find((element) => { return element.value == selectedBasicComp })}
                        className='select'
                        classNamePrefix='select'
                        placeholder='Pilih KD...'
                    />
                </div>
                <div className='col-md-offset-4 col-md-2'>
                    <button className='btn-green online-question__find-button' onClick={this.handleOptionChange}>Cari</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dataBank: state.bank, //bank dari reducer
    basicCompetencies: _.get(state.onlineQuestion, 'basicCompetencies', [])
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getBank,
    handleChange
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(BankFilter)
