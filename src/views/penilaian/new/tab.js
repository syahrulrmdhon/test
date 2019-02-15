import React, { Component } from 'react'
import classnames from 'classnames'

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

class Tab extends Component {
    render(){
        let result = []
        if(menu_arr.length > 0){
            menu_arr.map((menu, idx) => {
                let class_label = 'cgray2'
                let class_bullet = 'bcgray-blur'

                let active_menu = (this.props.tab == menu.key) ? true : false
                if(active_menu){
                    class_label = ""
                    class_bullet = "bcgreen box-shadow"
                }

                result.push(
                    <div id={menu.key} className="disinblock" key={idx}>
                        <div className="align-center">
                            <i className={classnames("bullet", class_bullet)}></i>
                        </div>
                        <label className={classnames("disblock margin-top-2", class_label)}>{menu.label}</label>
                    </div>
                )
            })
        }

        return(
            <div className="float-right">
                <div className="tab-assessment">
                    <div className="line-separator"></div>
                    {result}
                </div>
            </div>
        )
    }
}
export default Tab;