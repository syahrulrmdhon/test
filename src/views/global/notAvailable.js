import React from 'react'
import '../../styles/global/not-available.css'

export const NotAvailable = (props) => {
    return (
        <div className='not-available empty-data'>
            {props.children}
        </div>
    )
}