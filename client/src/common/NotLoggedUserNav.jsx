import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div class="header__nav">
            <div class="header__nav-item">
                <Link to="/login">Login</Link>
            </div>
            <div class="header__nav-item">
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}