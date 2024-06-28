import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setUser } from '~/redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '~/redux/slices/generalSlice';

export default function Login() {

    useEffect(() => {
        document.title = 'Giriş Yap | ' + import.meta.env.VITE_PROJECT_NAME;
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const loginError = () => toast.warn("Giriş bilgileriniz hatalı. Lütfen tekrar deneyin!", { position: "bottom-right", });

    const loginHandle = async (e) => {
        dispatch(setLoading(true));
        e.preventDefault();

        axios.post(import.meta.env.VITE_API_URL + '/admin/login', {
            email,
            password
        })
            .then(function (response) {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser(response.data.user))
                dispatch(setLoading(false));
                navigate('/')
                console.log(response.data);
            })
            .catch(function (error) {
                loginError()
                dispatch(setLoading(false));
                console.log(error);
            });
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [])

    return (
        <>
            <main className="auth-minimal-wrapper">
                <ToastContainer theme='light' toastStyle={{ fontSize: 14, fontWeight: '700' }} />
                <div className="auth-minimal-inner">
                    <div className="minimal-card-wrapper">
                        <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                            <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
                                <img src="assets/images/logo-abbr.png" alt="" className="img-fluid" />
                            </div>
                            <div className="card-body p-sm-5">
                                <h2 className="fs-20 fw-bolder mb-4">Giriş Yap</h2>
                                <form action="#" className="w-100 mt-4 pt-2">
                                    <div className="mb-4">
                                        <input type="email" className="form-control" placeholder="E-Posta" onChange={(event) => setEmail(event.target.value)} value={email} required />
                                    </div>
                                    <div className="mb-4">
                                        <input type="password" className="form-control" placeholder="Şifre" onChange={(event) => setPassword(event.target.value)} value={password} required />
                                    </div>
                                    <button onClick={loginHandle} type="submit" className="btn btn-lg btn-primary w-100">Giriş Yap</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
