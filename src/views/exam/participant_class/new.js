import React, { Component } from 'react'
import Header from '../../global/header'
var FontAwesome = require('react-fontawesome')
import Classes from './classes'

export default class ParticipantClass extends Component {
    constructor(props){
        super(props)

        this.state = {
            class_list: [{}]
        }

        this.addClass = this.addClass.bind(this)
    }

    addClass(){
        const class_list = this.state.class_list[0]
        this.setState({
            class_list: this.state.class_list.concat(class_list)
        })
    }

    render(){
        let class_view = []
        if(this.state.class_list.length > 0){
            this.state.class_list.map((x, idx) => {
                class_view.push(<Classes 
                    index={idx} 
                    key={Math.random()}  
                />)
            })
        }

        return(
            <div className="padding-content">
                <Header />
                <div className="container">
                    <div className="margin-8">
                        <div className="content-block main-block">
                            <div className="margin-side-10 padding-10">
                                <form>
                                    <label className="header-title form disblock">Kelas yang ditugaskan</label>
                                    {class_view}
                                    <div className="row margin-top-6">
                                        <div className="col-sm-6">
                                            <a href="javascript:void(0);" onClick={this.addClass} >
                                                <FontAwesome name="plus-circle" /> Tambah Kelas
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )       
    }
}