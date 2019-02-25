import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'




export class Report extends Component {

    render() {
        return (
            <div>
                <div className="padding-4">
                <div className="col-sm-12">
                    <span className="score-attitude-new__left-title">Daftar Laporan Sikap (Matematika) </span>
                </div>
                <div className="col-sm-12">
                    <span className="score-attitude-new__predicate-title">Semua sikap </span>
                </div>
                <div className="box-report">

                </div>
            </div>
            <div className="row ">
                 <div className="col-sm-12">
                    <div className="border-top-score">
                      <div className="margin-top-3 margin-left-3 ">   
                        <NavLink className="font-grey  padding-3" to="/#" activeClassName="tab-predicate">
                            Semua
                        </NavLink>
                        <NavLink className="font-grey  padding-3" to="#" activeClassName="active-menu">
                            Sangat Baik
                        </NavLink>
                        <NavLink className="font-grey  padding-3" to="#" activeClassName="active-menu">
                            Baik
                        </NavLink>
                        <NavLink className="font-grey  padding-3" to="#" activeClassName="active-menu">
                            Butuh Perhatian
                        </NavLink>
                    
                     </div>
                     </div>

                 </div>
            </div>
         </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Report)