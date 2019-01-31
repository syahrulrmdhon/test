import React, { Component } from 'react'
import Header from '../global/header';
import Filter from './filter'
import Content from './content'
import '../../styles/exam.scss'

export default class Exam extends Component {
  render() {
    return (
      <div className="padding-content exam">
        <Header />
        <div className="margin-8">
          <div className="content-block main-block">
            <div className="row">
              <div className="col-sm-2 col-sm-2-custom left-block">
                <Filter />
              </div>
              <div className="col-sm-10 col-sm-10-custom right-block">
                <Content />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// margin: 10px 0px 30px;
// font-family: $nunito_bold;
// font-size: 14px;
// color: #505050;
//
// letter-spacing: 0.3px;
// color: #505050;
// font-weight: bold;
// font-size: 16px;
