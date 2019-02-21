import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { getDate, setError } from '../../utils/common'
import Error from '../global/error'
import { apiClient } from '../../utils/apiClient'
import {modal} from './../global/modal'

export default class ScheduleModal extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            listClass: this.props.listClass,
            setDate: this.props.setDate,
            errors: {},
            
            id: this.props.id,
            start_time: new Date,
            end_time: new Date,
            classs_id: '',
            description: '',
        }

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.handleAttribute = this.handleAttribute.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onOpenModal(id = false, method = false) {
        this.setState({
            id: null,
            start_time: new Date,
            end_time: new Date,
            classs_id: '',
            description: '',
            errors: {},
        })
        if(!!(id)){
            const url = 'v1/home/schedule/'+id // GET SCHEDULE DETAIL

            apiClient('get', url).then(response => {
                let activity_schedule = response.data.data.activity_schedule

                let start = this.state.setDate+' '+activity_schedule.start_time
                let end = this.state.setDate+' '+activity_schedule.end_time

                let classs_id = null

                if(activity_schedule.classs_id != null){
                    classs_id = {
                        label: activity_schedule.classes,
                        value: activity_schedule.classs_id,
                    }
                }

                this.setState({
                    id: id,
                    start_time: new Date(start),
                    end_time: new Date(end),
                    classs_id: classs_id,
                    description: activity_schedule.description,
                })

                if(method == 'delete'){
                    apiClient(method, url).then(response => {
                        let items = response.data.data.items || []

                        modal({
                            message: 'Selamat',
                            description: `Berhasil hapus jadwal pada tanggal ${getDate('case-1', new Date(this.state.setDate))} di jam ${activity_schedule.start_time} sampai ${activity_schedule.end_time}`,
                            btns: [
                                {
                                    label: 'Selesai',
                                    className: 'btn bcgreen cwhite',
                                    event: this.props.callBack(items)
                                }
                            ]
                        })

                        this.props.callBack(items)
                    })
                }
            })
        }

        if(method != 'delete'){
            this.setState({ open: true });
        }
    };
    
    onCloseModal() {
        this.setState({ open: false });
    };

    handleAttribute(e, prop){
        let change = {}

        if (typeof e.label != 'undefined' ){
            change[prop.name] = e
        } else {
            change[e.target.name] = e.target.value
        }
        this.setState(change)
    }

    handleStart(newDate){
        this.setState({ start_time: newDate });
    }

    handleEnd(newDate){
        this.setState({ end_time: newDate });
    }

    handleSubmit(e){
        event.preventDefault(); 
        let id = this.state.id

        let classs_id = (this.state.classs_id) ? this.state.classs_id.value : null
        let start_time = getDate('case-3', this.state.start_time)
        let end_time = getDate('case-3', this.state.end_time)

        let data = {
            activity_schedule: {
                start_time: start_time,
                end_time: end_time,
                classs_id: classs_id,
                description: this.state.description,
            }
        }

        if(id != null){
            let url = 'v1/home/schedule/'+id+'?date='+this.state.setDate // UPDATE SCHEDULE
            apiClient('put', url, data).then(response => {
                this.setState({
                    open: false,
                })
    
                let items = response.data.data.items || []
                
                modal({
                    message: 'Selamat',
                    description: `Berhasil ubah jadwal pada tanggal ${getDate('case-1', new Date(this.state.setDate))} di jam ${start_time} sampai ${end_time}`,
                    btns: [
                        {
                            label: 'Selesai',
                            className: 'btn bcgreen cwhite',
                            event: this.props.callBack(items)
                        }
                    ]
                })
            }).catch(error => {
                let response = error.response
                let data = response.data
    
                this.setState({
                    open: true,
                    errors: setError(data),
                })
            })
        } else {
            let url = 'v1/home/schedule?date='+this.state.setDate // SET SCHEDULE
            apiClient('post', url, data).then(response => {
                this.setState({
                    open: false,
                })
    
                let items = response.data.data.items || []

                modal({
                    message: 'Selamat',
                    description: `Berhasil tambah jadwal pada tanggal ${getDate('case-1', new Date(this.state.setDate))}  di jam ${start_time} sampai ${end_time}`,
                    btns: [
                        {
                            label: 'Selesai',
                            className: 'btn bcgreen cwhite',
                            event: this.props.callBack(items)
                        }
                    ]
                })

                // this.props.callBack(items)
            }).catch(error => {
                let response = error.response
                let data = response.data
    
                this.setState({
                    open: true,
                    errors: setError(data),
                })
            })
        }
    }

    render(){
        const { open } = this.state;
        let setDate = getDate('case-1', new Date(this.state.setDate));

        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="popup-header align-center">
                            <div className="header-title">Tambah Kegiatan</div>
                            <div className="date-title">{setDate}</div>
                        </div>
                        <div className="popup-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Waktu Mulai</label>
                                <div className="margin-top-1">
                                    <DatePicker
                                        selected={this.state.start_time}
                                        onChange={this.handleStart}
                                        name= "start_time"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={10}
                                        dateFormat="h:mm aa"
                                        timeCaption="Time"
                                    />
                                    <Error data={this.state.errors} fieldname= 'start_time' />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label>Waktu Akhir</label>
                                <div className="margin-top-1">
                                    <DatePicker
                                        selected={this.state.end_time}
                                        onChange={this.handleEnd}
                                        name= "end_time"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={10}
                                        dateFormat="h:mm aa"
                                        timeCaption="Time"
                                    />
                                </div>
                                <Error data={this.state.errors} fieldname= 'end_time' />
                            </div>
                        </div>
                        <div className="row margin-top-4">
                            <div className="col-sm-12">
                                <label>Kelas (Optional)</label>
                                <div className="margin-top-1">
                                <Select
                                    className= "select-list"
                                    classNamePrefix= "select"
                                    placeholder= "Pilih kelas"
                                    name= "classs_id"
                                    onChange={this.handleAttribute}
                                    options={this.state.listClass}
                                    value={this.state.classs_id}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top-4">
                            <div className="col-sm-12">
                                <label>Keterangan</label>
                                <div className="margin-top-1">
                                    <textarea 
                                        className="fullwidth" 
                                        placeholder="Tulis keterangan.."
                                        name= "description"
                                        value= {this.state.description}
                                        onChange= {this.handleAttribute}
                                    ></textarea>   
                                    <Error data={this.state.errors} fieldname= 'description' />                     
                                </div>
                            </div>
                        </div>
                        <div className="row margin-top-6 padding-4">
                            <div className="col-sm-12">
                                <div className="align-center disblock">
                                    <input type="submit" className=" submit-btn" value="Simpan" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </Modal>
            </div>
        )
    }
}