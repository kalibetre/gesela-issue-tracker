import React from 'react';
import Logo from '../Logo/Logo';
import './SideBar.css';

const SideBar = (props) => {
    return (
        <div className="sdb-container">
            <div className="sdb-header">
                <div className="sdb-logo">
                    <Logo />
                </div>
            </div>
            <div className="sdb-menu">{props.children}</div>
        </div>
    );
};

export default SideBar;
