import React, { Component } from 'react'
import Select from 'react-select';
import { classes, setLabelSelect } from '../../../../utils/common'
var FontAwesome = require('react-fontawesome')

export default class Classses extends Component {
    constructor(props){
        super(props)

        this.state = {
            classes: []
        }
    }
    
    componentDidMount(){
        classes.call(this, {attendance_type: 'subject'})
    }

    render(){
        let remove;
        if(this.props.index > 0){
            remove = <div className="col-sm-1">
                <a href="javascript:void(0);" onClick={() => {this.props.removeClass(this.props.index, this.props.value)}}>
                    <FontAwesome name="trash" className="margin-top-2" />
                </a>
            </div>
        }
        
        return(
             <div className="row margin-top-4">
                <div className="col-sm-8">
                    <div className="content-input">
                        <label className="content-label">Kelas</label>
                        <div className="row">
                            <div className="col-sm-9">
                                <Select
                                    className= "select-list"
                                    classNamePrefix= "select"
                                    placeholder= "Pilih kelas"
                                    name= {this.props.index}
                                    onChange={this.props.handleClassAttribute}
                                    options= {this.state.classes}
                                    value= {setLabelSelect(this.state.classes, this.props.value)}
                                />
                            </div>
                            {remove}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}