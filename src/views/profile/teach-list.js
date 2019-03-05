import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../global/header'
import Page from './../../components/Title'
import Sidebar from './index/sidebar'
import Avatar from 'react-avatar';
import Logo from './../../assets/images/logo.svg'
import { apiClient } from './../../utils/apiClient'

// scss
import './../../styles/profile.scss'

export class componentName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        const url = `v1/users/subject_classes`
        apiClient('get', url).then(res => {
            this.setState({
                data: res.data.data.subject_classes
            })
        })
            .catch(err => {
                let response = err.response
                let data = response.data.status_code
                if (data === 400) {

                }
            })
    }

    render() {
        let school = JSON.parse(window.localStorage.getItem('school'))
        const school_name = school.name
        const aws_img = school.doc_aws_url
        let content = []
        const { data } = this.state
        console.log(data)
        
        data && data.map((data) => {
            console.log(data)
            content.push(
                <tbody key={Math.random()}>
                    <tr >
                        <td className="padding-2">{data.class_name}</td>
                        <td className="padding-2">{data.subject_name}</td>
                        <td className="padding-2">{data.class_name}</td>

                    </tr>
                </tbody>
            )
        })



        return (
            <Page title="Informasi Mengajar">
                <Header />
                <div className="teacher">
                    <div className="padding-content">
                        <div className="margin-8">
                            <div className="content-block main-block fit-screen">
                                <div className="row">
                                    <div className="col-sm-2 left-block fit-screen">
                                        <Sidebar />
                                    </div>
                                    <div className="col-sm-10 right-block">
                                        <div className="padding-top-6 padding-left-4 ">
                                            <div className="title">
                                                Daftar Menagajar
                                            </div>
                                            <div className="margin-top-5">
                                                <Avatar src={aws_img} round={true} size={60} />
                                                <span className="school-name margin-left-1">{school_name}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {/* <div className="table-responsive"> */}
                                                        <table  className="teacher__list-table full-border  table-striped">
                                                            <thead >
                                                                <th className="padding-2">Kelas</th>
                                                                <th>Nama Pelajaran</th>
                                                                <th>Hari Mengajar</th>
                                                            </thead>
                                                                {content}
                                                        </table>

                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Page>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
