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

export class ActionList extends Component {
    render() {
        let content = []
        let data = this.props.action
        if (data > 0) {
            content.push(
                <div className='right-block__action-wrapper' key={Math.random()}>
                    <div className='right-block__action'>Lihat</div>
                    <div className='right-block__action'>Hapus Soal</div>
                </div>
            )
        } else {
            content.push(
                <div className='right-block__action-wrapper' key={Math.random()}>
                    <div className='right-block__action padding-left-0'>Buat Soal</div>
                </div>
            )
        }

        return (
            <div className='padding-top-2'>
                {content}
            </div>
        )
    }
}

export class DetailAction extends Component {
    render() {
        let content = []
        let data = this.props.detail
        let id = this.props.id

        if (data > 0) {
            content.push(
                <div className='padding-bottom-2' key={Math.random()}>
                    <label className='p-bold padding-right-2'>Detil Soal</label>
                    <i className='fa fa-pencil icon-green' onClick={(e) => (this.props.detailClicked(e, id))}>
                    </i>
                </div>
            )

        } else {
            content.push(
                <div className='padding-bottom-2' key={Math.random()}>
                    <label className='p-bold padding-right-2'>Detil Soal</label>
                </div>
            )
        }

        return <div>
            {content}
        </div>
    }
}