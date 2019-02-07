import React, { Component } from 'react'
import { TabContent, TabPane, Form, FormGroup, Label, Input } from 'reactstrap'
// import DatePicker from 'react-datepicker'

// import AbsenceTable from './AbsenceTable'
// import Homeroom from './Homeroom'
// import LeftSide from '../LeftSide/LeftSide'
// import Profile from './ProfileDetail'
// import RightSide from '../RightSide/RightSide'
// import ScoreTable from './ScoreTable'
// import Tab from '../TabContent/TabContent'
// import { apiClient } from '../../utils/apiClient'
// import './../../styles/beri-nilai/main.scss';
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
import SingleBarChat from './../../components/chart/index';
import './../../styles/beri-nilai/card.scss';
import Card from './card'




export default class Content extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    render() {

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
