import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setLoading } from '~/redux/slices/generalSlice';

export default function Notifications() {


    const [title, setTitle] = useState("Bilpara");
    const [body, setBody] = useState("");
    const [topic, setTopic] = useState("allDevices");
    const [token, setToken] = useState("");
    const [notificationModel, setNotificationModel] = useState("topic");
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState(null);
    const [filter, setFilter] = useState('allDevices');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        document.title = 'Bildirimler | ' + import.meta.env.VITE_PROJECT_NAME;

        getNotifications();
    }, []);

    useEffect(() => {

        filterNotifications();

    }, [filter, notifications]);


    const getNotifications = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(import.meta.env.VITE_API_URL + '/admin/notifications/sent', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data);
            setNotifications(res.data.notifications)
            dispatch(setLoading(false));
        } catch (error) {
            alertComp(error.message);
            dispatch(setLoading(false));
        }
    }

    const filterNotifications = () => {
        if (filter === 'allDevices') {
            setFilteredNotifications(notifications);
        } else {
            const filtered = notifications.filter(notification => notification.topic === filter);
            setFilteredNotifications(filtered)
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        getNotifications();
    };



    const successComp = (message) => toast.success(message, { position: "bottom-right", });
    const alertComp = (message) => toast.warn(message, { position: "bottom-right", });

    const handleSubmit = async () => {
        dispatch(setLoading(true))
        try {
            const token = localStorage.getItem('token');

            let res;

            if (notificationModel === "topic") {
                res = await axios.post(import.meta.env.VITE_API_URL + '/admin/notifications/sendTopic', {
                    messages: {
                        title,
                        body
                    },
                    topic
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                res = await axios.post(import.meta.env.VITE_API_URL + '/admin/notifications/sendTopic', {
                    messages: {
                        title,
                        body
                    },
                    deviceToken: token
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }


            console.log(res.data);

            if (res.data.status == true) {
                successComp(`Bildirim "${topic}" topiğine kayıtlı cihazlara gönderildi.`);
            }

            setTitle("Bilpara")
            setBody("")
            setTopic("allDevices")
            setToken("")
            getNotifications();
            dispatch(setLoading(true))
        } catch (error) {
            console.error(error);
            alertComp(error.message);
            dispatch(setLoading(true))
        }
    }

    if (!notifications) {
        return (
            <div>Data çekilemiyor!</div>
        )
    }

    if (!filteredNotifications) {
        return (
            <div>Data çekilemiyor!</div>
        )
    }

    return (
        <>
            <ToastContainer theme='light' toastStyle={{ fontSize: 14, fontWeight: '700' }} />
            <main className="nxl-container apps-container apps-tasks">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
                <div className="nxl-content without-header nxl-full-content">
                    <div className="main-content d-flex">
                        <div className="content-sidebar content-sidebar-md" data-scrollbar-target="#psScrollbarInit">
                            <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                                <h4 className="fw-bolder mb-0">Bildirim Sistemi</h4>
                                <a href="#" className="app-sidebar-close-trigger d-flex">
                                    <i className="feather-x"></i>
                                </a>
                            </div>
                            <div className="content-sidebar-header">
                                <a href="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="feather-plus me-2"></i>
                                    <span>Yeni Bildirim</span>
                                </a>
                            </div>
                            <div className="content-sidebar-body">
                                <ul className="nav flex-column nxl-content-sidebar-item">
                                    <li className="nav-item">
                                        <a className={`nav-link note-link ${filter === 'allDevices' ? 'active' : ''}`} onClick={() => handleFilterChange('allDevices')}>
                                            <i className="fa-solid fa-globe"></i>
                                            <span>Tümü</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link note-link ${filter === 'iosDevices' ? 'active' : ''}`} onClick={() => handleFilterChange('iosDevices')}>
                                            <i className="fa-brands fa-apple"></i>
                                            <span>IOS Bildirimleri</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link note-link ${filter === 'androidDevices' ? 'active' : ''}`} onClick={() => handleFilterChange('androidDevices')}>
                                            <i className="fa-brands fa-android"></i>
                                            <span>Android Bildirimleri</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content-area" data-scrollbar-target="#psScrollbarInit">
                            <div className="content-area-body">
                                <div className="card stretch stretch-full">
                                    <a href="#" className="card-header" data-bs-toggle="collapse" data-bs-target="#tasks_collapse_1">
                                        <h5 className="mb-0">Gönderilen Bildirimler</h5>
                                    </a>
                                    <div className="card-body collapse show" id="tasks_collapse_1">
                                        <ul className="list-unstyled mb-0">

                                            {
                                                filteredNotifications.map((item, index) => (
                                                    <li key={index} className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center gap-3 me-3">
                                                                <div className="d-flex align-items-center gap-3">
                                                                    {
                                                                        item.topic === 'allDevices' && (
                                                                            <div className="lh-base"><i className="fa-solid fa-globe"></i></div>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.topic === 'iosDevices' && (
                                                                            <div className="lh-base"><i className="fa-brands fa-apple"></i></div>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.topic === 'androidDevices' && (
                                                                            <div className="lh-base"><i className="fa-brands fa-android"></i></div>
                                                                        )
                                                                    }
                                                                    <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                                        <div className="fs-13 fw-bold text-truncate-1-line">{item.title}
                                                                            {
                                                                                item.topic === 'allDevices' && (
                                                                                    <span className="ms-2 badge bg-soft-danger text-success">{item.topic}</span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item.topic === 'iosDevices' && (
                                                                                    <span className="ms-2 badge bg-soft-danger text-warning">{item.topic}</span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item.topic === 'androidDevices' && (
                                                                                    <span className="ms-2 badge bg-soft-danger text-primary">{item.topic}</span>
                                                                                )
                                                                            }
                                                                        </div>
                                                                        <div className="fs-12 fw-normal text-muted text-truncate-1-line">{item.body}</div>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                                <div className="row text-center">
                                                                    <div className="d-md-inline-block d-none me-3">{moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</div>
                                                                    <div className="badge text-secondary d-md-inline-block d-none">" {item.with_user.name} " tarafından gönderildi.</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">Yeni Bildirim</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="notes-box">
                                <div className="notes-content">
                                    <div className="">
                                        <ul className="nav nav-pills mb-3 row" id="pills-tab" role="tablist">
                                            <li onClick={() => { setNotificationModel('topic') }} className="nav-item col-md-6" role="presentation">
                                                <button style={{ width: '100%' }} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Topic</button>
                                            </li>
                                            <li onClick={() => { setNotificationModel('token') }} className="nav-item col-md-6" role="presentation">
                                                <button style={{ width: '100%' }} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Token</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <form autoComplete='off'>
                                                <div className="row">
                                                    <div className="col-md-12 mb-3">
                                                        <div className="note-title">
                                                            <label className="form-label">Bildirim Başlığı (Title)</label>
                                                            <input value={title} onChange={event => { setTitle(event.target.value) }} type="text" id="note-has-title" className="form-control" min="25" placeholder="Title" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <div className="note-description">
                                                            <label className="form-label">Bildirim Detayı (Body)</label>
                                                            <input value={body} onChange={(event) => { setBody(event.target.value) }} type="text" id="note-has-title" className="form-control" min="25" placeholder="Body" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="note-title">
                                                            <label className="form-label">Cihaz Seçimi</label>
                                                            <div className="form-check">
                                                                <input checked={topic === 'allDevices'} onChange={(event) => { setTopic(event.target.value) }} className="form-check-input" name='topic' type="radio" value="allDevices" id="allDevices" />
                                                                <label className="form-check-label" htmlFor="allDevices">
                                                                    Tüm Cihazlara
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input checked={topic === 'iosDevices'} onChange={(event) => { setTopic(event.target.value) }} className="form-check-input" name='topic' type="radio" value="iosDevices" id="iosDevices" />
                                                                <label className="form-check-label" htmlFor="iosDevices">
                                                                    IOS Cihazlara
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input checked={topic === 'androidDevices'} onChange={(event) => { setTopic(event.target.value) }} className="form-check-input" name='topic' type="radio" value="androidDevices" id="androidDevices" />
                                                                <label className="form-check-label" htmlFor="androidDevices">
                                                                    Android Cihazlara
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" >
                                            <form autoComplete='off'>
                                                <div className="row">
                                                    <div className="col-md-12 mb-3">
                                                        <div className="note-title">
                                                            <label className="form-label">Bildirim Başlığı (Title)</label>
                                                            <input value={title} onChange={event => { setTitle(event.target.value) }} type="text" id="note-has-title" className="form-control" min="25" placeholder="Title" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-3">
                                                        <div className="note-description">
                                                            <label className="form-label">Bildirim Detayı (Body)</label>
                                                            <input value={body} onChange={(event) => { setBody(event.target.value) }} type="text" id="note-has-title" className="form-control" min="25" placeholder="Body" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="note-title">
                                                            <label className="form-label">Kullanıcı Tokenı</label>
                                                            <input value={token} onChange={event => { setToken(event.target.value) }} type="text" id="note-has-title" className="form-control" min="25" placeholder="Token" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" data-bs-dismiss="modal">İptal</button>
                            <button onClick={handleSubmit} type="submit" id="btn-n-add" className="btn btn-success" >Gönder</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
