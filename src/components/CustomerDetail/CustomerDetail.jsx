import React, { useState } from 'react';
import {
    useDeleteCustomerMutation,
    useUpdateCustomerMutation,
} from '../../api/customerApi';
import { Input, Option, Select } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import PasswordResetModal from '../PasswordResetModal/PasswordResetModal';

const ACCOUNT_STATUS = ['ACTIVE', 'BLOCKED', 'ARCHIVED'];

const CustomerDetail = (props) => {
    const [customer, setCustomer] = useState(props.customer);
    const [pwdResetModalOpen, setPwdResetModalOpen] = useState(false);
    const [errors, setErrors] = useState([]);

    const [updateCustomer, { isLoading: updateLoading, isError: updateError }] =
        useUpdateCustomerMutation();
    const [deleteCustomer, { isLoading: deleteLoading, isError: deleteError }] =
        useDeleteCustomerMutation();

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const result = window.confirm(
                'Are you sure you want to update this customer?'
            );
            if (result) {
                await updateCustomer({
                    uuid: customer.uuid,
                    accountStatus: customer.accountStatus,
                }).unwrap();
                props.handleClose();
            }
        } catch (error) {
            if (error.data?.message?.toLowerCase().includes('validation')) {
                setErrors(error.data.errors);
            }
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const result = window.confirm(
                'Are you sure you want to update this customer?'
            );
            if (result) {
                await deleteCustomer(customer.uuid).unwrap();
                props.handleClose();
            }
        } catch (error) {
            return;
        }
    };

    return (
        <>
            {pwdResetModalOpen && (
                <PasswordResetModal
                    userId={customer.uuid}
                    handleClose={() => setPwdResetModalOpen(false)}
                />
            )}
            <Modal
                title="Customer Detail"
                handleClose={props.handleClose}
                actions={
                    <>
                        <button
                            className="btn btn-default"
                            disabled={updateLoading || deleteLoading}
                            onClick={props.handleClose}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-danger"
                            disabled={updateLoading || deleteLoading}
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-danger"
                            disabled={updateLoading || deleteLoading}
                            onClick={() => setPwdResetModalOpen(true)}
                        >
                            Reset Password
                        </button>
                        <button
                            className="btn btn-primary"
                            disabled={updateLoading || deleteLoading}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </>
                }
            >
                <Input
                    type="text"
                    name="cus-name"
                    id="cus-name"
                    label="Name"
                    value={customer.name}
                    disabled={true}
                />
                <Input
                    type="email"
                    name="cus-name"
                    id="cus-email"
                    label="Email"
                    value={customer.email}
                    disabled={true}
                />
                <Input
                    type="text"
                    name="cus-phone"
                    id="cus-phone"
                    label="Phone"
                    value={customer.phone}
                    disabled={true}
                />
                <Select
                    id="status"
                    label="Account Status"
                    disabled={updateLoading || deleteLoading}
                    value={customer.accountStatus}
                    onChange={(event) =>
                        setCustomer((prev) => ({
                            ...prev,
                            accountStatus: event.target.value,
                        }))
                    }
                >
                    {ACCOUNT_STATUS.map((status) => (
                        <Option value={status} key={status}>
                            {status}
                        </Option>
                    ))}
                </Select>
                {updateError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to save customer. Please try again.
                    </div>
                )}
                {deleteError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to delete the customer. Please try again.
                    </div>
                )}
                {errors.length > 0 &&
                    errors.map((error, index) => (
                        <div
                            key={index}
                            className="alert alert-danger"
                            role="alert"
                        >
                            {error}
                        </div>
                    ))}
            </Modal>
        </>
    );
};

export default CustomerDetail;
