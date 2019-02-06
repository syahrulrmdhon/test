import React from 'react'

export const LabelInfo = (props) => {
    const style = props.className
    
    return (
        <div className={["alert alert-info", style].join(" ")}>
            {props.children}
        </div>
    )
}