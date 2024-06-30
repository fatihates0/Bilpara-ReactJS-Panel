import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/header'
import Sidebar from './component/sidebar'
import Footer from './component/footer'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default function WebLayout() {
    return (
        <>
            <Header />
            <Sidebar />
            <Outlet />
        </>
    )
}
