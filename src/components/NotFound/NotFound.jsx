import React from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import '../ModalContainer/ModalContainer.css';
import './NotFound.css';

const SignIn = () => {
    return (
        <ModalContainer>
            <div className='err-pg-container'>
                <h2 className='err-pg-status'>
                    404
                </h2>
                <h2 className="err-pg-message">
                    The page you are looking for does not exist
                </h2> 
            </div>

        </ModalContainer>
    );
};

export default SignIn;
