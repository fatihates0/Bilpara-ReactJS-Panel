import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageHeading from '~/layout/web/component/pageHeading';
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
            placeholder="Filtrele"
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
        grow: 0.1
    },
    {
        name: 'Ürün Başlığı',
        selector: row => row.title,
    },
    {
        name: 'Kategori',
        selector: row => row.category,
    },
    {
        name: 'Fiyatı',
        selector: row => row.price,
    },
    {
        name: 'Stok',
        selector: row => row.price,
    },
    {
        name: 'İşlem',
        selector: row => (
            <div className="hstack gap-2 justify-content-end">
                <Link to={"/products/" + row.id} className="avatar-text avatar-md"><i className="feather feather-eye"></i></Link>
            </div>
        ),
    },
];

export default function Products() {

    const [theme, setTheme] = useState(null);
    const [tabloData, setTabloData] = useState(null);
    const [aktifUye, setAktifUye] = useState(0);
    const [pasifUye, setPasifUye] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        document.title = 'Ürünler | ' + import.meta.env.VITE_PROJECT_NAME;
        setTheme(localStorage.getItem('darkTheme'))
    }, []);


    useEffect(() => {
        const fun = async function () {

            try {
                const token = localStorage.getItem('token');

                const res = await axios.post(import.meta.env.VITE_API_URL + "/admin/products", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(res.data.products);

                setTabloData(res.data.products);

                const aktifUye = res.data.users.filter(item => item.status === 1);

                setAktifUye(aktifUye.length);

                setPasifUye(res.data.users.length - aktifUye.length);

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
        (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(filterText.toLowerCase()))
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

        console.log(`${row.id} was clicked!`);
    };

    return (
        <>
            <main className="nxl-container">
                <div className="nxl-content">
                    <div className="page-header">
                        <PageHeading title="Ürünler" />
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
                                                    <a href="#" className="fw-bold d-block">
                                                        <span className="d-block">Toplam Üye</span>
                                                        <span className="fs-24 fw-bolder d-block">{tabloData.length}</span>
                                                    </a>
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
                                                        <span className="d-block">Aktif Üye</span>
                                                        <span className="fs-24 fw-bolder d-block">{aktifUye}</span>
                                                    </a>
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
                                                        <span className="d-block">Pasif Üye</span>
                                                        <span className="fs-24 fw-bolder d-block">{pasifUye}</span>
                                                    </a>
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
                                                        <span className="d-block">---</span>
                                                        <span className="fs-24 fw-bolder d-block">---</span>
                                                    </a>
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
                                                title="Ürün Listesi"
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

