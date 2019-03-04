import React, { Component } from 'react'
import { connect } from 'react-redux'

export class componentName extends Component {
  render() {
    return (
      <div>
            test
      </div>    
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
