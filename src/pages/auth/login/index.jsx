import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigation = useNavigate();
    const [email, setEmail] = useState("login@bilpara.com");
    const [password, setPassword] = useState("123456");

    return (
        <>
            <main className="auth-minimal-wrapper">
                <div className="auth-minimal-inner">
                    <div className="minimal-card-wrapper">
                        <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                            <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
                                <img src="assets/images/logo-abbr.png" alt="" className="img-fluid" />
                            </div>
                            <div className="card-body p-sm-5">
                                <h2 className="fs-20 fw-bolder mb-4">Login</h2>
                                <form action="#" className="w-100 mt-4 pt-2">
                                    <div className="mb-4">
                                        <input type="email" className="form-control" placeholder="Email or Username" onChange={(event) => setEmail(event.target.value)} value={email} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" placeholder="Password" onChange={(event) => setPassword(event.target.value)} value={password} required />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="rememberMe" />
                                                <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <button onClick={() => navigation('/')} type="submit" className="btn btn-lg btn-primary w-100">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
