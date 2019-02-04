import React, {Component} from 'react'
import ReactPaginate from 'react-paginate'
var FontAwesome = require('react-fontawesome')

import '../../styles/pagination.scss'

class Pagination extends Component {
  render() {

    return (
      <div>
        <ReactPaginate
          previousLabel={<FontAwesome className="arrow-left" name={"arrow-left"}/>}
          nextLabel={<FontAwesome className="arrow-right" name={"arrow-right"}/>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          // onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default Pagination;