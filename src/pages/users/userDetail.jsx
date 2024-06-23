import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function UserDetail() {

    const [userDetail, setUserDetail] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        document.title = userId + 'User Detail | ' + import.meta.env.VITE_PROJECT_NAME;
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

            console.log(res.data.userDetail);
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

    return (
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
                                <a href="#" className="btn btn-icon btn-light-brand successAlertMessage">
                                    <i className="feather-star"></i>
                                </a>
                                <a href="#" className="btn btn-icon btn-light-brand">
                                    <i className="feather-eye me-2"></i>
                                    <span>Follow</span>
                                </a>
                                <a href="customers-create.html" className="btn btn-primary">
                                    <i className="feather-plus me-2"></i>
                                    <span>Create Customer</span>
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
                <div className="main-content">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-6">
                            <div className="card stretch stretch-full">
                                <div className="card-body">
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
                                                    <a href="#" className="btn btn-sm btn-light-brand">Düzenle</a>
                                                    <a href="#" className="btn btn-sm btn-danger">Kullanıcıyı Sil</a>
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
                                                <div className="col-sm-6 text-muted">Kayıt Tarihi:</div>
                                                <div className="col-sm-6 fw-semibold">{moment(userDetail.created_at).format('DD/MM/YYYY HH:mm:ss')}</div>
                                            </div>
                                            <div className="row g-0 mb-4">
                                                <div className="col-sm-6 text-muted">Kayıt Olduğu Ülke (IP Location):</div>
                                                <div className="col-sm-6 fw-semibold">Türkiye</div>
                                            </div>
                                        </div>
                                        <div className="alert alert-dismissible mb-4 p-4 d-flex alert-soft-warning-message profile-overview-alert" role="alert">
                                            <div className="me-4 d-none d-md-block">
                                                <i className="feather feather-alert-triangle fs-1"></i>
                                            </div>
                                            <div>
                                                <p className="fw-bold mb-1 text-truncate-1-line">Your profile has not been updated yet!!!</p>
                                                <p className="fs-10 fw-medium text-uppercase text-truncate-1-line">Last Update: <strong>26 Dec, 2023</strong></p>
                                                <a href="#" className="btn btn-sm bg-soft-warning text-warning d-inline-block">Update Now</a>
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
                                                <li className="d-flex justify-content-between feed-item feed-item-success">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">Reynante placed new order <span className="date">[April 19, 2023]</span></span>
                                                        <span className="text">New order placed <a href="#" className="fw-bold text-primary">#456987</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-info">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">5+ friends join this group <span className="date">[April 20, 2023]</span></span>
                                                        <span className="text">Joined the group <a href="#" className="fw-bold text-primary">"Duralux"</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-secondary">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">Socrates send you friend request <span className="date">[April 21, 2023]</span></span>
                                                        <span className="text">New friend request <a href="#" className="badge bg-soft-success text-success ms-1">Conform</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-warning">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">Reynante make deposit $565 USD <span className="date">[April 22, 2023]</span></span>
                                                        <span className="text">Make deposit <a href="#" className="fw-bold text-primary">$565 USD</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-primary">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">New event are coming soon <span className="date">[April 23, 2023]</span></span>
                                                        <span className="text">Attending the event <a href="#" className="fw-bold text-primary">"Duralux Event"</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-info">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">5+ friends join this group <span className="date">[April 20, 2023]</span></span>
                                                        <span className="text">Joined the group <a href="#" className="fw-bold text-primary">"Duralux"</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-danger">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">New meeting joining are pending <span className="date">[April 23, 2023]</span></span>
                                                        <span className="text">Duralux meeting <a href="#" className="badge bg-soft-warning text-warning ms-1">Join</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-info">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">5+ friends join this group <span className="date">[April 20, 2023]</span></span>
                                                        <span className="text">Joined the group <a href="#" className="fw-bold text-primary">"Duralux"</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-secondary">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">Socrates send you friend request <span className="date">[April 21, 2023]</span></span>
                                                        <span className="text">New friend request <a href="#" className="badge bg-soft-success text-success ms-1">Conform</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-warning">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">Reynante make deposit $565 USD <span className="date">[April 22, 2023]</span></span>
                                                        <span className="text">Make deposit <a href="#" className="fw-bold text-primary">$565 USD</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
                                                <li className="d-flex justify-content-between feed-item feed-item-primary">
                                                    <div>
                                                        <span className="text-truncate-1-line lead_date">New event are coming soon <span className="date">[April 23, 2023]</span></span>
                                                        <span className="text">Attending the event <a href="#" className="fw-bold text-primary">"Duralux Event"</a></span>
                                                    </div>
                                                    <div className="ms-3 d-flex gap-2 align-items-center">
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Make Read"><i className="feather feather-check fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="View Activity"><i className="feather feather-eye fs-12"></i></a>
                                                        <a href="#" className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="More Options"><i className="feather feather-more-vertical"></i></a>
                                                    </div>
                                                </li>
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
    )
}
