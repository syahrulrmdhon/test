import React, { Component } from 'react'
import { assessmentGetData } from '../../utils/exam'

import Table from './index/table'
import Pagination from '../global/pagination'
import ReactPaginate from 'react-paginate'
import previous from '../../assets/images/previous.svg'
import next from '../../assets/images/next.svg'
import Loader from './../global/loader'

export default class IndexAssessment extends Component {
    constructor(props){
        super(props)

        this.state = {
            activeTab: 'knowledge',
            assessment_type: null,
            class_id: null,
            school_subject_id: null,
            data: [],
            paginate: {},
            assessment_types: [],
        }
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.data !== prevProps.data){
            this.setState({
                data: this.props.data,
            })
        }
    }
    
    handlePageClick(data) {
        let page = data.selected + 1
        assessmentGetData.call(this, this.state.activeTab, page)
    }
    
    render() {
        let content = []
        if(this.state.data.length > 0){
            content.push(<Table 
                key={Math.random()}
                data={this.state.data} 
                category={this.props.category}
            />)            
        }

        var element = document.getElementById("topic-wrapper")
        if (element) {
            let body = document.getElementById('topics')
            let bodyWidth = ''
            if (body) {
                bodyWidth = body.clientWidth
            }
            
            window.addEventListener("load", function() {
                let head = document.querySelector('thead')

                let body = document.querySelector('tbody')
                bodyWidth = body.clientWidth
                head.style = `width: ${bodyWidth}px`
            })

            window.addEventListener("resize", function() {
                let head = document.querySelector('thead')
                let body = document.querySelector('tbody')
                bodyWidth = body.clientWidth
                head.style = `width: ${bodyWidth}px`

            })

            element.addEventListener("scroll", function () {
                var scrollTop = element.scrollTop;
                let head = document.querySelector('thead')
                let body = document.querySelector('tbody')
                head.style = `width: ${bodyWidth}px`

                if (scrollTop > 113) {
                    head.className = 'fixed-header'
                }
                else if (scrollTop <= 62) {
                    head.className = ''
                }
            });
        }


        return(
            <div className="empty-wrapper">

                {
                    this.props.loader ?
                        <Loader />
                    :
                    content.length ?
                    <div>
                        {content}
                        {this.props.paginate.total_pages > 1 && 
                            <div className="align-center">
                                <ReactPaginate
                                    previousLabel={<img src={previous} alt="" className="arrow-left"/>}      
                                    nextLabel={<img src={next} alt="" className="arrow-right" />}          
                                    breakLabel={'...'}
                                    breakClassName={'break-me disinblock'}
                                    pageCount={this.props.paginate.total_pages}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination disblock'}
                                    pageClassName={'disinblock'}
                                    previousClassName={'disinblock'}
                                    nextClassName={'disinblock'}
                                    activeClassName={'active'} />
                            </div>

                        }
                    </div>
                    :
                    <div className="margin-top-4 empty-data" key={1} >
                        Data belum tersedia.
                    </div>
                }
            </div>
        )
    }
}