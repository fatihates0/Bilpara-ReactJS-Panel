import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(user);
    }, [])

    const [isMiniMenu, setIsMiniMenu] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('darkTheme') ? localStorage.getItem('darkTheme') : 'LightTheme');

    //Hamburger Menü Kontrol
    useEffect(() => {
        // Component mount edildiğinde localStorage'dan durumu yükle
        const storedTheme = localStorage.getItem('nexel-classic-dashboard-menu-mini-theme');
        if (storedTheme === 'menu-mini-theme') {
            setIsMiniMenu(true);
            document.documentElement.classList.add('minimenu');
        }
    }, []);

    const handleMiniButtonClick = () => {
        setIsMiniMenu(true);
        document.documentElement.classList.add('minimenu');
        localStorage.setItem('nexel-classic-dashboard-menu-mini-theme', 'menu-mini-theme');
    };

    const handleExpendButtonClick = () => {
        setIsMiniMenu(false);
        document.documentElement.classList.remove('minimenu');
        localStorage.setItem('nexel-classic-dashboard-menu-mini-theme', 'menu-expend-theme');
    };

    //Dark Mode kontrol
    useEffect(() => {
        const storedTheme = localStorage.getItem('darkTheme') || 'LightTheme';
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        if (theme === 'darkTheme') {
            document.documentElement.classList.add('darkTheme');
        } else {
            document.documentElement.classList.remove('darkTheme');
        }
        localStorage.setItem('darkTheme', theme);
    }, [theme]);

    const handleDarkMode = (e) => {
        e.preventDefault();
        setTheme('darkTheme');
    };

    const handleLightMode = (e) => {
        e.preventDefault();
        setTheme('LightTheme');
    };

    const resetTheme = (e) => {
        e.preventDefault();
        setTheme('LightTheme');
        localStorage.removeItem('darkTheme');
        window.location.reload(true);
    };

    return (
        <header className="nxl-header">
            <div className="header-wrapper">
                <div className="header-left d-flex align-items-center gap-4">
                    <a href="#" className="nxl-head-mobile-toggler" id="mobile-collapse">
                        <div className="hamburger hamburger--arrowturn">
                            <div className="hamburger-box"><div className="hamburger-inner"></div></div>
                        </div>
                    </a>
                    <div className="nxl-navigation-toggle">
                        <a href="#" id="menu-expend-button" onClick={handleExpendButtonClick} style={{ display: isMiniMenu ? 'inline-block' : 'none' }}> <i className="feather-arrow-right"></i> </a> 
                        <a href="#" id="menu-mini-button" onClick={handleMiniButtonClick} style={{ display: isMiniMenu ? 'none' : 'inline-block' }}> <i className="feather-align-left"></i> </a>
                    </div>


                    <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                        <a href="#" id="nxl-lavel-mega-menu-open"> <i className="feather-align-left"></i> </a>
                    </div>
                    <div className="nxl-drp-link nxl-lavel-mega-menu">
                        <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                            <a href="#" id="nxl-lavel-mega-menu-hide"> <i className="feather-arrow-left me-2"></i> <span>Back</span> </a>
                        </div>
                        <div className="nxl-lavel-mega-menu-wrapper d-flex gap-3">
                            <div className="dropdown nxl-h-item nxl-lavel-menu">
                                <Link href="#" className="avatar-text avatar-md bg-primary text-white" data-bs-toggle="dropdown" data-bs-auto-close="outside"> <i className="feather-plus"></i> </Link>
                                <div className="dropdown-menu nxl-h-dropdown">
                                    <a href="#" className="dropdown-item"> <i className="feather-plus"></i> <span>Add New Items</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-right ms-auto">
                    <div className="d-flex align-items-center">
                        <div className="dropdown nxl-h-item nxl-header-search">
                            <a href="#" className="nxl-head-link me-0" data-bs-toggle="dropdown" data-bs-auto-close="outside"> <i className="feather-search"></i> </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-search-dropdown">
                                <div className="input-group search-form">
                                    <span className="input-group-text"> <i className="feather-search fs-6 text-muted"></i> </span>
                                    <input type="text" className="form-control search-input-field" placeholder="Search...." />
                                    <span className="input-group-text"> <button type="button" className="btn-close"></button> </span>
                                </div>
                            </div>
                        </div>
                        <div className="nxl-h-item d-none d-sm-flex">
                            <div className="full-screen-switcher">
                                <a href="#" className="nxl-head-link me-0" onClick={() => $('body').fullScreenHelper('toggle')}>
                                    <i className="feather-maximize maximize"></i>
                                    <i className="feather-minimize minimize"></i>
                                </a>
                            </div>
                        </div>
                        <div className="nxl-h-item dark-light-theme">
                            <a href="#" className={`dark-button ${theme === 'darkTheme' ? 'active' : ''} nxl-head-link me-0`} onClick={handleDarkMode} style={{ display: theme === 'darkTheme' ? 'none' : 'inline-block' }}>
                                <i className="feather-moon"></i>
                            </a>
                            <a href="#" className={`light-button ${theme === 'LightTheme' ? 'active' : ''} nxl-head-link me-0`} onClick={handleLightMode} style={{ display: theme === 'LightTheme' ? 'none' : 'inline-block' }}>
                                <i className="feather-sun"></i>
                            </a>
                        </div>

                        <div className="dropdown nxl-h-item">
                            <a className="nxl-head-link me-3" data-bs-toggle="dropdown" href="#" role="button" data-bs-auto-close="outside"> <i className="feather-bell"></i> <span className="badge bg-danger nxl-h-badge">1</span> </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                                <div className="d-flex justify-content-between align-items-center notifications-head">
                                    <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                                    <a href="#" className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Make as Read"> <i className="feather-check"></i> <span>Make as Read</span> </a>
                                </div>
                                <div className="notifications-item">
                                    <img src="assets/images/avatar/2.png" alt="" className="rounded me-3 border" />
                                    <div className="notifications-desc">
                                        <a href="#" className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Malanie Hanvey</span> We should talk about that at lunch!</a>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="notifications-date text-muted border-bottom border-bottom-dashed">2 minutes ago</div>
                                            <div className="d-flex align-items-center float-end gap-2">
                                                <a href="#" className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                                <a href="#" className="text-danger" data-bs-toggle="tooltip" title="Remove"> <i className="feather-x fs-12"></i> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center notifications-footer"><a href="#" className="fs-13 fw-semibold text-dark">Alls Notifications</a></div>
                            </div>
                        </div>
                        <div className="dropdown nxl-h-item">
                            <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside"> <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" /> </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                                <div className="dropdown-header">
                                    <div className="d-flex align-items-center">
                                        <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar" />
                                        <div>
                                            <h6 className="text-dark mb-0">{user.name}</h6>
                                            <span className="fs-12 fw-medium text-muted">{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="dropdown-item"> <i className="feather-user"></i> <span>Profile Details</span> </a>
                                <a href="#" className="dropdown-item"> <i className="feather-activity"></i> <span>Activity Feed</span> </a>
                                <a href="#" className="dropdown-item"> <i className="feather-dollar-sign"></i> <span>Billing Details</span> </a>
                                <a href="#" className="dropdown-item"> <i className="feather-bell"></i> <span>Notifications</span> </a>
                                <a href="#" className="dropdown-item"> <i className="feather-settings"></i> <span>Account Settings</span> </a>
                                <div className="dropdown-divider"></div>
                                <Link to="/auth/logout" className="dropdown-item"><i className="feather-log-out"></i> <span>Çıkış Yap</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
