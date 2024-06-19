import axios from 'axios';
import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setLoading } from '~/redux/slices/generalSlice';

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

createTheme(
    'darkTheme',
    {
        text: {
            primary: '#b1b4c0',
            secondary: '#2aa198',
        },
        background: {
            default: '#0f172a',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        button: {
            default: '#2aa198',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(255, 255, 255, .34)',
        },
        sortFocus: {
            default: '#2aa198',
        },
        highlightOnHover: {
            background: 'rgba(18, 26, 45, 1)'
        }
    },
    'dark',
);

createTheme(
    'lightTheme',
    {
        text: {
            primary: '#ff0000',
            secondary: '#ff0000',
        },
        background: {
            default: '#ff0000',
        },
        context: {
            background: '#ff0000',
            text: '#FFFFFF',
        },
        divider: {
            default: '#ff0000',
        },
        button: {
            default: '#ff0000',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(255, 255, 255, .34)',
        },
        sortFocus: {
            default: '#ff0000',
        }
    },
    'light',
);


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



/*const columns = [
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
];*/

const columns = [
    {
        name: 'ID',
        selector: row => row.invitation_code,
        grow: 0.3,
    },
    {
        name: 'Name Surname',
        selector: row => row.name,
        right: false,
        grow: 0.5
    },
    {
        name: 'Email',
        selector: row => row.email,
        grow: 0.8
    },
    /*{
        name: 'BilPara Puan',
        selector: row => row.paraPuan,
        grow:0.1,
        conditionalCellStyles: [
            {
                when: row => row.paraPuan < 5,
                style: {
                    textAlign: 'center',
                    backgroundColor: 'rgba(63, 195, 128, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.paraPuan >= 5 && row.paraPuan < 45,
                style: {
                    backgroundColor: 'rgba(248, 148, 6, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
            },
            {
                when: row => row.paraPuan >= 45,
                style: {
                    backgroundColor: 'rgba(242, 38, 19, 0.9)',
                    color: 'white',
                    '&:hover': {
                        cursor: 'not-allowed',
                    },
                },
            },
        ],
    },*/
    {
        name: 'Provider',
        grow: 0.3,
        selector: row => row.provider,
    },
    {
        name: 'BilPara Puan',
        selector: row => row.paraPuan,
        grow: 0.2,
        sortable: true,
    },
    {
        name: 'Kayıt Tarihi',
        selector: row => moment(row.created_at).format('DD/MM/YYYY HH:mm'),
        grow: 0.25,
        sortable: true,
    },
    {
        name: 'Edit',
        right: true,
        selector: row => (
            <div className="hstack gap-2 justify-content-end">
                <Link to={"/questions/" + row.invitation_code} className="avatar-text avatar-md"><i className="feather feather-eye"></i></Link>
                <a href="leads-view.html" className="avatar-text avatar-md">
                    <i className="feather feather-edit"></i>
                </a>
            </div>
        ),
    },
];

export default function Users() {

    const [theme, setTheme] = useState(null);
    const [tabloData, setTabloData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        document.title = 'Kullanıcılar | ' + import.meta.env.VITE_PROJECT_NAME;
        setTheme(localStorage.getItem('darkTheme'))
    }, []);

    useEffect(() => {
        const fun = async function () {
            /*await axios.post(import.meta.env.VITE_API_URL + "/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => setTabloData(res.data.sorular));
            dispatch(setLoading(false));*/


            try {
                const token = localStorage.getItem('token');

                const res = await axios.post(import.meta.env.VITE_API_URL + "/admin/users", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTabloData(res.data.users)

                dispatch(setLoading(false))

            } catch (error) {
                console.log(error);
                dispatch(setLoading(false))
            }




        }
        fun();
    }, [])

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);


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

    if (theme == null) {
        return (
            <div>Selam</div>
        )
    }
    if (tabloData == null) {
        return (
            <div>Selam</div>
        )
    }


    const filteredItems = tabloData.filter(item =>
        (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.invitation_code && item.invitation_code.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
    );

    const customStyles = {
        rows: {
            style: {
                minHeight: '50px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        headRow: {
            style: {
                color: 'red'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    const handleRowClicked = row => {

        console.log(`${row.invitation_code} was clicked!`);
    };

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
                                                theme={theme}
                                                columns={columns}
                                                data={filteredItems}
                                                pagination
                                                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                                                subHeader
                                                subHeaderComponent={subHeaderComponentMemo}
                                                selectableRows
                                                persistTableHead
                                                customStyles={customStyles}
                                                highlightOnHover
                                                onRowClicked={handleRowClicked}
                                                noDataComponent="Veri yok!"
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

