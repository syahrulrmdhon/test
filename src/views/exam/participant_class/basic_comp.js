import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    handleBC,
} from './../../../redux-modules/modules/exam'

class BasicComp extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="row margin-top-2">
                <div className="col-sm-6">
                    <div className="bold">
                        {this.props.data.competency_number} {this.props.data.content}
                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="filter">
                        <input 
                            className="disblock fullwidth" 
                            placeholder="Masukkan KKM" 
                            required={true}
                            onChange={(event) => {this.props.handleBC(event, this.props.class_index, this.props.index)}}
                            value={this.props.basic_comp.kkm || ''}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    basic_comp: state.exam.data.exam.exam_classes_attributes[props.class_index]['comp_kkms'][props.index]
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleBC,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BasicComp);