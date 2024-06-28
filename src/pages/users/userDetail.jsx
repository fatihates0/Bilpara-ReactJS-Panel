import axios from 'axios';
import { error } from 'jquery';
import moment from 'moment';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function UserDetail() {

    const [userDetail, setUserDetail] = useState(null);
    const [parapuanIslem, setParapuanIslem] = useState(null);
    const [bilparaMiktar, setBilparaMiktar] = useState("");
    const [userStatusChangeDesc, setUserStatusChangeDesc] = useState("")
    const userStatusChangeModalRef = useRef(null);
    const { userId } = useParams();

    const [bakiyeSifirlaDesc, setBakiyeSifirlaDesc] = useState('Selam')

    /*const showSwal = () => {
        withReactContent(Swal).fire({
            title: 'Gerekçe',
            input: 'text',
            inputPlaceholder:'Bakiye sıfırlama gereçkesi belirtin.',
            showCloseButton:true,
            bakiyeSifirlaDesc,
            confirmButtonText:'Sıfırla',
            footer:'Bu işlem geri alınamaz!',
            willClose: () => {
                console.log("will close");
                let bilparaIslemleri = document.getElementById('bilparaIslemleri');
                let bilparaIslemleriModal = bootstrap.Modal.getInstance(bilparaIslemleri)
                bilparaIslemleriModal.show();
            },

            preConfirm: () => {
                setBakiyeSifirlaDesc(Swal.getInput()?.value || '')
            },
        })
    }*/

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: '<span style="font-size: 15px;color:#e94141">Kullanıcının bakiyesini sıfırlamak istediğinize emin misiniz?</span>',
            showCancelButton: true,
            confirmButtonText: "Sıfırla",
            confirmButtonColor: '#17c666',
            cancelButtonText: 'İptal',
            bakiyeSifirlaDesc,
            cancelButtonColor: '#e94141',
            input: 'text',
            inputPlaceholder: 'Gerekçe belirtin',
            preConfirm: (inputValue) => {
                if (!inputValue || inputValue.length < 5) {
                    Swal.showValidationMessage('Lütfen en az 5 karakter giriniz.');
                    return false;
                }
                return inputValue;
            }
        }).then((result) => {
            if (Swal.getInput()?.value != "") {
                if (result.isConfirmed) {
                    bilparaSifirla(Swal.getInput()?.value)
                } else if (result.isDismissed) {
                    let bilparaIslemleri = document.getElementById('bilparaIslemleri');
                    let bilparaIslemleriModal = bootstrap.Modal.getInstance(bilparaIslemleri)
                    bilparaIslemleriModal.show();
                }
            }
        });
    }

    useEffect(() => {
        document.title = ' User Detail | ' + userId + ' | ' + import.meta.env.VITE_PROJECT_NAME;
        fetchUserDetail();
    }, []);

    const fetchUserDetail = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(import.meta.env.VITE_API_URL + "/admin/users/detail", {
                invitation_code: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUserDetail(res.data.userDetail)

        } catch (error) {
            console.log(error);
        }
    }

    if (userDetail == null) {
        return (
            <div>Yükleniyor...</div>
        )
    }

    const onlyNumber = (event) => {
        const newValue = event.target.value;
        // Yalnızca rakamları kabul et
        if (/^\d*$/.test(newValue)) {
            setBilparaMiktar(newValue)
        }else{
            alertComp("Sadece sayı girebilirsiniz!");
        }
    };

    const increase = () => {
        setBilparaMiktar(Number(bilparaMiktar) + 1)
    }

    const decrease = () => {
        if (bilparaMiktar > 0) {
            setBilparaMiktar(Number(bilparaMiktar) - 1)
        } else {
            alertComp("0'dan daha küçük bir değer belirlenemez!");
        }
    }

    const updateParaPuan = async (event) => {
        event.preventDefault();
        try {
            if (parapuanIslem == null) {
                alertComp("Lütfen işlem seçin!");
            } else {
                if (bilparaMiktar != 0) {
                    const token = localStorage.getItem('token');

                    const res = await axios.post(import.meta.env.VITE_API_URL + '/admin/users/updateBilpara', {
                        invitation_code: userDetail.invitation_code,
                        process: parapuanIslem,
                        amount: bilparaMiktar
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setUserDetail(prevUserDetail => ({
                        ...prevUserDetail,
                        paraPuan: res.data.paraPuan
                    }));

                    setBilparaMiktar(0);
                    setParapuanIslem(null);

                    let bilparaIslemleri = document.getElementById('bilparaIslemleri');
                    let bilparaIslemleriModal = bootstrap.Modal.getInstance(bilparaIslemleri)
                    bilparaIslemleriModal.hide();

                    if (parapuanIslem == 'ekle') {
                        successComp(`${userDetail.invitation_code} ID'li kullanıcıya ${bilparaMiktar} bilpara eklendi.`);
                    }
                    if (parapuanIslem == 'cikar') {
                        successComp(`${userDetail.invitation_code} ID'li kullanıcıdan ${bilparaMiktar} bilpara silindi.`);
                    }
                } else {
                    alertComp("İşlem Miktarı 0 olamaz!");
                }
            }

        } catch (error) {
            if (error.response.data.error) {
                alertComp(error.response.data.error)
            } else {
                alertComp(error.message)
            }
        }
    }

    const bilparaSifirla = async (sifirlama_gerekcesi) => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(import.meta.env.VITE_API_URL + '/admin/users/bilparaSifirla', {
                invitation_code: userDetail.invitation_code,
                sifirlama_gerekcesi
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUserDetail(prevUserDetail => ({
                ...prevUserDetail,
                paraPuan: res.data.paraPuan
            }));

            successComp(`${userDetail.invitation_code} ID'li kullanıcıdan bilpara puanları sıfırlandı.`);

        } catch (error) {
            if (error.response.data.error) {
                alertComp(error.response.data.error)
            } else {
                alertComp(error.message)
            }
        }
    }

    const userStatusChange = async (event) => {
        event.preventDefault();
        try {
            if (userStatusChangeDesc != null && userStatusChangeDesc.length > 5) {
                const token = localStorage.getItem('token');

                const res = await axios.post(import.meta.env.VITE_API_URL + '/admin/users/statusChange', {
                    invitation_code: userDetail.invitation_code,
                    description: userStatusChangeDesc
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserDetail(prevUserDetail => ({
                    ...prevUserDetail,
                    status: res.data.accountStatus
                }));

                let kullaniciDisable = document.getElementById('kullaniciDisable');
                let kullaniciDisableModal = bootstrap.Modal.getInstance(kullaniciDisable)
                kullaniciDisableModal.hide();

                setUserStatusChangeDesc("");
            } else {
                alertComp("Gerekçe boş olamaz!")
            }


        } catch (error) {
            if (error.response.data.error) {
                alertComp(error.response.data.error)
            } else {
                alertComp(error.message)
            }
        }
    }

    const successComp = (message) => toast.success(message, { position: "bottom-right", });
    const alertComp = (message) => toast.warn(message, { position: "bottom-right", });

    return (
        <>
            <ToastContainer theme='light' toastStyle={{ fontSize: 14, fontWeight: '700' }} />
            <main className="nxl-container">
                <div className="nxl-content">
                    <div className="page-header">
                        <div className="page-header-left d-flex align-items-center">
                            <div className="page-header-title">
                                <h5 className="m-b-10">Kullanıcılar</h5>
                            </div>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                                <li className="breadcrumb-item">Kullanıcı Detayı</li>
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
                                    {
                                        userDetail.status == 0 ? (
                                            <a href="#" className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#kullaniciDisable">
                                                <span>Aktifleştir</span>
                                            </a>
                                        ) : (
                                            <a href="#" className="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#kullaniciDisable">
                                                <span>Pasifleştir</span>
                                            </a>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="d-md-none d-flex align-items-center">
                                <a href="#" className="page-header-right-open-toggle">
                                    <i className="feather-align-right fs-20"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="row">
                            <div className="col-xxl-4 col-xl-6">
                                <div className="card stretch stretch-full">
                                    <div className="card-body">

                                        {
                                            userDetail.status == 0 && (
                                                <div className="disable" style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: 'rgb(0 0 0 / 60%)',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontSize: 20,
                                                    fontWeight: '700',
                                                    zIndex: 99
                                                }}>
                                                    Kullanıcı Pasif Durumda!
                                                </div>
                                            )
                                        }
                                        <div className="mb-4 text-center">
                                            <div className="wd-150 ht-150 mx-auto mb-3 position-relative">
                                                <div className="avatar-image wd-150 ht-150 border border-5 border-gray-3">
                                                    {
                                                        userDetail.avatar ? (
                                                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={import.meta.env.VITE_API_URL.slice(0, -3) + userDetail.avatar} alt="" className="img-fluid" />
                                                        ) : (
                                                            <p>Avatar Yok!</p>
                                                        )
                                                    }
                                                </div>
                                                <div className="wd-10 ht-10 text-success rounded-circle position-absolute translate-middle" style={{ top: '76%', right: 10 }}>
                                                    <i className="bi bi-patch-check-fill"></i>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <a href="#" className="fs-14 fw-bold d-block">{userDetail.name}</a>
                                                <a href="#" className="fs-12 fw-normal text-muted d-block">{userDetail.invitation_code}</a>
                                            </div>
                                        </div>
                                        <ul className="list-unstyled mb-4">
                                            <li className="hstack justify-content-between mb-4">
                                                <span className="text-muted fw-medium hstack gap-3"><i className="feather-mail"></i>Email</span>
                                                <p className="float-end">{userDetail.email}</p>
                                            </li>
                                            <li className="hstack justify-content-between mb-4">
                                                <span className="text-muted fw-medium hstack gap-3"><i className="feather-phone"></i>Telefon</span>
                                                <p className="float-end">{userDetail.phone}</p>
                                            </li>
                                            <li className="hstack justify-content-between mb-0">
                                                <span className="text-muted fw-medium hstack gap-3"><i className="feather-mail"></i>Doğum Günü</span>
                                                <p className="float-end">{userDetail.birthday}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-8 col-xl-6">
                                <div className="card border-top-0">
                                    <div className="card-header p-0">
                                        <ul className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item flex-fill border-top" role="presentation">
                                                <a href="#" className="nav-link active" data-bs-toggle="tab" data-bs-target="#genelTab" role="tab">Genel</a>
                                            </li>
                                            <li className="nav-item flex-fill border-top" role="presentation">
                                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#hareketLogTab" role="tab">Hareket Logları</a>
                                            </li>
                                            <li className="nav-item flex-fill border-top" role="presentation">
                                                <a href="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#siparislerTab" role="tab">Siparişler</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tab-content">
                                        <div className="tab-pane fade show active p-4" id="genelTab" role="tabpanel">
                                            <div className="profile-details mb-5">
                                                <div className="mb-4 d-flex align-items-center justify-content-between">
                                                    <h5 className="fw-bold mb-0">Profil Detayı</h5>
                                                    <div className="d-flex flex-row mb-3">
                                                        <a style={{ zIndex: 100 }} href="#" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#bilparaIslemleri">
                                                            <i className="feather-plus me-2"></i>
                                                            <span>BilPara İşlemleri</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">İsim Soyisim:</div>
                                                    <div className="col-sm-6 fw-semibold">{userDetail.name}</div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">Doğum Günü:</div>
                                                    <div className="col-sm-6 fw-semibold">{userDetail.birthday}</div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">Telefon Numarası:</div>
                                                    <div className="col-sm-6 fw-semibold">{userDetail.phone}</div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">Email:</div>
                                                    <div className="col-sm-6 fw-semibold">{userDetail.email}</div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">ParaPuan:</div>
                                                    <div className="col-sm-6 fw-semibold">{userDetail.paraPuan}</div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">Kayıt Tarihi:</div>
                                                    <div className="col-sm-6 fw-semibold">{moment(userDetail.created_at).format('DD/MM/YYYY HH:mm:ss')}</div>
                                                </div>
                                                <div className="row g-0 mb-4">
                                                    <div className="col-sm-6 text-muted">Kayıt Olduğu Ülke (IP Location):</div>
                                                    <div className="col-sm-6 fw-semibold">Türkiye</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="hareketLogTab" role="tabpanel">
                                            <div className="recent-activity p-4 pb-0">
                                                <div className="mb-4 pb-2 d-flex justify-content-between">
                                                    <h5 className="fw-bold">Hareket Logları</h5>
                                                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                                                </div>
                                                <ul className="list-unstyled activity-feed">
                                                    {
                                                        userDetail.with_logs.map((item, index) => (
                                                            <li key={index} className={`d-flex justify-content-between feed-item ${item.log.toLowerCase().includes('reklam') ? 'feed-item-warning' : 'feed-item-primary'}`}>
                                                                <div>
                                                                    <span className="text-truncate-1-line lead_date">
                                                                        <span className="date">[{moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}]</span>
                                                                    </span>
                                                                    <span className="text">{item.log} <a href="#" className="badge bg-soft-success text-success ms-1"><strong className='text-warning'>{item.process}</strong> </a></span>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }


                                                </ul>
                                                <a href="#" className="d-flex align-items-center text-muted">
                                                    <i className="feather feather-more-horizontal fs-12"></i>
                                                    <span className="fs-10 text-uppercase ms-2 text-truncate-1-line">Load More</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="siparislerTab" role="tabpanel">
                                            <div className="recent-activity p-4">
                                                <div className="mb-1 d-flex justify-content-between">
                                                    <h5 className="fw-bold">Son Siparişler</h5>
                                                    <a href="#" className="btn btn-sm btn-light-brand">View Alls</a>
                                                </div>
                                            </div>
                                            <div className="payment-history">
                                                <div className="table-responsive">
                                                    <table className="table mb-0">
                                                        <thead>
                                                            <tr className="border-top">
                                                                <th>ID</th>
                                                                <th>Date</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th className="text-end">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td><a href="#">#258963</a></td>
                                                                <td>02 NOV, 2022</td>
                                                                <td>$350</td>
                                                                <td><span className="badge bg-soft-success text-success">Completed</span></td>
                                                                <td className="hstack justify-content-end gap-4 text-end">
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail">
                                                                        <i className="feather feather-send fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details">
                                                                        <i className="feather feather-eye fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                                                                        <i className="feather feather-more-vertical fs-12"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">#987456</a></td>
                                                                <td>05 DEC, 2022</td>
                                                                <td>$590</td>
                                                                <td><span className="badge bg-soft-warning text-warning">Pendign</span></td>
                                                                <td className="hstack justify-content-end gap-4 text-end">
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail">
                                                                        <i className="feather feather-send fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details">
                                                                        <i className="feather feather-eye fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                                                                        <i className="feather feather-more-vertical fs-12"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">#456321</a></td>
                                                                <td>31 NOV, 2022</td>
                                                                <td>$450</td>
                                                                <td><span className="badge bg-soft-danger text-danger">Reject</span></td>
                                                                <td className="hstack justify-content-end gap-4 text-end">
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail">
                                                                        <i className="feather feather-send fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details">
                                                                        <i className="feather feather-eye fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                                                                        <i className="feather feather-more-vertical fs-12"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">#357951</a></td>
                                                                <td>03 JAN, 2023</td>
                                                                <td>$250</td>
                                                                <td><span className="badge bg-soft-success text-success">Completed</span></td>
                                                                <td className="hstack justify-content-end gap-4 text-end">
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail">
                                                                        <i className="feather feather-send fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details">
                                                                        <i className="feather feather-eye fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                                                                        <i className="feather feather-more-vertical fs-12"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">#258963</a></td>
                                                                <td>02 NOV, 2022</td>
                                                                <td>$350</td>
                                                                <td><span className="badge bg-soft-success text-success">Completed</span></td>
                                                                <td className="hstack justify-content-end gap-4 text-end">
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail">
                                                                        <i className="feather feather-send fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details">
                                                                        <i className="feather feather-eye fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                                                                        <i className="feather feather-more-vertical fs-12"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">#357951</a></td>
                                                                <td>03 JAN, 2023</td>
                                                                <td>$250</td>
                                                                <td><span className="badge bg-soft-success text-success">Completed</span></td>
                                                                <td className="hstack justify-content-end gap-4 text-end">
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Sent Mail">
                                                                        <i className="feather feather-send fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Invoice Details">
                                                                        <i className="feather feather-eye fs-12"></i>
                                                                    </a>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options">
                                                                        <i className="feather feather-more-vertical fs-12"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <div className="modal fade" id="bilparaIslemleri" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">BilPara Güncelle</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="notes-box">
                                <div className="notes-content">
                                    <form onSubmit={updateParaPuan} autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <strong>Mevcut Bakiye:</strong> <span style={{ fontWeight: '700', color: '#89c133' }}>{userDetail.paraPuan} </span>Bilpara Puan
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <label className="form-label">İşlem Seçimi</label>
                                                    <div className="form-check">
                                                        <input checked={parapuanIslem === 'ekle'} onChange={(event) => { setParapuanIslem(event.target.value) }} className="form-check-input" name='islem' type="radio" value="ekle" id="ekle" />
                                                        <label className="form-check-label" htmlFor="ekle">
                                                            Ekle
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input checked={parapuanIslem === 'cikar'} onChange={(event) => { setParapuanIslem(event.target.value) }} className="form-check-input" name='islem' type="radio" value="cikar" id="cikar" />
                                                        <label className="form-check-label" htmlFor="cikar">
                                                            Çıkar
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="note-description">
                                                    <label className="form-label">İşlem Miktarı (BilPara)</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" onChange={onlyNumber} value={bilparaMiktar} placeholder='0' />
                                                        <button onClick={decrease} type="button" className="btn btn-outline-secondary">
                                                            -
                                                        </button>
                                                        <button onClick={increase} type="button" className="btn btn-outline-secondary">
                                                            +
                                                        </button>
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
                                <button onClick={showSwal} className="btn btn-danger" data-bs-dismiss="modal">Bakiye Sıfırla</button>
                            </div>
                            <div className="actions d-flex gap-1">
                                <button className="btn btn-primary" data-bs-dismiss="modal">İptal</button>
                                <button onClick={updateParaPuan} type="submit" id="btn-n-add" className="btn btn-success">Güncelle</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="kullaniciDisable" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={userStatusChangeModalRef}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">
                                { userDetail.status == 1 ? ("Kullanıcıyı Pasifleştir") : ("Kullanıcıyı Aktifleştir") }
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="notes-box">
                                <div className="notes-content">
                                    <form onSubmit={userStatusChange} autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <strong>Kullanıcı ID:</strong> <span>{userDetail.invitation_code}</span>
                                                    <br />
                                                    <strong>Kullanıcı:</strong> <span>{userDetail.name}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <label className="form-label">Gerekçe</label>
                                                    <input type="text" value={userStatusChangeDesc} onChange={(event) => { setUserStatusChangeDesc(event.target.value) }} className="form-control" placeholder={userDetail.status == 1 ? "Pasifleştirme sebebini girin" : "Aktifleştirme sebebini girin"} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <div>
                                <button className="btn btn-primary" data-bs-dismiss="modal">İptal</button>
                            </div>
                            <div className="actions d-flex gap-1">
                                {
                                    userDetail.status == 1 ? (
                                        <button onClick={userStatusChange} type="submit" id="btn-n-add" className="btn btn-danger" >Pasifleştir</button>
                                    ) : (
                                        <button onClick={userStatusChange} type="submit" id="btn-n-add" className="btn btn-success" >Aktifleştir</button>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}