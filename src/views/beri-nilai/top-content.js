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

    }


    render() {

        return (
            <div className="col-md-12 score-result">
                <div className="row">
                    <div className="col-md-9 title-content">
                        <span>Hasil Perolehan Nilai</span>
                    </div>
                </div>
                <div className="row">
                    <div className="content-chart col-md-9">
                        <SingleBarChat
                            chart={this.props.chart}
                            participant={this.props.data}
                        />
                    </div>
                    <div className="col-md-3" >
                        <div className="box-postition">
                            <Card
                                participant_passed={this.props.participant_passed}
                                participant_not_passed={this.props.participant_not_passed}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


  export default Content;
  
  
  
  
  