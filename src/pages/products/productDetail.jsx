import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import PageHeading from "~/layout/web/component/pageHeading";
import { setLoading } from "~/redux/slices/generalSlice";
import Select from 'react-select'

export default function ProductDetail() {
    const { productId } = useParams();
    const [theme, setTheme] = useState("");
    const [productDetail, setProductDetail] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = ' Ürün Detayı | ' + productId + ' | ' + import.meta.env.VITE_PROJECT_NAME;
        fetchProductDetail();
    }, []);

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
            dispatch(setLoading(false))

        } catch (error) {
            console.log(error);
            dispatch(setLoading(false))
        }
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate', isFixed: true },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    if (!theme) {
        return (
            <div>Selam</div>
        )
    }

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
                                                <h5 className="card-title">Ürün Detayı</h5>
                                                <a href="#" className="avatar-text avatar-md" data-bs-toggle="modal" data-bs-target="#productEdit">
                                                    <i className="feather-edit"></i>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-sm-flex justify-content-between">
                                                    <div className="proposal-from">
                                                        <div className="fs-13 text-muted lh-lg">
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">ID: </span>
                                                                <span>{productDetail.id}</span>
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Başlık: </span>
                                                                <span>{productDetail.title}</span>
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Kategori: </span>
                                                                <span>{productDetail.category}</span>
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Eklenme Tarihi: </span>
                                                                <span>{moment(productDetail.created_at).format('DD/MM/YYYY HH:mm')}</span>
                                                            </div>
                                                            <div>
                                                                <span className="fw-semibold text-dark border-bottom border-bottom-dashed">Son Güncellenme Tarihi: </span>
                                                                <span>{moment(productDetail.updated_at).format('DD/MM/YYYY HH:mm')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className="d-md-none" />
                                                    <div className="proposal-to">
                                                        <h6 className="fw-bold mb-4">Görsel:</h6>
                                                        <div className="fs-13 lh-lg">
                                                            <img src={productDetail.image} style={{ width: 150 }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card stretch stretch-full">

                                            <div className="card-header mb-4">
                                                <h5 className="card-title">Ürün Detayı</h5>
                                                <a href="#" className="avatar-text avatar-md" data-bs-toggle="modal" data-bs-target="#productEdit">
                                                    <i className="feather-edit"></i>
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
                                    <form autoComplete='off'>
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

                                            <div className="mb-4">
                                                <label className="form-label">Related <span className="text-danger">*</span></label>
                                                <Select

                                                    theme={theme}
                                                    options={options}
                                                    defaultValue={options[2]}
                                                />
                                            </div>


                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <label className="form-label">Listelensin mi? (Statü)</label>
                                                    <div className="form-check">
                                                        <input className="form-check-input" name='status' type="radio" value="1" id="aktif" />
                                                        <label className="form-check-label" htmlFor="aktif">
                                                            Aktif
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" name='status' type="radio" value="0" id="pasif" />
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
                            <div>
                                <button className="btn btn-danger" data-bs-dismiss="modal">Bakiye Sıfırla</button>
                            </div>
                            <div className="actions d-flex gap-1">
                                <button className="btn btn-primary" data-bs-dismiss="modal">İptal</button>
                                <button type="submit" id="btn-n-add" className="btn btn-success">Güncelle</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
