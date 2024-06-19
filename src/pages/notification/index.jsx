import React from 'react'
import { useEffect } from 'react';

export default function Notifications() {
    useEffect(() => {
        document.title = 'Bildirimler | ' + import.meta.env.VITE_PROJECT_NAME;
    }, []);
    return (
        <main className="nxl-container apps-container apps-tasks">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
            <div className="nxl-content without-header nxl-full-content">
                <div className="main-content d-flex">
                    <div className="content-sidebar content-sidebar-md" data-scrollbar-target="#psScrollbarInit">
                        <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                            <h4 className="fw-bolder mb-0">Tasks</h4>
                            <a href="#" className="app-sidebar-close-trigger d-flex">
                                <i className="feather-x"></i>
                            </a>
                        </div>
                        <div className="content-sidebar-header">
                            <a href="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addNewTasks">
                                <i className="feather-plus me-2"></i>
                                <span>Yeni Bildirim</span>
                            </a>
                        </div>
                        <div className="content-sidebar-body">
                            <ul className="nav flex-column nxl-content-sidebar-item">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="feather-list"></i>
                                        <span>Tümü</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <i class="fa-brands fa-apple"></i>
                                        <span>IOS Bildirimleri</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <i class="fa-brands fa-android"></i>
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
                                    <h5 className="mb-0">Recently Assigned</h5>
                                </a>
                                <div className="card-body collapse show" id="tasks_collapse_1">
                                    <ul className="list-unstyled mb-0">
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask1" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask1"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Video conference with Canada Team <span className="ms-2 badge bg-soft-danger text-danger">High</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-primary text-primary d-md-inline-block d-none">Calls</div>
                                                    <div className="d-md-inline-block d-none me-3">27 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/1.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask2" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask2"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Client objective meeting <span className="ms-2 badge bg-soft-primary text-primary">Normal</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-success text-success d-md-inline-block d-none">Conferences</div>
                                                    <div className="d-md-inline-block d-none me-3">22 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/2.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask3" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask3"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Target market trend analysis on the go <span className="ms-2 badge bg-soft-warning text-warning">Medium</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-teal text-teal d-md-inline-block d-none">Meetings</div>
                                                    <div className="d-md-inline-block d-none me-3">23 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/3.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask4" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask4"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Send revised proposal to Mr. Dow Jones <span className="ms-2 badge bg-soft-success text-success">Low</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-primary text-primary d-md-inline-block d-none">Calls</div>
                                                    <div className="d-md-inline-block d-none me-3">28 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/4.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-0 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask5" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask5"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Set up first call for demo <span className="ms-2 badge bg-soft-danger text-danger">Urgent</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-warning text-warning d-md-inline-block d-none">Project</div>
                                                    <div className="d-md-inline-block d-none me-3">30 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/5.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card stretch stretch-full">
                                <a href="#" className="card-header" data-bs-toggle="collapse" data-bs-target="#tasks_collapse_yesterday">
                                    <h5 className="mb-0">Yesterday</h5>
                                </a>
                                <div className="card-body collapse show" id="tasks_collapse_yesterday">
                                    <ul className="list-unstyled mb-0">
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask6" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask6"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Client objective meeting <span className="ms-2 badge bg-soft-primary text-primary">Normal</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-success text-success d-md-inline-block d-none">Conferences</div>
                                                    <div className="d-md-inline-block d-none me-3">22 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/2.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask7" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask7"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Target market trend analysis on the go <span className="ms-2 badge bg-soft-warning text-warning">Medium</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-teal text-teal d-md-inline-block d-none">Meetings</div>
                                                    <div className="d-md-inline-block d-none me-3">23 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/3.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-0 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask8" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask8"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Send revised proposal to Mr. Dow Jones <span className="ms-2 badge bg-soft-success text-success">Low</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-primary text-primary d-md-inline-block d-none">Calls</div>
                                                    <div className="d-md-inline-block d-none me-3">28 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/4.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card mb-0">
                                <a href="#" className="card-header" data-bs-toggle="collapse" data-bs-target="#tasks_collapse_20_nov">
                                    <h5 className="mb-0">20 Nov, 2023</h5>
                                </a>
                                <div className="card-body collapse show" id="tasks_collapse_20_nov">
                                    <ul className="list-unstyled mb-0">
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask9" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask9"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Target market trend analysis on the go <span className="ms-2 badge bg-soft-warning text-warning">Medium</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-teal text-teal d-md-inline-block d-none">Meetings</div>
                                                    <div className="d-md-inline-block d-none me-3">23 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/3.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask10" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask10"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Send revised proposal to Mr. Dow Jones <span className="ms-2 badge bg-soft-success text-success">Low</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-primary text-primary d-md-inline-block d-none">Calls</div>
                                                    <div className="d-md-inline-block d-none me-3">28 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/4.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-3 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask11" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask11"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Client objective meeting <span className="ms-2 badge bg-soft-primary text-primary">Normal</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-success text-success d-md-inline-block d-none">Conferences</div>
                                                    <div className="d-md-inline-block d-none me-3">22 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/2.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="single-task-list p-3 mb-0 border border-dashed rounded-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3 me-3">
                                                    <div className="custom-control custom-checkbox me-2">
                                                        <input type="checkbox" className="custom-control-input" id="customCheckTask12" data-checked-action="task-action" />
                                                            <label className="custom-control-label c-pointer" htmlFor="customCheckTask12"></label>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="lh-base"><i className="feather-star"></i></div>
                                                        <a href="#" className="single-task-list-link" data-bs-toggle="offcanvas" data-bs-target="#tasksDetailsOffcanvas">
                                                            <div className="fs-13 fw-bold text-truncate-1-line">Video conference with Canada Team <span className="ms-2 badge bg-soft-danger text-danger">High</span></div>
                                                            <div className="fs-12 fw-normal text-muted text-truncate-1-line">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-shrink-0 align-items-center gap-3">
                                                    <div className="badge bg-soft-warning text-warning d-md-inline-block d-none">Meeting</div>
                                                    <div className="d-md-inline-block d-none me-3">27 Nov, 2023</div>
                                                    <div className="avatar-image avatar-md d-sm-inline-block d-none">
                                                        <img src="assets/images/avatar/1.png" alt="user" className="img-fluid" />
                                                    </div>
                                                    <div className="dropdown">
                                                        <a href="#" className="avatar-text avatar-md" data-bs-toggle="dropdown">
                                                            <i className="feather-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a className="dropdown-item edit-task" href="#">Edit Task</a>
                                                            <a className="dropdown-item view-task" href="#">View Task</a>
                                                            <a className="dropdown-item delete-task" href="#">Delete Task</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
