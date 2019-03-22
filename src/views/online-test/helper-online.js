import React, { Component } from 'react'

export class DetailOnlineExam extends Component {
    render() {
        let content = []
        let data = this.props.detail
        if (data) {
            const full = data.problem_type_full_text
            content.push(
                <div key={Math.random()}>

                    {full === '' ?
                        <label key={Math.random()} className='info-danger'>Soal Belum Dibuat</label>
                        :
                        <label className='info padding-bottom-2'>{full}</label>
                    }
                </div>
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}
