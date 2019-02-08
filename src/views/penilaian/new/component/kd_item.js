import React, { Component } from 'react'
import Select from 'react-select'
var FontAwesome = require('react-fontawesome')
import { setLabelSelect } from './../../../../utils/common'

export default class KdItem extends Component {
    render(){
        let remove;
        if(this.props.index > 0){
            remove = <div className="col-sm-1 margin-top-9">
                <a href="javascript:void(0);" onClick={() => {this.props.removeKD(this.props.index, this.props.value)}} >
                    <FontAwesome name="trash" className="margin-top-2" />
                </a>
            </div>
        }

        return(
            <div className="row">
                <div className="col-sm-10">
                    <div className="content-input margin-top-4">
                        <label className="content-label">Kompetensi Dasar</label>
                        <Select
                            className= "select-list"
                            classNamePrefix= "select"
                            placeholder= "Pilih Kompetensi Dasar"
                            name= {this.props.index}
                            options= {this.props.basic_comps}
                            onChange= {(e) => {this.props.setKD(e, this.props.index, this.props.kd_index)}}
                            index={this.props.index}
                            value= {setLabelSelect(this.props.basic_comps, this.props.value)}
                        />
                    </div>
                </div>
                {remove}
            </div>
        )
    }
}