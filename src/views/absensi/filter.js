import React, { Component } from 'react'
import Select from 'react-select'
import { getDate } from '../../utils/common'
import DatePicker from 'react-datepicker'
import { NavLink } from 'react-router-dom'
import { MainRoutes } from './../../routes/routes'

export default class FilterAbsensi extends Component {
    
    render() {
        return (
            <div className="filter">
                 {
                    MainRoutes.map(function(x,i){
                      return <NavLink to="/">
                          asda
                      </NavLink>
                    })
                  }
            </div>
        )
    }
}
