import React, { useState } from 'react';
import { useResetPasswordMutation } from '../../api/userApi';
import Modal from '../Modal/Modal';
import './PasswordResetModal.css';

const PasswordResetModal = (props) => {
    const { userId, handleClose } = props;
    const [password, setPassword] = useState('XXXXXX');
    const [error, setError] = useState(null);
    const [resetPassword, { isLoading, isError, isSuccess }] =
        useResetPasswordMutation();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            let result = window.confirm(
                'Are you sure you want to reset the users password?'
            );
            if (result) {
                let { data } = await resetPassword(userId);
                setPassword(data.password);
                setError(null);
            }
        } catch (error) {
            setError('Password reset failed');
        }
    };

    return (
        <Modal
            title="Reset Password"
            handleClose={handleClose}
            actions={
                <>
                    <button
                        className="btn btn-default"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => handleResetPassword(e)}
                        disabled={isLoading}
                    >
                        Reset
                    </button>
                </>
            }
        >
            <div className="pwd-container">
                <div className="pwd">
                    <h4 className="pwd">{password}</h4>
                </div>
                <div className="pwd-warning">
                    <p>Warning, this action can not be undone.</p>
                    <p>
                        Please don't share this password with anyone except the
                        concerned user.
                    </p>
                    <p>
                        You will not be able to view this message again so
                        please make sure save it.
                    </p>
                </div>
            </div>
            {isSuccess && (
                <div className="alert alert-success" role="alert">
                    Password rested successfully
                </div>
            )}
            {(error || isError) && (
                <div className="alert alert-danger" role="alert">
                    Password reset failed
                </div>
            )}
        </Modal>
    );
};

export default PasswordResetModal;
