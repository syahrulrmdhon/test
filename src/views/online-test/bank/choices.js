import React, { Component } from 'react'

export default class BankChoices extends Component {
    render() {
        const content = []
        const choices = this.props.data || []
        {
            choices.length ?
                choices.map((x) => {
                    content.push(
                        <div className='row' key={Math.random()}>
                            <div className='d-flex'>
                                <div>{x.symbol ? x.symbol : '-'}.</div>
                                <div className='text-justify ml-3'>{x.content ? x.content : '-'}</div>
                            </div>
                        </div>
                    )
                })
            :
            content.push(
                <div className='row' key={Math.random()}></div>
            )

    }
        return (
            <div className='padding-side-3 margin-vert-2 question'>
                {content}
            </div>
        )
    }
}