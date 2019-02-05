import React, { Component } from 'react'
import Header from '../global/header'
import './../../styles/penilaian.css'
import classnames from 'classnames'
import Basic from './new/basic'
import Componentt from './new/component'
import { apiClient } from '../../utils/apiClient'

const menu_arr = [
    {
        key: '1',
        label: 'Informasi Dasar',
    },
    {
        key: '2',
        label: 'Komponen',
    },
]

class New extends Component {
    constructor(props){
        super(props)

        this.state = {
            tabMenu: '1'
        }

        this.callBack = this.callBack.bind(this)
    }

    componentDidMount(){
        apiClient('get', "v1/assessments/new").then(response => {
            const assessment = response.data.data.assessment

            this.setState({
                tabMenu: (typeof assessment == 'object') ? '2' : '1',
            })
        })
    }

    callBack(step = false){
        let tab_menu = "1";
        switch(step){
            case 'basic':
                tab_menu = "2"
            break
            case 'component':
                tab_menu = "1"
            break
        }

        this.setState({
            tabMenu: tab_menu
        })
    }

    render(){
        let menu_view = []
        menu_arr.map((menu, idx) => {
            let class_label = 'cgray2'
            let class_bullet = 'bcgray-blur'

            let active_menu = (this.state.tabMenu == menu.key) ? true : false
            if(active_menu){
                class_label = ""
                class_bullet = "bcgreen box-shadow"
            }
            
            menu_view.push(
                <div id={menu.key} className="disinblock" key={Math.random()}>
                    <div className="align-center">
                        <i className={classnames("bullet", class_bullet)}></i>
                    </div>
                    <label className={classnames("disblock margin-top-2", class_label)}>{menu.label}</label>
                </div>
            )
        })

        let tab_content = []
        switch(this.state.tabMenu){
            case '1':
            tab_content.push(<Basic key={Math.random()} callBack={this.callBack} />)
            break
            case '2':
            tab_content.push(<Componentt key={Math.random()} callBack={this.callBack} />)
        }

        return(
            <div className="padding-content">
                <Header />
                <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">Tambah Topik</label>
                                    <div className="float-right">
                                        <div className="tab-assessment">
                                            <div className="line-separator"></div>
                                            {menu_view}
                                        </div>
                                    </div>
                                    <div className="margin-top-10">
                                    </div>
                                    {tab_content}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default New;