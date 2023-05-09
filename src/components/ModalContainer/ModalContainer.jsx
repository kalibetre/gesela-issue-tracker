import React from 'react';
import './ModalContainer.css';

const ModalContainer = (props) => {
    return (
        <div className="mc-container">
            <div className="mc-modal">
                <div className="mc-modal-header">
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        className="mc-logo"
                    />
                    <h1 className="mc-title">Gesela</h1>
                </div>
                <div className="mc-modal-content">{props.children}</div>
            </div>
        </div>
    );
};

export default ModalContainer;
