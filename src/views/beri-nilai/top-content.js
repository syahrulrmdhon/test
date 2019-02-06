import React, { Component } from 'react'
import SingleBarChat from './../../components/chart/index';
import './../../styles/beri-nilai/card.scss';
import Card from './card';
import { getParticipantsResult } from './../../redux-modules/modules/score'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class Content extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    componentDidMount(){
        // this.props.getParticipantsResult()
    }

    render() {
        console.log("here top", this.props.result)
        return (
            <div className="col-sm-12">
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-7 title-content">
                            <span>Hasil Perolehan Nilai</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="content-chart">
                            <SingleBarChat />
                        </div>

                    </div>
                </div>
                <div className="col-sm-3" >
                    <div className="box-postition">
                        <Card>

                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    result: state
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({ getParticipantsResult }, dispatch);
  export default connect(mapStateToProps, mapDispatchToProps)(Content);
  
  
  
  
  