import React, { Component } from 'react'
import Logo from './../../../assets/images/logo.svg'
import Avatar from 'react-avatar-edit'
import { modal, error } from '../../global/modal'
import { apiClient } from '../../../utils/apiClient'
import Page from './../../../components/Title'

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
            token: this.props.match.params.code,
            type: {
                pass: 'password',
                re_pass: 'password',
            },
            value: {
                pass_value: '',
                re_pass_value: ''
            }
        }
        this.setEditorRef = this.setEditorRef.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onClose() {
        this.setState({ preview: null })
    }
    onCrop(preview) {
        this.setState({ preview })
    }
    onShow(e, props) {
        e.preventDefault();
        e.stopPropagation();

        let type = this.state.type
        type[props] = type[props] === 'input' ? 'password' : 'input'
        this.setState({
            type: type
        })
    }
    onChange(e, props) {
        e.preventDefault()

        let value = this.state.value
        value[props] = e.target.value
        this.setState({
            value: value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { value } = this.state
        var base = []

        if (this.state.editor.state.image) {
            var currentSrc = this.state.editor.state.image.currentSrc
            var result = currentSrc.split(';')
            base = result[1].split(',')
        }

        const url = `authentication/activate`
        const user = {
            password: value.pass_value,
            password_confirmation: value.re_pass_value,

            user_picture: {
                src: base[1],
                content_type: this.state.contentType
            }
        }
        let data = {}
        data['user'] = user
        apiClient('post', url, data).then(res => {
            localStorage.removeItem('regist_token')
            modal({
                message: 'Berhasil',
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
            let errMsg = err.response.data.errors[0].description[0]

            if (base.length > 0) {
                error({
                    message: errMsg,
                    btns: [
                        {
                            label: 'Ulangi',
                            className: 'btn bcred cwhite'
                        }
                    ]
                })
            }
            else {
                error({
                    message: 'Photo harus di unggah',
                    btns: [
                        {
                            label: 'Ulangi',
                            className: 'btn bcred cwhite'
                        }
                    ]
                })
            }
        })
    }
    setEditorRef(editor) {
        this.setState({
            editor: editor
        })
    }


    render() {
        const { type, value } = this.state
        return (
            <Page title='New Password'>
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
                                <span className='info'> Ubah Foto Profil</span>
                            </div>
                            <div className="direct align-center margin-top-6 margin-bottom-4">
                                Buat Kata Sandi Baru Kamu
                            </div>
                            <div className='regist'>
                                <input
                                    type={type.pass}
                                    className='password-mask-input'
                                    value={value.pass_value}
                                    onChange={(e) => { this.onChange(e, 'pass_value') }}
                                    placeholder='Kata Sandi'
                                />
                                <span className="input-group-text password-mask-button" onClick={(e) => { this.onShow(e, 'pass') }} >
                                    <i className="fa far fa-eye"></i>
                                </span>
                            </div>
                            <div className='regist margin-top-2'>
                                <input
                                    type={type.re_pass}
                                    className='password-mask-input'
                                    value={value.re_pass_value}
                                    onChange={(e) => { this.onChange(e, 're_pass_value') }}
                                    placeholder='Ketik Kembali Kata Sandi'
                                />
                                <span className="input-group-text password-mask-button" onClick={(e) => { this.onShow(e, 're_pass') }} >
                                    <i className="fa far fa-eye"></i>
                                </span>
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
            </Page>
        )
    }
}
