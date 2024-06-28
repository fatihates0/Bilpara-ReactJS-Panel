import React from 'react'
import { Link } from 'react-router-dom'

export default function PageHeading({title}) {
    return (
        <div className="page-header-left d-flex align-items-center">
            <div className="page-header-title">
                <h5 className="m-b-10">Sayfalar</h5>
            </div>
            <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" >Anasayfa</Link></li>
                {
                    title && <li className="breadcrumb-item">{title}</li>
                }
            </ul>
        </div>
    )
}
