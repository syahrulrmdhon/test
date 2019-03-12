import React, { Component } from 'react'
import Select from 'react-select';

// redux
import {
    addIndicator,
    handleProblemSet,
    removeIndicator,
} from './../../../redux-modules/modules/exam/skill'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {basic_comp_lists} from './../../../utils/exam'

var FontAwesome = require('react-fontawesome')

class WorkStepIndicator extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        let items = []
        console.log("here prosp", this.props)
        const basic_comps = basic_comp_lists(this.props.assessment_basic_comps)
        if(this.props.problem_type_sets){
            this.props.problem_type_sets.map((problem_type_set, idx) => {
                let action;
                if(idx > 0){
                    console.log(problem_type_set,"here go")
                    action = <td className="align-center valign-center">
                        <a href="javascript:void(0);" onClick={() => {this.props.removeIndicator(this.props.key_value, idx)}}>
                            <FontAwesome name="trash" />
                        </a>
                    </td>
                } else {
                    action = <td></td>
                }
                
                items.push(
                    <tr key={idx}>
                        <td className="align-center valign-center">
                            <label className="header-title">{idx + 1}</label>
                        </td>
                        <td>
                            <Select
                                isClearable
                                className= "select-list fullwidth"
                                classNamePrefix= "select"
                                placeholder= "Pilih kompetensi dasar"
                                name= "basic_comp_id"
                                options={basic_comps}
                                onChange={(event) => {this.props.handleProblemSet(event.value, 'basic_comp_id', this.props.key_value, idx)}}
                                value={basic_comps.find((element) => {return element.value == problem_type_set.basic_comp_id})}
                            />
                        </td>
                        <td>
                            <div className="content-input">
                                <input 
                                    className="disblock fullwidth"
                                    placeholder="Masukkan bobot anda"
                                    onChange={(event) => {this.props.handleProblemSet(event.target.value, 'weight', this.props.key_value, idx)}}
                                    defaultValue={problem_type_set.weight}
                                />
                            </div>
                        </td>
                        <td>
                            <div className="content-input">
                                <input 
                                    className="disblock fullwidth"
                                    placeholder="Masukkan Indikator dari komponen ini"
                                    onChange={(event) => {this.props.handleProblemSet(event.target.value, 'question', this.props.key_value, idx)}}
                                    defaultValue={problem_type_set.question}
                                />
                            </div>
                        </td>
                        {action}
                    </tr>
                )
            })
        }

        return(
            <div className="margin-top-6">
                <label className="header-title">{this.props.key_value}</label>
                <div className="table-responsive unset margin-top-2">
                    <table className="table">
                        <thead>
                            <tr>
                                <td className="align-center" width="10%">
                                    <label className="head-table">No</label>
                                </td>
                                <td className="align-center" width="30%">
                                    <label className="head-table">Kompetensi Dasar</label>
                                </td>
                                <td className="align-center" width="20%">
                                    <label className="head-table">Bobot</label>
                                </td>
                                <td className="align-center" width="35%">
                                    <label className="head-table">Indikator</label>
                                </td>
                                <td className="align-center" width="5%">
                                    <label className="head-table"></label>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="margin-top-2">
                            <a href="javascript:void(0);" onClick={() => {this.props.addIndicator(this.props.key_value)}}>
                                <FontAwesome name="plus-circle" /> Tambah skor dan indikator
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    problem_type_sets: state.skill.problem_type_sets[props.key_value] || [{}],
    assessment_basic_comps: state.skill.assessment_basic_comps || [],
    data:state
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    addIndicator,
    handleProblemSet,
    removeIndicator,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(WorkStepIndicator)