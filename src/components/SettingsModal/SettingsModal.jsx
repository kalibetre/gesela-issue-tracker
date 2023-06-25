import React, { useState } from 'react';
import { useUpdateProfileMutation } from '../../api/userApi';
import { isEmailValid, isPhoneNumberValid } from '../../utils/utils';
import { SpinnerIcon } from '../Common/Icons';
import { Input } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import ChangePasswordModal from './ChangePasswordModal';

const SettingsModal = (props) => {
    const { currentUser } = props;
    const [name, setFullName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const [errors, setErrors] = useState({});
    const [changePwdModalOpen, setChangePwdModalOpen] = useState(false);
    const [updateProfile, { isLoading, isError, isSuccess }] =
        useUpdateProfileMutation();

    const checkValidation = () => {
        const validationErrors = {};
        if (!name) {
            validationErrors.name = 'Name is required';
        }
        if (!isEmailValid(email)) {
            validationErrors.email = 'Valid Email is required';
        }
        if (!isPhoneNumberValid(phone)) {
            validationErrors.phone = 'Valid ETH (+251) Phone is required';
        }
        return validationErrors;
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const result = window.confirm(
                'Are you sure you want to update your profile?'
            );
            if (!result) return;
            setErrors({});
            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            }
            await updateProfile({
                name: name.trim(),
                email: email.trim(),
                phone,
            }).unwrap();
        } catch (error) {
            setErrors({
                server: error.data.errors,
            });
        }
    };

    return (
        <>
            {changePwdModalOpen && (
                <ChangePasswordModal
                    handleClose={() => setChangePwdModalOpen(false)}
                />
            )}
            <Modal
                title="Settings"
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
                            className="btn btn-default"
                            onClick={() => setChangePwdModalOpen(true)}
                            disabled={isLoading}
                        >
                            Change Password
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => handleSave(e)}
                            disabled={isLoading}
                        >
                            Save
                        </button>
                    </>
                }
            >
                <div className="mdl-spinner-container">
                    {isLoading && <SpinnerIcon />}
                </div>

                <Input
                    type="text"
                    name="fname"
                    id="fname"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                />
                {errors && errors.name && (
                    <div className="alert alert-danger" role="alert">
                        {errors.name}
                    </div>
                )}
                <Input
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                {errors && errors.email && (
                    <div className="alert alert-danger" role="alert">
                        {errors.email}
                    </div>
                )}
                <Input
                    type="text"
                    name="phone"
                    id="phone"
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.trim())}
                    disabled={isLoading}
                />
                {errors && errors.phone && (
                    <div className="alert alert-danger" role="alert">
                        {errors.phone}
                    </div>
                )}
                {isError && (
                    <div className="alert alert-danger" role="alert">
                        Update failed. Please try again!.
                    </div>
                )}
                {errors &&
                    errors.server &&
                    errors.server.map((error, idx) => (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            key={idx}
                        >
                            {error}
                        </div>
                    ))}
                {isSuccess && (
                    <div className="alert alert-success" role="alert">
                        Profile updated successfully
                    </div>
                )}
            </Modal>
        </>
    );
};

export default SettingsModal;
