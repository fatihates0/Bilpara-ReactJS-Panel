import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <nav className="nxl-navigation">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <Link to="/" className="b-brand">
                        <img src="assets/images/logo-full.png" style={{width:'70%'}} alt="" className="logo logo-lg" />
                        <img src="assets/images/logo-abbr.png" alt="" className="logo logo-sm" />
                    </Link>
                </div>
                <div className="navbar-content">
                    <ul className="nxl-navbar">
                        <li className="nxl-item nxl-caption"><label>Sayfalar</label></li>

                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-airplay"></i></span> <span className="nxl-mtext">Anasayfa</span>
                            </Link>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/questions" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-help-circle"></i></span> <span className="nxl-mtext">Sorular</span>
                            </Link>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/users" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-users"></i></span> <span className="nxl-mtext">Kullanıcılar</span>
                            </Link>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/users" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-archive"></i></span> <span className="nxl-mtext">Ürün Yönetimi</span>
                            </Link>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/users" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-shopping-bag"></i></span> <span className="nxl-mtext">Sipariş Yönetimi</span>
                            </Link>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/users" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-activity"></i></span> <span className="nxl-mtext">Destek Portalı</span>
                            </Link>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <Link to="/notifications" className="nxl-link">
                                <span className="nxl-micon"><i className="feather-bell"></i></span> <span className="nxl-mtext">Bildirim Sistemi</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
