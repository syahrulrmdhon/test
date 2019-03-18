import React, { Component } from 'react'

export default class Loader extends Component {

    render() {
        let loader = this.props.loader
        if (loader) {
            loader =  <div className="loader-wrapper">
                            <div className="sk-double-bounce">
                                <div className="sk-child sk-double-bounce1"></div>
                                <div className="sk-child sk-double-bounce2"></div>
                            </div>  
                        </div> 
        }
        else {
            loader = false 
        }

        return loader
    }
}
