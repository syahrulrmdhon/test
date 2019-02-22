import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allChecked, itemCheckbox } from './../../../redux-modules/modules/exam'

class ChooseUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            allChecked: false,
            index: null,
        }

        this.allCheckbox = this.allCheckbox.bind(this)
        this.itemCheckbox = this.itemCheckbox.bind(this)
    }

    componentDidMount(){
        this.setState({
            index: this.props.index
        })
    }

    itemCheckbox(bool, idx){
        this.props.itemCheckbox(this.state.index, idx, !bool)
    }

    allCheckbox(bool, index){
        this.setState({
            allChecked: !bool
        })

        this.props.allChecked(this.props.index, !bool)
    }

    render(){
        let view_users = []
        let selectedAll = true
        if(this.props.classs.users){
            this.props.classs.users.map((user, idx) => {
                view_users.push(
                    <div className="col-sm-4" key={Math.random()}>
                        <div className="checkbox-wrapper padding-1">
                            <div className="checkbox-button">
                                <input 
                                    type="checkbox" 
                                    id={user.id} 
                                    value={user.id} 
                                    name="checkbox" 
                                    defaultChecked={user.is_selected}
                                    onClick={() => {this.itemCheckbox(user.is_selected, idx)}}
                                />
                                <label htmlFor={user.id}></label>
                            </div>
                            <label htmlFor={user.id} className="checkbox-label">{user.full_name}</label>
                        </div>
                    </div>
                )

                if(user.is_selected == false){
                    selectedAll = false
                }
            })
        } else {
            view_users.push(
                <div className="col-sm-12" key={1}>
                    <div className="align-center">
                        User tidak ditemukan
                    </div>
                </div>
            )
        }

        const isActived = this.props.isActived == 'active' ? '' : 'hide'

        return(
            <div className={isActived}>
                <div className="border-full padding-4 margin-bottom-2">
                    <div className="row">
                        {view_users}
                    </div>
                </div>
                <div className="disblock">
                    <div className="checkbox-wrapper">
                        <div className="checkbox-button">
                            <input 
                                type="checkbox" 
                                id="check1" 
                                value="check1" 
                                name="checkbox" 
                                defaultChecked={selectedAll} 
                                onClick={(event) => {this.allCheckbox(selectedAll, this.props.index)}} 
                            />
                            <label htmlFor="check1"></label>
                        </div>
                        <label htmlFor="check1" className="checkbox-label">Pilih Semua Peserta Didik</label>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    classs: state.exam.data.classes[props.index]
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
    allChecked,
    itemCheckbox
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChooseUser);