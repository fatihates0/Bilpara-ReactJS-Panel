import React from 'react'
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

const TextField = styled.input`
    height: 36px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
        cursor: pointer;
    }
`;

const ClearButton = styled.button`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <button className='btn btn-primary' onClick={onClear}>X</button>
    </>
);



const columns = [
    {
        name: 'ID',
        selector: row => row.id,
    }, {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
    {
        name: 'Edit',
        right: true,
        selector: row => (
            <div className="hstack gap-2 justify-content-end">
                <a href="leads-view.html" className="avatar-text avatar-md">
                    <i className="feather feather-eye"></i>
                </a>
                <a href="leads-view.html" className="avatar-text avatar-md">
                    <i className="feather feather-edit"></i>
                </a>
            </div>
        ),
    },
];

const data = [
    { id: 1, title: 'Beetlejuice', year: '1988' },
    { id: 2, title: 'Ghostbusters', year: '1984' },
    { id: 3, title: 'Back to the Future', year: '1985' },
    { id: 4, title: 'The Goonies', year: '1985' },
    { id: 5, title: 'E.T. the Extra-Terrestrial', year: '1982' },
    { id: 6, title: 'Indiana Jones and the Last Crusade', year: '1989' },
    { id: 7, title: 'Die Hard', year: '1988' },
    { id: 8, title: 'Aliens', year: '1986' },
    { id: 9, title: 'Blade Runner', year: '1982' },
    { id: 10, title: 'The Terminator', year: '1984' },
    { id: 11, title: 'Predator', year: '1987' },
    { id: 12, title: 'RoboCop', year: '1987' },
    { id: 13, title: 'Top Gun', year: '1986' },
    { id: 14, title: 'The Breakfast Club', year: '1985' },
    { id: 15, title: 'Ferris Bueller\'s Day Off', year: '1986' },
    { id: 16, title: 'The Princess Bride', year: '1987' },
    { id: 17, title: 'Stand by Me', year: '1986' },
    { id: 18, title: 'Labyrinth', year: '1986' },
    { id: 19, title: 'The NeverEnding Story', year: '1984' },
    { id: 20, title: 'The Karate Kid', year: '1984' },
    { id: 21, title: 'Gremlins', year: '1984' },
    { id: 22, title: 'WarGames', year: '1983' },
    { id: 23, title: 'The Lost Boys', year: '1987' },
    { id: 24, title: 'Rain Man', year: '1988' },
    { id: 25, title: 'Big', year: '1988' }
];

export default function Users() {

    useEffect(() => {
        document.title = 'Kullanıcılar | '+import.meta.env.VITE_PROJECT_NAME;
    }, []);

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);


    return (
        <>
            <main className="nxl-container">
                <div className="nxl-content">
                    <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title">
                                <h5 className="m-b-10">Leads</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li className="breadcrumb-item">Leads</li>
                            </ul>
                        </div>
                        <div className="page-header-right ms-auto">
                            <div className="page-header-right-items">
                                <div className="d-flex d-md-none">
                                    <a href="#" className="page-header-right-close-toggle">
                                        <i className="feather-arrow-left me-2"></i>
                                        <span>Back</span>
                                    </a>
                                </div>
                                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                                    <a href="#;" className="btn btn-icon btn-light-brand" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        <i className="feather-bar-chart"></i>
                                    </a>
                                    <div className="dropdown">
                                        <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                                            <i className="feather-filter"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-primary rounded-circle d-inline-block me-3"></span>
                                                <span>New</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-warning rounded-circle d-inline-block me-3"></span>
                                                <span>Working</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-success rounded-circle d-inline-block me-3"></span>
                                                <span>Qualified</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-danger rounded-circle d-inline-block me-3"></span>
                                                <span>Declined</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-teal rounded-circle d-inline-block me-3"></span>
                                                <span>Customer</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-indigo rounded-circle d-inline-block me-3"></span>
                                                <span>Contacted</span>
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-warning rounded-circle d-inline-block me-3"></span>
                                                <span>Pending</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-success rounded-circle d-inline-block me-3"></span>
                                                <span>Approved</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <span className="wd-7 ht-7 bg-teal rounded-circle d-inline-block me-3"></span>
                                                <span>In Progress</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                                            <i className="feather-paperclip"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a href="#;" className="dropdown-item">
                                                <i className="bi bi-filetype-pdf me-3"></i>
                                                <span>PDF</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <i className="bi bi-filetype-csv me-3"></i>
                                                <span>CSV</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <i className="bi bi-filetype-xml me-3"></i>
                                                <span>XML</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <i className="bi bi-filetype-txt me-3"></i>
                                                <span>Text</span>
                                            </a>
                                            <a href="#;" className="dropdown-item">
                                                <i className="bi bi-filetype-exe me-3"></i>
                                                <span>Excel</span>
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a href="#;" className="dropdown-item">
                                                <i className="bi bi-printer me-3"></i>
                                                <span>Print</span>
                                            </a>
                                        </div>
                                    </div>
                                    <a href="leads-create.html" className="btn btn-primary">
                                        <i className="feather-plus me-2"></i>
                                        <span>Create Lead</span>
                                    </a>
                                </div>
                            </div>
                            <div className="d-md-none d-flex align-items-center">
                                <a href="#" className="page-header-right-open-toggle">
                                    <i className="feather-align-right fs-20"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="collapseOne" className="accordion-collapse collapse page-header-collapse">
                        <div className="accordion-body pb-2">
                            <div className="row">
                                <div className="col-xxl-3 col-md-6">
                                    <div className="card stretch stretch-full">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="avatar-text avatar-xl rounded">
                                                        <i className="feather-users"></i>
                                                    </div>
                                                    <a href="#;" className="fw-bold d-block">
                                                        <span className="d-block">Total Leads</span>
                                                        <span className="fs-24 fw-bolder d-block">26,595</span>
                                                    </a>
                                                </div>
                                                <div className="badge bg-soft-success text-success">
                                                    <i className="feather-arrow-up fs-10 me-1"></i>
                                                    <span>36.85%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-3 col-md-6">
                                    <div className="card stretch stretch-full">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="avatar-text avatar-xl rounded">
                                                        <i className="feather-user-check"></i>
                                                    </div>
                                                    <a href="#;" className="fw-bold d-block">
                                                        <span className="d-block">Active Leads</span>
                                                        <span className="fs-24 fw-bolder d-block">2,245</span>
                                                    </a>
                                                </div>
                                                <div className="badge bg-soft-danger text-danger">
                                                    <i className="feather-arrow-down fs-10 me-1"></i>
                                                    <span>24.56%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-3 col-md-6">
                                    <div className="card stretch stretch-full">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="avatar-text avatar-xl rounded">
                                                        <i className="feather-user-plus"></i>
                                                    </div>
                                                    <a href="#;" className="fw-bold d-block">
                                                        <span className="d-block">New Leads</span>
                                                        <span className="fs-24 fw-bolder d-block">1,254</span>
                                                    </a>
                                                </div>
                                                <div className="badge bg-soft-success text-success">
                                                    <i className="feather-arrow-up fs-10 me-1"></i>
                                                    <span>33.29%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-3 col-md-6">
                                    <div className="card stretch stretch-full">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="avatar-text avatar-xl rounded">
                                                        <i className="feather-user-minus"></i>
                                                    </div>
                                                    <a href="#;" className="fw-bold d-block">
                                                        <span className="d-block">Inactive Leads</span>
                                                        <span className="fs-24 fw-bolder d-block">4,586</span>
                                                    </a>
                                                </div>
                                                <div className="badge bg-soft-danger text-danger">
                                                    <i className="feather-arrow-down fs-10 me-1"></i>
                                                    <span>42.47%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card stretch stretch-full">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <DataTable
                                                title="Kullanıcı Listesi"
                                                theme='light'
                                                columns={columns}
                                                data={filteredItems}
                                                pagination
                                                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                                                subHeader
                                                subHeaderComponent={subHeaderComponentMemo}
                                                selectableRows
                                                persistTableHead
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

