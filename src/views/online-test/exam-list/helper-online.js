import React, { Component } from 'react'

export class DetailOnlineExam extends Component {
    render() {
        let content = []
        let data = this.props.detail
        if (!data.hasOwnProperty) {
            content.push(
                <label key={Math.random()} className='text-danger info'>Soal Belum Dibuat</label>
            )
        } else {
            content.push(
                <div key={Math.random()}>
                    <label className='info padding-bottom-2'>
                        {data.choices} Pilihan Ganda & {data.essay} Essay
                    </label>
                    <label className='info text-justify'>{data.desc}</label>
                </div>
            )
        }

        return (
            <div>{content}</div>
        )
    }
}
