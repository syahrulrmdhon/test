import React, { Component } from 'react'
import './../../../styles/global/component.css'
import './../../../styles/beri-nilai/main.scss'
import TableNoQuestions from './table-no-questions'
import Select from 'react-select'


export default class BottomContentNoQuestions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchName: '',
            searchQuestion: []
        }

        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(e) {
        let search = e.target.value
        let datax = this.props.data
        this.setState({ searchName: search })

        if (search) {
            search = search.toLowerCase()
            const datax = this.props.data
            let data = datax.filter((value) => {
                return value.user.full_name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            if (datax.length === 0) {
                this.setState({ searchQuestion: null })
            }
            else {
                this.setState({ searchQuestion: data })
                console.log('atas', this.state.searchQuestion)
            }
        }
        else {
            this.setState({ searchQuestion: datax })
            console.log('bawah', this.state.searchQuestion)
        }
    }
    render() {
        return (
            <div className='bottom-contents'>
                <div className='title-content-evaluasi margin-top-4'>

                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='margin-top-4 padding-side-4'>
                                <div className='row'>
                                    <div className='col-sm-4'>
                                        <div className='margin-top-2'>
                                            <span>Hasil Perolehan Nilai</span>
                                        </div>
                                    </div>
                                    <div className='col-sm-8'>
                                        <div className='row'>
                                            <div className='col-sm-4'>
                                                <Select
                                                    placeholder='Urut Berdasarkan'
                                                    classNamePrefix='select'
                                                />
                                            </div>
                                            <div className='col-sm-8'>
                                                <div className='search'>
                                                    <input
                                                        autoComplete="off"
                                                        className="input-field"
                                                        type="text"
                                                        placeholder="Cari murid disini..."
                                                        name="search"
                                                        onChange={this.handleSearch}
                                                    />
                                                    <i className="fa fa-search icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='padding-left-4 padding-right-4'>
                                <TableNoQuestions
                                    data={this.props.data}
                                    selectIndex={this.props.selectIndex}
                                    handleClick={this.props.handleClick}
                                    // users={this.props.users}
                                    // scores={this.props.scores}
                                    // totalAverages={this.props.totalAverages}
                                    handleClickQuestion={this.props.handleClickQuestion}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
