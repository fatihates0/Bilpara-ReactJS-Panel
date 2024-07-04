import axios from 'axios';
import moment from 'moment';
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
        selector: row => row.invitation_code,
    },
    {
        name: 'Name Surname',
        selector: row => row.name,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Provider',
        selector: row => row.provider,
    },
    {
        name: 'BilPara Puan',
        selector: row => row.paraPuan,
        sortable: true,
    },
    {
        name: 'Kayıt Tarihi',
        selector: row => moment(row.created_at).format('DD/MM/YYYY HH:mm'),
        sortable: true,
    },
    {
        name: 'Edit',
        selector: row => (
            <div className="hstack gap-2 justify-content-end">
                <Link to={"/users/" + row.invitation_code} className="avatar-text avatar-md"><i className="feather feather-eye"></i></Link>
            </div>
        ),
    },
];

export default function Users() {

    const [theme, setTheme] = useState(null);
    const [tabloData, setTabloData] = useState(null);
    const [aktifUye, setAktifUye] = useState(0);
    const [pasifUye, setPasifUye] = useState(0);
    const [sonHaftaKayitlari, setSetsonHaftaKayitlari] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        document.title = 'Kullanıcılar | ' + import.meta.env.VITE_PROJECT_NAME;
        setTheme(localStorage.getItem('darkTheme'))
    }, []);


    useEffect(() => {
        const fun = async function () {

            try {
                const token = localStorage.getItem('token');

                const res = await axios.post(import.meta.env.VITE_API_URL + "/admin/users", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(res.data.users);

                setTabloData(res.data.users);

                const oneWeekAgo = await moment().subtract(1, 'weeks');

                const sonHafta = await res.data.users.filter(item => {
                    const createdAt = moment(item.created_at);
                    return createdAt.isAfter(oneWeekAgo);
                });

                setSetsonHaftaKayitlari(sonHafta.length);

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
                        <PageHeading title="Kullanıcılar" />
                    </div>
                    <div id="collapseOne" className="accordion-collapse collapse page-header-collapse show">
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
                                                        <span className="d-block">Son 1 Haftada Kayıt Olanlar</span>
                                                        <span className="fs-24 fw-bolder d-block">{sonHaftaKayitlari}</span>
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

