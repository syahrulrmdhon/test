import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../global/header'
import Page from './../../components/Title'
import Sidebar from './index/sidebar'
import Avatar from 'react-avatar';
import { apiClient } from './../../utils/apiClient'
import { Table } from 'reactstrap'
import User from './../../assets/images/avatar_def.svg'
import Loader from './../global/loader'



// scss
import './../../styles/profile.scss'
export class componentName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            loader: true
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        const url = `v1/users/subject_classes`
        apiClient('get', url).then(res => {
            let join_data =  [] 
            for (var i in res.data.data.subject_classes) {
                const data = res.data.data.subject_classes[i]
                for(let j in data.subject_schedules){
                    data.subject_schedules[j].dayname = this.convertDay(data.subject_schedules[j].dayname)
                }
            }
            this.setState({
                loader: false,
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

    convertDay(day) {
        let day_in_indo = ''
        if (day === 'monday') {
            day_in_indo = 'Senin'
        } else if (day === 'tuesday') {
            day_in_indo = 'Selasa'
        } else if (day === 'wednesday') {
            day_in_indo = 'Rabu'
        } else if (day === 'thursday') {
            day_in_indo = 'Kamis'
        } else if (day === 'friday') {
            day_in_indo = 'Jumat'
        }

        return day_in_indo;
    }

     find_duplicate_in_array(arra1) {
        var object = {};
        var result = [];

        arra1.forEach(function (item) {
          if(!object[item])
              object[item] = 0;
            object[item] += 1;
        })

        for (var prop in object) {
           if(object[prop] >= 2) {
               result.push(prop);
           }
        }

        return this.convertDay(result);

    }

    remvoeDuplicate(arrArg){
        return arrArg.filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos;
          });
    }

    render() {
        let school = JSON.parse(window.localStorage.getItem('school'))
        const school_name = school.name
        let school_logo = !!(school) ? school.asset.doc_aws_url : User
        let content = []
        const { data } = this.state
        let join_data = []
        let final_data = ''
        data && data.map((data, idx) => {
            for (var i in data.subject_schedules) {
                const a = data.subject_schedules[i]
                join_data.push(a.dayname)
            }
            final_data = this.remvoeDuplicate(join_data).join(", ")

            content.push(
                <tr key={Math.random()}>
                    <td className="padding-2 text-left">{data.class_name}</td>
                    <td className="padding-2 text-left">{data.subject_name}</td>
                    <td className="padding-2 text-left">{final_data}</td>
                </tr>   
            )
        })

        return (
            <Page title="Informasi Mengajar">
                <Header />
                <div className="teacher">
                    <div className="padding-content">
                        <div className="margin-content">
                            <div className="content-block main-block">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <Sidebar />
                                    </div>
                                    <div className="col-sm-10 right-block">
                                        <div className="padding-top-6 padding-left-4 ">
                                            <div className="title">
                                                Daftar Mengajar
                                            </div>
                                            <div className="margin-top-5">
                                                <Avatar src={school_logo} round={true} size={60} />
                                                <span className="school-name margin-left-1">{school_name}</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="table-content-list fullwdith">
                                                        <Table bordered responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-left">Kelas</th>
                                                                    <th className="text-left">Mata Pelajaran</th>
                                                                    <th className="text-left">Hari Mengajar</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {content.length ?
                                                                    content :
                                                                    <tr>
                                                                        <td colSpan="3">
                                                                            <Loader loader={this.state.loader} />
                                                                            Data Tidak Tersedia
                                                                    </td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </div>
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
