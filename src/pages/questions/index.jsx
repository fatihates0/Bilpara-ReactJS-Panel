import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '~/redux/slices/generalSlice';

export default function Sorular() {
    useEffect(() => {
        document.title = 'Sorular | ' + import.meta.env.VITE_PROJECT_NAME;
    }, []);

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [nextLink, setNextLink] = useState(null);
    const [prevLink, setPrevLink] = useState(null);
    const [searchKey, setSearchKey] = useState([]);
    const [filter, setFilter] = useState('all-category');
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { search_key, page_size, page } = useParams();

    useEffect(() => {
        // API çağrısı burada yapılacak
        if (search_key) setSearchKey(search_key);

        fetchQuestions()

    }, [searchKey]);


    useEffect(() => {
        filterQuestions();
    }, [filter, questions]);


    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchKey(query);

        navigate(`/questions/${encodeURIComponent(query)}`);

        fetchQuestions()
    };

    const fetchQuestions = async (url = null,newFilter = filter) => {

        let activePage = page ? page : "0";
        let pageSize = page_size ? page_size : "9";
        let aranacakKelime = search_key ? search_key : "";

        dispatch(setLoading(true));
        try {
            // API çağrısı yaparak soruları al
            const response = await axios.post(url ? url + '&status_filter=' + newFilter : import.meta.env.VITE_API_URL + '/getQuestions?search_key=' + aranacakKelime + '&page=' + activePage + '&page_size=' + pageSize + '&status_filter=' + newFilter);

            if (response.data.links.next) {
                setNextLink(response.data.links.next + '&search_key=' + aranacakKelime + '&page_size=' + pageSize);
            } else {
                setNextLink(null);
            }

            if (response.data.links.prev) {
                setPrevLink(response.data.links.prev + '&search_key=' + aranacakKelime + '&page_size=' + pageSize);
            } else {
                setPrevLink(null)
            }

            const data = response.data.data;
            setQuestions(data);
            setFilteredQuestions(data);
        } catch (error) {
            console.log(error);
            navigate('/')
        }
        dispatch(setLoading(false));
    };

    const filterQuestions = () => {
        if (filter === 'all-category') {
            setFilteredQuestions(questions);
        } else {
            const filtered = questions.filter(question => question.status === filter);
            setFilteredQuestions(filtered);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        fetchQuestions(null,newFilter);
    };

    const handleApprowedQuestion = async (questionId) => {
        console.log(questionId);
    }


    return (
        <>
            <main className="nxl-container apps-container apps-notes">
                <div className="nxl-content without-header nxl-full-content">
                    <div className="main-content d-flex">
                        <div className="content-sidebar content-sidebar-md" data-scrollbar-target="#psScrollbarInit">
                            <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                                <h4 className="fw-bolder mb-0">Sorular</h4>
                                <a href="#;" className="app-sidebar-close-trigger d-flex">
                                    <i className="feather-x"></i>
                                </a>
                            </div>
                            <div className="content-sidebar-header">
                                <a href="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="feather-plus me-2"></i>
                                    <span>Add Question</span>
                                </a>
                            </div>
                            <div className="content-sidebar-body">
                                <ul className="nav d-flex flex-column nxl-content-sidebar-item">
                                    <li className="nav-item">
                                        <a href="#" className={`nav-link note-link ${filter === 'all-category' ? 'active' : ''}`} onClick={() => handleFilterChange('all-category')}>
                                            <i className="feather-layers"></i>
                                            <span>Tümü</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className={`nav-link note-link ${filter === 1 ? 'active' : ''}`} onClick={() => handleFilterChange(1)}>
                                            <i className="feather-check-circle"></i>
                                            <span>Onaylananlar</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className={`nav-link note-link ${filter === 2 ? 'active' : ''}`} onClick={() => handleFilterChange(2)}>
                                            <i className="feather-trash-2"></i>
                                            <span>Reddedilenler</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className={`nav-link note-link ${filter === 0 ? 'active' : ''}`} onClick={() => handleFilterChange(0)}>
                                            <i className="feather-clock"></i>
                                            <span>İnceleme Bekleyenler</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content-area" data-scrollbar-target="#psScrollbarInit">
                            <div className="content-area-header sticky-top">
                                <div className="page-header-left d-flex align-items-center gap-2">
                                    <a href="#;" className="app-sidebar-open-trigger me-2">
                                        <i className="feather-align-left fs-20"></i>
                                    </a>
                                </div>
                                <div className="page-header-right ms-auto">
                                    <div className="hstack gap-2">
                                        <div className="hstack">
                                            <a href="#" className="search-form-open-toggle">
                                                <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Search">
                                                    <i className="feather feather-search"></i>
                                                </div>
                                            </a>
                                            <form className="search-form" style={{ display: 'none' }}>
                                                <div className="search-form-inner">
                                                    <a href="#" className="search-form-close-toggle">
                                                        <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Search Close">
                                                            <i className="feather feather-arrow-left"></i>
                                                        </div>
                                                    </a>
                                                    <input onChange={handleSearch} value={searchKey} type="search" className="py-3 px-0 border-0 w-100" id="notesSearch" placeholder="Search..." />
                                                </div>
                                            </form>
                                        </div>
                                        {
                                            prevLink && (
                                                < a onClick={() => fetchQuestions(prevLink)} className="d-sm-flex">
                                                    <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Newest">
                                                        <i className="feather feather-chevron-left"></i>
                                                    </div>
                                                </a>
                                            )
                                        }

                                        {
                                            nextLink && (
                                                <a onClick={() => {
                                                    fetchQuestions(nextLink)
                                                }} className="d-sm-flex">
                                                    <div className="avatar-text avatar-md" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Oldest">
                                                        <i className="feather feather-chevron-right"></i>
                                                    </div>
                                                </a>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="content-area-body pb-0">
                                <div className="row note-has-grid" id="note-full-container">

                                    {filteredQuestions.map((question, index) => (
                                        <div key={index} className={`col-xxl-4 col-xl-6 col-lg-4 col-sm-6 single-note-item all-category ${question.status === 0 && 'note-personal'} ${question.status === 1 && 'note-important'} ${question.status === 2 && 'note-tasks'} note-${question.status}`}>
                                            <div className="card card-body mb-4 stretch stretch-full">
                                                <span className="side-stick"></span>
                                                <h5 className="note-title w-75 mb-1">{question.soru} <i className="point bi bi-circle-fill ms-1 fs-7"></i></h5>
                                                <p className="fs-11 text-muted note-date">{moment(question.updated_at).format('DD/MM/YYYY HH:mm')}</p>
                                                <div className="note-content flex-grow-1">
                                                    <p className="text-muted note-inner-content text-truncate-3-line">{question.seceneka}</p>
                                                    <p className="text-muted note-inner-content text-truncate-3-line">{question.secenekb}</p>
                                                    <p className="text-muted note-inner-content text-truncate-3-line">{question.secenekc}</p>
                                                    <p className="text-muted note-inner-content text-truncate-3-line">{question.secenekd}</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-1">
                                                    <span onClick={() => console.log("Tiklandi", question.questionId)} className="avatar-text avatar-sm"><i className="feather-check-circle"></i></span>
                                                    <div className="ms-auto">
                                                        <div className="dropdown btn-group category-selector">
                                                            <a className="nav-link dropdown-toggle category-dropdown label-group p-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                                                                <div className="category">
                                                                    <div className="category-business"></div>
                                                                    <div className="category-social"></div>
                                                                    <div className="category-important"></div>
                                                                </div>
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-right category-menu">
                                                                <a className="note-works badge-group-item badge-works dropdown-item position-relative category-works" href="#;"><span className="wd-5 ht-5 bg-primary rounded-circle me-3"></span>İncelemeye Al </a>
                                                                <a className="note-tasks badge-group-item badge-tasks dropdown-item position-relative category-tasks" href="#;"><span className="wd-5 ht-5 bg-danger rounded-circle me-3"></span>Sil </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >



            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">Add Notes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="notes-box">
                                <div className="notes-content">
                                    <form action="#" id="addnotesmodalTitle">
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <div className="note-title">
                                                    <label className="form-label">Note Title</label>
                                                    <input type="text" id="note-has-title" className="form-control" min="25" placeholder="Title" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="note-description">
                                                    <label className="form-label">Note Description</label>
                                                    <textarea id="note-has-description" className="form-control" min="60" placeholder="Description" rows="5"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btn-n-save" className="float-left btn btn-success">Save</button>
                            <button className="btn btn-danger" data-dismiss="modal">Discard</button>
                            <button id="btn-n-add" className="btn btn-success" disabled="disabled">Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
