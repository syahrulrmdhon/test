import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../global/header'
import Page from './../../components/Title'
import Sidebar from './index/sidebar'
// scss
import './../../styles/profile.scss'
export class componentName extends Component {
  render() {
    return (
      <Page title="Basic Information">
        <Header />
        <div className="basic">
          <div className="padding-content">
            <div className="margin-8">
              <div className="content-block main-block fit-screen">
                <div className="row">
                  <div className="col-sm-2 left-block fit-screen">
                    <Sidebar />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Page>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
