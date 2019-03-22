import React, { Component } from 'react'
import Select from 'react-select'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBank, 
    // getListBasicComp, 
    // handleChange 
} from './../../../redux-modules/modules/bank'
import { basicComps } from './../../../utils/common'

class BankFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            basic_comps: []
        }
    }
    componentDidMount() {
        // basicComps.call(this, {}, {listOptions: true})
    }
    render() {
        // console.log('udah',this.props)
        // let dataBank = _.get(this, 'props.dataBank', {})
        // let selectedBasicComp = dataBank ? dataBank.selectedBasicComp : ''
        // let selectedType = dataBank ? dataBank.selectedType : ''
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
                        // onChange={(e) => this.props.handleChange(e.value, 'selectedSemester')}
                        // options={this.state.listSemester ? this.state.listSemester : []}
                        // value={this.state.listSemester.find((e) => { return e.value == selectedSemester })}
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
    // getListBasicComp,
    // handleChange
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(BankFilter)
