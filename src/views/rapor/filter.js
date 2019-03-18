import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStatusList, getSemesterList } from './../../utils/common'
import { handleChange, initial } from './../../redux-modules/modules/rapor'
import _ from 'lodash'

class FilterRapor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listStatus: [],
            listSemester: []
        }
    }
    componentDidMount() {
        this.props.initial()
        getStatusList.call(this)
        getSemesterList.call(this)
    }
    render() {
        let rapor = _.get(this, 'props.rapor', {})
        let selectedStatus = rapor ? rapor.selectedStatus : ''
        let selectedSemester = rapor ? rapor.selectedSemester : ''
        return (
            <div className='filter'>
                <div className='title'>Filter</div>
                <form>
                    <div className='field-filter'>
                        <label>Murid</label>
                        <Select
                            onChange={(e) => { this.props.handleChange(e.value, 'selectedStatus') }}
                            options={this.state.listStatus ? this.state.listStatus : []}
                            value={this.state.listStatus.find((e) => { return e.value == selectedStatus })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Murid...'
                        />
                    </div>
                    <div className='field-filter'>
                        <label>Semester</label>
                        <Select
                            onChange={(e) => this.props.handleChange(e.value, 'selectedSemester')}
                            options={this.state.listSemester ? this.state.listSemester : []}
                            value={this.state.listSemester.find((e) => { return e.value == selectedSemester })}
                            className='select'
                            classNamePrefix='select'
                            placeholder='Pilih Semester...'
                        />
                    </div>
                </form>
                <button type="submit" className='btn-green'
                    onClick={this.props.handleSubmit} className="btn-green">
                    Filter
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rapor: state.rapor, //rapor dari reducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleChange,
    initial,
}, dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(FilterRapor)