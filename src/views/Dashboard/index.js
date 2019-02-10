import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Dashboard extends Component {
  render () {
    return (
      <div>
        <div className="row margin-top-4">
          <div className="col-sm-9">
            <div className="content-block main-block" />
          </div>
          <div className="col-sm-3">
            <div className="content-block main-block" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
