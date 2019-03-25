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
    }
    componentDidMount() {
        basicComps.call(this, { category: 'knowledge', assessment_id: this.props.id }, { listOptions: true }),
        getProblemTypes.call(this)
    }
    render() {
        let dataBank = _.get(this, 'props.dataBank', {})
        let selectedBasicComp = dataBank ? dataBank.selectedBasicComp : null
        let selectedProblemType = dataBank ? dataBank.selectedProblemType : null
        return (
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
                    <button className='btn-green'>Cari</button>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(BankFilter)
