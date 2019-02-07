import React, {Component} from 'react'
import ReactPaginate from 'react-paginate'
import previous from '../../assets/images/previous.svg'
import next from '../../assets/images/next.svg'

import '../../styles/pagination.scss'

const pagination = (props) => {
  return (
      <ReactPaginate
        previousLabel={<img src={previous} alt="" className="arrow-left"/>}      
        nextLabel={<img src={next} alt="" className="arrow-right" />}          
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={props.pageCount}
        marginPagesDisplayed={props.marginPagesDisplayed}
        pageRangeDisplayed={props.pageRangeDisplayed}
        // onPageChange={this.handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
  );
}

export default pagination;