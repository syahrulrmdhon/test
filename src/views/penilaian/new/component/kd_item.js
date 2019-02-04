import React, { Component } from 'react'
import Select from 'react-select'
var FontAwesome = require('react-fontawesome')

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
                <div className="col-sm-6">
                    <div className="content-input margin-top-4">
                        <label className="content-label">Kompetensi Dasar</label>
                        <Select
                            className= "select-list"
                            classNamePrefix= "select"
                            placeholder= "Pilih Kompetensi Dasar"
                            name= "kd[]"
                        />
                    </div>
                </div>
                {remove}
            </div>
        )
    }
}