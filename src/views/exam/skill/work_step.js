import React, { Component } from 'react'

// redux
import {
    addWorkStep,
    removeWorkStep,
    handleWorkStep,
} from './../../../redux-modules/modules/exam/skill'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var FontAwesome = require('react-fontawesome')

class WorkStep extends Component{
    render(){
        let workSteps = []
        console.log(this.props,"msuk")
        if(this.props.problem_types){
            console.log(this.props.problem_types,"msuk")
            this.props.problem_types.map((problem_type, idx) => {
                let remove;

                if(idx > 0){
                    remove = <div className="col-sm-1">
                        <a href="javascript:void(0);" onClick={() => {this.props.removeWorkStep(idx)}}>
                            <FontAwesome name="trash" className="margin-top-4" />
                        </a>
                    </div>
                }

                workSteps.push(
                   <div className="row" key={Math.random()}>
                        <div className="col-sm-11">
                            <div className="content-input margin-top-2">
                                <input 
                                    placeholder= 'Masukkan langkah kerja'
                                    className= "disblock fullwidth"
                                    onChange={(event) => {this.props.handleWorkStep(event.target.value, idx)}}
                                    defaultValue={problem_type}
                                />
                            </div>
                        </div>
                        {remove}
                   </div> 
                )
            })
        }

        return(
            <div>
                <label className="disblock">Langkah Kerja</label>
                {workSteps}
                <div className="row">
                    <div className="col-sm-6">
                        <div className="margin-top-2">
                            <a href="javascript:void(0);" onClick={this.props.addWorkStep}>
                                <FontAwesome name="plus-circle" /> Tambah Kategori
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    problem_types: state.skill ? state.skill.problem_types : ['']
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    addWorkStep,
    removeWorkStep,
    handleWorkStep,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(WorkStep)