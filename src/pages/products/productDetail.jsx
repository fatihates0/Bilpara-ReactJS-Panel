import "../../assets/css/productDetail.css";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import PageHeading from "~/layout/web/component/pageHeading";
import { setLoading } from "~/redux/slices/generalSlice";
//import Select from 'react-select'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useRef } from "react";


export default function ProductDetail() {
    const { productId } = useParams();
    const [theme, setTheme] = useState("");
    const [productDetail, setProductDetail] = useState({});
    const [productCategorys, setProductCategorys] = useState([]);
    const [productImage, setProductImage] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const imgRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = ' Ürün Detayı | ' + productId + ' | ' + import.meta.env.VITE_PROJECT_NAME;
        fetchProductDetail();
    }, []);

    const handleFileChange = (event) => {
        console.log(event.target.files);
        if (event.target.files.length > 0) {
            setProductImage(event.target.files[0]);
        } else {
            setProductImage(null);
        }
    };


    const fetchProductDetail = async () => {
        dispatch(setLoading(true))

        setTheme(localStorage.getItem('darkTheme'))

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(import.meta.env.VITE_API_URL + "/admin/products/detail", {
                id: productId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data.product);

            setProductDetail(res.data.product)

            //Kategorileri select'e ata

            const options = res.data.category.map(category => {
                console.log(category);
                return {
                    value: category,
                    label: category,
                };
            });

            setProductCategorys(options)

            dispatch(setLoading(false))

        } catch (error) {
            console.log(error);
            dispatch(setLoading(false))
        }
    }

    const updateProduct = async () => {
        dispatch(setLoading(true))

        try {
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append('id', productId);
            formData.append('image', productImage);
            formData.append('product', JSON.stringify(productDetail));

            const res = await axios.post(import.meta.env.VITE_API_URL + "/admin/products/edit", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log(res);

            setProductDetail({
                ...productDetail,
                image: res.data.image
            });

            successComp(`${productDetail.id} ID'li ürünün bilgileri güncellendi.`);

            dispatch(setLoading(false))

        } catch (error) {
            if (error.response.data.error) {
                alertComp(error.response.data.error)
            } else {
                alertComp(error.message)
            }
            dispatch(setLoading(false))
        }
    }

    const handleImageClick = () => {
        if (!isFullscreen) {
            if (imgRef.current.requestFullscreen) {
                imgRef.current.requestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    if (!theme) {
        return (
            <div>Selam</div>
        )
    }

    const successComp = (message) => toast.success(message, { position: "bottom-right", });
    const alertComp = (message) => toast.warn(message, { position: "bottom-right", });

    return (
        <>
            <ToastContainer theme='light' toastStyle={{ fontSize: 14, fontWeight: '700' }} />
            <main className="nxl-container">
                <div className="nxl-content">
                    <div className="page-header">
                        <PageHeading title="Ürün Detayı" />
                    </div>
                    <div className="main-content">
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="proposalTab">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card stretch stretch-full">
                                            <div className="card-header">
                                                <h5 className="card-title">#{productDetail.id} | Ürün Detayı</h5>
                                                <a href="#" className="avatar-text avatar-md" data-bs-toggle="modal" data-bs-target="#productEdit">
                                                    <i className="feather-edit"></i>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-sm-flex justify-content-between">
                                                    <div className="proposal-from">
                                                        <div className="fs-13 text-muted lh-lg">
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Başlık: </span>
                                                                <span>{productDetail.title}</span>
                                                                <div>
                                                                    <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Kategori: </span>
                                                                    <span>{productDetail.category}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Fiyat: </span>
                                                                {
                                                                    productDetail.price && (
                                                                        <span>{productDetail.price} BilPara</span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Eklenme Tarihi: </span>
                                                                {
                                                                    productDetail.created_at && (
                                                                        <span>{moment(productDetail.created_at).format('DD/MM/YYYY HH:mm')}</span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Son Güncellenme Tarihi: </span>
                                                                {
                                                                    productDetail.updated_at && (
                                                                        <span>{moment(productDetail.updated_at).format('DD/MM/YYYY HH:mm')}</span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Statü: </span>
                                                                {
                                                                    productDetail.status != null && (
                                                                        <span style={{ color: productDetail.status == 1 ? '#069906' : '#c30000' }}>
                                                                            {
                                                                                productDetail.status === 1 ? "Mağazada Listeleniyor." : "Mağazada Listelenmiyor."
                                                                            }
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className="d-md-none" />
                                                    <div className="proposal-to">
                                                        {
                                                            productDetail.image && (
                                                                <>
                                                                    <h6 className="fw-bold mb-4">Görsel:</h6>
                                                                    <div className="fs-13 lh-lg">

                                                                        <img
                                                                            id="productImage"
                                                                            ref={imgRef}
                                                                            src={productDetail.image}
                                                                            alt="Fullscreen toggle"
                                                                            onClick={handleImageClick}
                                                                            style={{ width: 150, cursor: 'pointer' }}
                                                                        />

                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card stretch stretch-full">

                                            <div className="card-header mb-4">
                                                <h5 className="card-title">Ürün Açıklaması</h5>
                                                <a onClick={updateProduct} className="avatar-text avatar-md">
                                                    <i className="feather-save"></i>
                                                </a>
                                            </div>
                                            <div className="card-body py-0">
                                                <textarea
                                                    className="form-control"
                                                    rows="10"
                                                    value={productDetail.description}
                                                    onChange={(event) => {
                                                        setProductDetail({
                                                            ...productDetail,
                                                            description: event.target.value
                                                        });
                                                    }}
                                                ></textarea>
                                            </div>
                                            <div className="card-footer border-top-0">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <div className="modal fade" id="productEdit" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">Ürün Düzenle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="notes-box">
                                <div className="notes-content">
                                    <form onSubmit={updateProduct} autoComplete='off'>
                                        <div className="row">

                                            <div className="col-md-12 mb-3">
                                                <div className="note-description">
                                                    <label className="form-label">Ürün Başlığı</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder='Ürün Başlığı Girin'
                                                            value={productDetail.title}
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
                                                    <label className="form-label">Ürün Bilpara Fiyatı</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder='Ürün Bilpara Fiyatını Girin'
                                                            value={productDetail.price}
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
                                                                    <InputLabel id="demo-simple-select-label">Kategori Seçin</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={productDetail.category}
                                                                        label="Kategori Seçin"
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
                            <button onClick={updateProduct} type="submit" id="btn-n-add" className="btn btn-success">Güncelle</button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
