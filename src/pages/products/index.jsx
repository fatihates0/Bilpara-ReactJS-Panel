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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

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
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState({status:1});
    const [productImage, setProductImage] = useState("");

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

    const addProductHandle = () => {
        console.log('====================================');
        console.log(productDetail);
        console.log(productImage);
        console.log('====================================');
    }

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setProductImage(event.target.files[0]);
        } else {
            setProductImage(null);
        }
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
                                    <a href="javascript:void(0)" className="page-header-right-close-toggle">
                                        <i className="feather-arrow-left me-2"></i>
                                        <span>Back</span>
                                    </a>
                                </div>
                                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                                    <a href="leads-create.html" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productEdit">
                                        <i className="feather-plus me-2"></i>
                                        <span>Yeni Ürün Ekle</span>
                                    </a>
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
            <div className="modal fade" id="productEdit" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">Ürün Ekle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="notes-box">
                                <div className="notes-content">
                                    <form onSubmit={addProductHandle} autoComplete='off'>
                                        <div className="row">

                                        <div className="col-md-12 mb-3">
                                                <div className="note-description">
                                                    <label className="form-label">Ürün Başlığı</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder='Ürün Başlığı Girin'
                                                            value={productDetail.title || ''}
                                                            onChange={(event) => {
                                                                setProductDetail({
                                                                    ...productDetail,
                                                                    title: event.target.value
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="note-description">
                                                    <label className="form-label">Ürün Başlığı</label>
                                                    <div className="input-group">
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            placeholder='Ürün Açıklamasını Girin'
                                                            value={productDetail.description || ''}
                                                            onChange={(event) => {
                                                                setProductDetail({
                                                                    ...productDetail,
                                                                    description: event.target.value
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="note-description">
                                                    <label className="form-label">Ürün Bilpara Fiyatı</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder='Ürün Bilpara Fiyatını Girin'
                                                            value={productDetail.price || ""}
                                                            onChange={(event) => {
                                                                setProductDetail({
                                                                    ...productDetail,
                                                                    price: event.target.value
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="note-description">

                                                    {
                                                        productDetail.category && (
                                                            <Box sx={{ minWidth: 120 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel style={{ color: theme == 'darkTheme' ? '#fff' : '#283c50' }} id="demo-simple-select-label">Kategori Seçin</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={productDetail.category || ""}
                                                                        label="Kategori Seçin"
                                                                        style={{ color: theme == 'darkTheme' ? 'white' : 'black', border: theme == 'darkTheme' && '1px solid #1b2436' }}
                                                                        onChange={(event) => {
                                                                            setProductDetail({
                                                                                ...productDetail,
                                                                                category: event.target.value
                                                                            });
                                                                        }}

                                                                    >
                                                                        {productCategorys.map((option) => (
                                                                            <MenuItem key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        )
                                                    }


                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="note-description">
                                                    <label className="form-label">Görseli Değiştirin</label>
                                                    <div className="form-check" htmlFor="changeImage">
                                                        <Button
                                                            id="changeImage"
                                                            component="label"
                                                            role={undefined}
                                                            variant="contained"
                                                            tabIndex={-1}
                                                        >
                                                            {
                                                                productImage ? (
                                                                    productImage.name.length > 20 ? productImage.name.substring(0, 30) + '...' : productImage.name
                                                                ) : (
                                                                    'Dosya Seçin'
                                                                )
                                                            }
                                                            <input
                                                                type="file"
                                                                hidden
                                                                onChange={handleFileChange}
                                                            />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <label className="form-label">Markette listelensin mi?</label>
                                                    <div className="form-check">
                                                        <input
                                                            onChange={(event) => {
                                                                setProductDetail({
                                                                    ...productDetail,
                                                                    status: Number(event.target.value)
                                                                });
                                                            }}
                                                            className="form-check-input"
                                                            name='status'
                                                            type="radio"
                                                            value="1"
                                                            id="aktif"
                                                            checked={productDetail.status == 1 && true}
                                                        />
                                                        <label className="form-check-label" htmlFor="aktif">
                                                            Aktif
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            onChange={(event) => {
                                                                setProductDetail({
                                                                    ...productDetail,
                                                                    status: Number(event.target.value)
                                                                });
                                                            }}
                                                            className="form-check-input"
                                                            name='status'
                                                            type="radio"
                                                            value="0"
                                                            id="pasif"
                                                            checked={productDetail.status == 0 && true}
                                                        />
                                                        <label className="form-check-label" htmlFor="pasif">
                                                            Pasif
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <button className="btn btn-primary" data-bs-dismiss="modal">İptal</button>
                            <button onClick={addProductHandle} type="submit" id="btn-n-add" className="btn btn-success">Güncelle</button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

