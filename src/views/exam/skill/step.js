import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class componentName extends Component {
 
  render() {
      console.log(this.props.assessmen,"terus")
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
    assessmen: state || []
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
   
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(componentName)