import React, { Component } from 'react'
import Select from 'react-select'
var FontAwesome = require('react-fontawesome')
import KdItem from './kd_item'
import { setLabelSelect } from './../../../../utils/common'

class Subject extends Component {
    constructor(props){
        super(props)

        this.state = {
            kd_list: [{}],
            assessment_basic_comps_attributes: [],
            basic_comps: [],
        }

        this.removeKD = this.removeKD.bind(this)
        this.addKD = this.addKD.bind(this)
        // this.getKD = this.getKD.bind(this)
        this.handleKD = this.handleKD.bind(this)
    }

    removeKD(index, value){
        if(this.state.assessment_basic_comps_attributes.indexOf(value) > -1){
            this.state.assessment_basic_comps_attributes.splice(index, 1);
        }
        this.setState({
            kd_list: this.state.kd_list.slice(0, index).concat(this.state.kd_list.slice((index+1), this.state.kd_list.length)) 
        })
    }

    addKD(){
        const kd_list = this.state.kd_list[0]
        this.setState({
            kd_list: this.state.kd_list.concat(kd_list)
        }) 
    }

    // getKD(event){
    //     const category = this.props.assessment.category || null

    //     this.setState({
    //         subject_id: event,
    //     })

    //     if(category && event.value){
    //         basicComps.call(this, {
    //             category: category,
    //             school_subject_id: event.value,
    //         }, {
    //             listOptions: true,
    //         })
    //     }
    // }

    handleKD(event, props){
        let basic_comps_attribute = this.state.assessment_basic_comps_attributes.slice()

        if(event.value){
            basic_comps_attribute[props.name] = event
            this.setState({
                assessment_basic_comps_attributes: basic_comps_attribute
            })
        }
    }

    render(){
        let remove;
        if(this.props.index > 0){
            remove = <div className="col-sm-1 margin-top-9">
                <a href="javascript:void(0);" onClick={() => {this.props.removeSubject(this.props.index, this.props.value)}} >
                    <FontAwesome name="trash" className="margin-top-2" />
                </a>
            </div>
        }

        let kd_list = []
        if(this.state.kd_list.length > 0){
            this.state.kd_list.map((x, idx) => {
                const basic_comps = this.props.basic_comps || []
                kd_list.push(<KdItem 
                    key={Math.random()} 
                    index={idx} 
                    removeKD= {this.removeKD}
                    handleKD= {this.handleKD}
                    basic_comps= {basic_comps}
                    value={this.state.assessment_basic_comps_attributes[idx]} 
                />)
            })
        }

        return(
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="content-input margin-top-5">
                            <label className="content-label">Mata Pelajaran</label>
                            <Select
                                className= "select-list"
                                classNamePrefix= "select"
                                placeholder= "Pilih Mata Pelajaran"
                                name= {this.props.index}
                                options= {this.props.subjects}
                                onChange= {this.props.getKD}
                                value= {setLabelSelect(this.props.subjects, this.props.value)}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        {remove}
                    </div>
                </div>
                {kd_list}
                <div className="row">
                    <div className="col-sm-10">
                        <div className="float-right">
                            <div className="margin-top-4">
                                <a href="javascript:void(0);" onClick={this.addKD} >
                                    <FontAwesome name="plus-circle" /> Tambah Kompetensi Dasar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-top margin-top-5"></div>
            </div>
        )
    }
}

// function mapStateToProps(state){
//     return {}
// }

// function matchDispatchToProps(dispatch){
//     return bindActionCreators({setSubject: setSubject}, dispatch)
// }

export default Subject