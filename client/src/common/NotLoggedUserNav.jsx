import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="header__nav">
            <div className="header__nav-item">
                <Link to="/login">Login</Link>
            </div>
            <div className="header__nav-item">
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}