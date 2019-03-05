import React, { Component } from 'react'
import Helmet from 'react-helmet';
import Favicon from './../../assets/images/logo.ico'
const defaultTitle = "GREDU INDONESIA"


export default class Title extends Component {
    render() {
        const { title } = this.props
        return (
            <div className="h-100">
                <Helmet
                    title={title ? title + ' | Gredu Indonesia':defaultTitle}
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
