import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LinkButton.css';

const LinkButton = (props) => {
    const location = useLocation();

    return (
        <Link
            className={
                'lb-link' + (location.pathname === props.to ? ' lb-active' : '')
            }
            to={props.to}
        >
            <span className="lb-icon">{props.icon}</span>
            <h3>{props.label}</h3>
        </Link>
    );
};

export default LinkButton;
