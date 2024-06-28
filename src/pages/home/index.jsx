import React from 'react'
import { useEffect } from 'react';
import PageHeading from '~/layout/web/component/pageHeading';

export default function Home() {

    useEffect(() => {
        document.title = 'Anasayfa | ' + import.meta.env.VITE_PROJECT_NAME;
    }, []);

    return (
        <>
            <main className="nxl-container">
                <div className="nxl-content">
                    <div className="page-header">
                        <PageHeading />
                        <div className="page-header-right ms-auto">
                            <div className="page-header-right-items">
                                <div className="d-flex d-md-none">
                                    <a href="#" className="page-header-right-close-toggle"> <i className="feather-arrow-left me-2"></i> <span>Back</span> </a>
                                </div>
                                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                                    <div className="dropdown filter-dropdown">
                                        <a className="btn btn-md btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside"> <i className="feather-filter me-2"></i> <span>Filter</span> </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="#" className="dropdown-item"> <i className="feather-plus me-3"></i> <span>Create New</span> </a>
                                            <div className="dropdown-divider"></div>
                                            <a href="#" className="dropdown-item"> <i className="feather-filter me-3"></i> <span>Manage Filter</span> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-md-none d-flex align-items-center">
                                <a href="#" className="page-header-right-open-toggle"> <i className="feather-align-right fs-20"></i> </a>
                            </div>
                        </div>
                    </div>
                    <div className="main-content"><div className="row">{import.meta.env.VITE_API_URL}</div></div>
                </div>
            </main>
        </>
    )
}