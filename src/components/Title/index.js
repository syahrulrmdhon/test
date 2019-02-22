import React, { Component } from 'react'
import Helmet from 'react-helmet';
import Favicon from './../../assets/images/logo.ico'
const defaultTitle = "GREDU INDONESIA"


export default class Title extends Component {
    render() {
        const { title } = this.props
        return (
            <div>
                <Helmet
                    title={title ? title:defaultTitle}
                    link={[
                        {
                            rel: 'icon',
                            href: Favicon
                        }
                    ]}
                />
                {this.props.children}
            </div>
        )
    }
}
