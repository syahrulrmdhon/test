import React, { Component } from 'react'
import Select from 'react-select'

export default class Dropdown extends Component {
    render() {
        return (
            <div className='col-sm-12'>
                <Select
                    placeholder='Urut Berdasarkan'
                />
            </div>
        )
    }
}
