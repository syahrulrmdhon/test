import React, { Component } from 'react'
// import Avatar from 'react-avatar'
import Ava from './../../../assets/images/img_avatar.png'
import Logo from './../../../assets/images/logo.svg'
import LogoFull from './../../../assets/images/ic-logo-gredu.svg'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import { modal, error } from '../../global/modal'
import { apiClient } from '../../../utils/apiClient'
import PasswordMask from 'react-password-mask'

export default class NewPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            src: '',
            preview: null,
            password: '',
            repassword: '',
            user: {},
            contentType: 'image/png',
            editor: '',
            token: this.props.match.params.code
        }
        this.setEditorRef = this.setEditorRef.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    onClose() {
        this.setState({ preview: null })
    }
    onCrop(preview) {
        this.setState({ preview })
    }
    handleChange(e) {
        let regist = {}
        regist[e.target.name] = e.target.value
        this.setState(regist)
    }
    handleSubmit(e) {
        e.preventDefault()

        var result = this.state.editor.state.image.currentSrc.split(';')
        var base = result[1].split(',')
        const url = `authentication/activate`
        const user = {
            password: this.state.password,
            password_confirmation: this.state.repassword,
            user_picture: {
                src: base[1],
                content_type: this.state.contentType
            }
        }
        let data = {}
        data['user'] = user
        apiClient('post', url, data).then(res => {
            localStorage.clear()
            modal({
                message: 'Selamat',
                description: 'Password berhasil dibuat',
                btns: [
                    {
                        label: 'Lanjut',
                        className: 'btn green',
                        event: this.props.history.push('/')
                    }
                ]
            })
        }).catch(err => {
            error({
                message: 'Gagal, data salah atau tidak lengkap',
                btns: [
                    {
                        label: 'Ulangi',
                        className: 'btn bcred cwhite'
                    }
                ]
            })
        })
    }
    setEditorRef(editor) {
        this.setState({
            editor: editor
        })
    }


    render() {
        return (
            <div className='verification'>
                <div className="header padding-2">
                    <img className="logo margin-left-4" src={Logo} alt="" />
                </div>
                <div className="body-gredu">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="ava margin-bottom-4">
                            <Avatar
                                width={90}
                                height={90}
                                round={true}
                                src={this.state.src}
                                round={true}
                                label='Pilih Photo'
                                labelStyle={{ fontSize: '8px' }}
                                onCrop={this.onCrop.bind(this)}
                                onClose={this.onClose.bind(this)}
                                ref={this.setEditorRef}
                            />
                        </div>
                        <br /><br /><br /><br />
                        <div className="margin-top-6 align-center">
                            <i className='fa fa-camera'></i>
                            <span className='info'> Change Profile Photo</span>
                        </div>
                        <div className="direct align-center margin-top-6 margin-bottom-4">
                            Buat Password Baru Kamu
                        </div>
                        <div className='regist'>
                            <PasswordMask
                                className='mask' id='password'
                                inputClassName='password-mask-input'
                                buttonClassName='fa fa-eye password-mask-button'
                                name='password' placeholder='Kata Kunci'
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className='regist margin-top-2'>
                            <PasswordMask
                                className='mask' id='repassword'
                                inputClassName='password-mask-input'
                                buttonClassName='fa fa-eye password-mask-button'
                                name='repassword' placeholder='Ketik Kembali Kata Kunci'
                                value={this.state.repassword}
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className='margin-top-2'>
                            <div className='col-sm-12'>
                                <div className='row'>
                                    <div className='col-sm-offset-3 col-sm-2'></div>
                                    <div className='col-sm-2'>
                                        <button type='submit' className='btn-young-green margin-top-4'>Selesai</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <p className="copyright">Copyright © (2019) Gredu Asia. All rights reserved. - GREDU PT. Sumber Kreatif Indonesia.</p>
                </div>
            </div>
        )
    }
}
