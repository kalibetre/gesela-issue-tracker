import React from 'react';
import Logo from '../Logo/Logo';
import './ModalContainer.css';

const ModalContainer = (props) => {
    return (
        <div className="mc-container">
            <div className="mc-modal">
                <div className="mc-modal-header">
                    <Logo />
                </div>
                <div className="mc-modal-content">{props.children}</div>
            </div>
        </div>
    );
};

export default ModalContainer;
