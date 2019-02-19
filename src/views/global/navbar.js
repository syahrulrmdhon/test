import React, { Component } from 'react'
import '../../styles/global/header.scss'
import '../../styles/global/component.css'
import '../../styles/global/navbar.scss'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getMenu } from './../../redux-modules/modules/menu'


const menus = [
    { name: "Beranda", link: "/home" },
    { name: "Absensi", link: "/absen" },
    { name: "Penilaian", link: "/penilaian" },
    { name: "Daftar Nilai", link: "/daftar-nilai" },
    { name: "Rapor Kelas", link: "/rapor" },
    { name: "Daftar Murid", link: "/murid" },
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
    componentDidMount(){
        this.props.getMenu()
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const { navbar } = this.props
        const menu = this.props.menu && this.props.menu.Menu && this.props.menu.Menu.data
        console.log(menu,"here")
        return (
            <div className="menu-bar">
                <div className="bg-white size-nav">
                           { 
                            navbar === false?
                            <div className="bg-white">
                            <div className="back">
                                <Link to={this.props.location}>&lt; Kembali</Link>
                            </div>
                            </div>
                            :
                               <div className="topnav">
                                <div className="menu">
                                        {
                                            menus.map(function (data, index) {
                                                return  <NavLink className="font-grey" key={index} to={data.link} activeClassName="active-menu">
                                                        {data.name}
                                                    </NavLink>
                                            })
                                        }
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