import React, { useState } from 'react';
import { useUpdateProfileMutation } from '../../api/userApi';
import { SpinnerIcon } from '../Common/Icons';
import { Input } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';

const ChangePasswordModal = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rptPassword, setRptPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [updateProfile, { isLoading, isError, isSuccess }] =
        useUpdateProfileMutation();

    const checkValidation = () => {
        const validationErrors = {};
        if (!oldPassword) {
            validationErrors.oldPassword = 'Old Password is required';
        }
        if (!newPassword) {
            validationErrors.newPassword = 'Password is required';
        }
        if (newPassword !== rptPassword) {
            validationErrors.rptPassword = 'Passwords do not match';
        }
        return validationErrors;
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            setErrors({});
            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            }
            await updateProfile({
                oldPassword: oldPassword,
                newPassword: newPassword,
            }).unwrap();
        } catch (error) {
            setErrors({
                server: error.data.errors,
            });
        }
    };

    return (
        <Modal
            title="Change Password"
            handleClose={props.handleClose}
            actions={
                <>
                    <button
                        className="btn btn-default"
                        onClick={props.handleClose}
                        disabled={isLoading}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => handleUpdate(e)}
                        disabled={isLoading}
                    >
                        Update
                    </button>
                </>
            }
        >
            <div className="mdl-spinner-container">
                {isLoading && <SpinnerIcon />}
            </div>
            <Input
                type="password"
                placeholder=""
                name="old password"
                id="old_password"
                label="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={isLoading}
            />
            {errors && errors.oldPassword && (
                <div className="alert alert-danger" role="alert">
                    {errors.oldPassword}
                </div>
            )}
            <Input
                type="password"
                placeholder=""
                name="password"
                id="password"
                label="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
            />
            {errors && errors.newPassword && (
                <div className="alert alert-danger" role="alert">
                    {errors.newPassword}
                </div>
            )}
            <Input
                type="password"
                placeholder=""
                name="rpt-password"
                id="rpt-password"
                label="Repeat Password"
                value={rptPassword}
                onChange={(e) => setRptPassword(e.target.value)}
                disabled={isLoading}
            />
            {errors && errors.rptPassword && (
                <div className="alert alert-danger" role="alert">
                    {errors.rptPassword}
                </div>
            )}
            {isError && (
                <div className="alert alert-danger" role="alert">
                    Password update failed. Please try again!.
                </div>
            )}
            {isSuccess && (
                <div className="alert alert-success" role="alert">
                    Password updated successfully
                </div>
            )}
            {errors &&
                errors.server &&
                errors.server.map((error, idx) => (
                    <div className="alert alert-danger" role="alert" key={idx}>
                        {error}
                    </div>
                ))}
        </Modal>
    );
};

export default ChangePasswordModal;
