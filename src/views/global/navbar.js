import React, { Component } from 'react'
import '../../styles/global/header.scss'
import '../../styles/global/component.css'
import '../../styles/global/navbar.scss'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getMenu } from './../../redux-modules/modules/menu'


const menus = [
    { name: "Beranda", link: "/home", role: 'all' },
    { name: "Absensi", link: "/absen", role: 'all' },
    { name: "Penilaian", link: "/penilaian", role: 'all' },
    { name: "Ujian Sekolah", link: "/online-exam/", role: 'all' },
    { name: "Daftar Nilai", link: "/daftar-nilai", role: 'all' },
    { name: "Rapor Kelas", link: "/rapor", role: 'homeroom' },
    { name: "Daftar Murid", link: "/murid", role: 'homeroom' },
]

class MenuBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            navbar: props.navbar || true
        };
    }
    componentDidMount() {
        this.props.getMenu()
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        let content = []
        const { navbar } = this.props
        const user_type = localStorage.getItem('homeroom_class')
        if (user_type === 'null') {
            menus.map(function (data, index) {
                if (data.role === 'all') {
                    content.push(
                        <NavLink className="font-grey" key={index} to={data.link} activeClassName="active-menu">
                            {data.name}
                        </NavLink>
                    )
                }
            })
        } else {
            menus.map(function (data, index) {
                content.push(
                    <NavLink className="font-grey" key={index} to={data.link} activeClassName="active-menu">
                        {data.name}
                    </NavLink>
                )
            })
        }
        return (
            <div className="menu-bar">
                <div className="bg-white size-nav">
                    {
                        navbar === false ?
                            <div className="bg-white">
                                <div className="menu">
                                    <div className="back">
                                        <Link to={this.props.location}><i className="fa fas fa-chevron-left"></i> Kembali</Link>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="topnav">
                                <div className="menu">
                                    {content}
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    menu: state
})
const mapDispatchToProps = dispatch => bindActionCreators({ getMenu }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)





