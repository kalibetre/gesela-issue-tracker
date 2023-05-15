import React from 'react';
import { ErrorIcon, SpinnerIcon } from '../Common/Icons';
import './StatusMessage.css';

const StatusMessage = (props) => {
    return (
        <div className="status-container">
            <div className="status-message-card">
                <div className="status-icon-container">
                    {props.loading && <SpinnerIcon />}
                    {props.error && <ErrorIcon />}
                </div>
                <div className="status-content">
                    <h3 className="status-title">{props.title}</h3>
                    <h4 className="status-message">{props.message}</h4>
                </div>
            </div>
        </div>
    );
};

export default StatusMessage;
