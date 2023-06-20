import React, { useState } from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import {
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
} from '../../api/employeeApi';
import { useGetProfileQuery, useGetRolesQuery } from '../../api/userApi';
import { Input, Option, Select } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import PasswordResetModal from '../PasswordResetModal/PasswordResetModal';

const EmployeeDetail = (props) => {
    const { data: currentUser } = useGetProfileQuery();
    const [employee, setEmployee] = useState(props.employee);
    const [password, setPassword] = useState('');
    const [rptPassword, setRptPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [pwdResetModalOpen, setPwdResetModalOpen] = useState(false);

    const [updateEmployee, { isLoading: updateLoading, isError: updateError }] =
        useUpdateEmployeeMutation();
    const [createEmployee, { isLoading: createLoading, isError: createError }] =
        useCreateEmployeeMutation();
    const [deleteEmployee, { isLoading: deleteLoading, isError: deleteError }] =
        useDeleteEmployeeMutation();

    const { data: departments } = useGetDepartmentsQuery();
    const { data: roles } = useGetRolesQuery();

    const checkValidation = () => {
        const validationErrors = {};
        if (!employee.name) {
            validationErrors.name = 'Name is required';
        }
        if (!employee.email) {
            validationErrors.email = 'Email is required';
        }
        if (!employee.phone) {
            validationErrors.phone = 'Phone is required';
        }
        if (employee.uuid === 'new' && !password) {
            validationErrors.password = 'Password is required';
        }
        if (employee.uuid === 'new' && password !== rptPassword) {
            validationErrors.rptpassword = 'Passwords do not match';
        }
        return validationErrors;
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            }
            if (employee.uuid === 'new') {
                if (!employee.department.uuid) {
                    employee.department.uuid = departments[0].uuid;
                }
                await createEmployee({
                    name: employee.name,
                    email: employee.email,
                    phone: employee.phone,
                    password: password,
                    departmentUuid: employee.department.uuid,
                    role: employee.role,
                }).unwrap();
            } else {
                await updateEmployee({
                    uuid: employee.uuid,
                    name: employee.name,
                    email: employee.email,
                    phone: employee.phone,
                    departmentUuid: employee.department.uuid,
                    role: employee.role,
                }).unwrap();
            }
            props.handleClose();
        } catch (error) {
            if (error.data?.message?.toLowerCase().includes('validation')) {
                setErrors(error.data.errors);
            }
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await deleteEmployee(employee.uuid).unwrap();
            props.handleClose();
        } catch (error) {
            return;
        }
    };
    const isAdmin = currentUser && currentUser.role === 'ADMIN';
    const isReadOnly =
        updateLoading || deleteLoading || createLoading || !isAdmin;

    return (
        <>
            {pwdResetModalOpen && (
                <PasswordResetModal
                    userId={employee.uuid}
                    handleClose={() => setPwdResetModalOpen(false)}
                />
            )}
            <Modal
                title="Employee Detail"
                handleClose={props.handleClose}
                actions={
                    <>
                        <button
                            className="btn btn-default"
                            disabled={
                                updateLoading || deleteLoading || createLoading
                            }
                            onClick={props.handleClose}
                        >
                            Close
                        </button>
                        {isAdmin && (
                            <button
                                className="btn btn-danger"
                                disabled={
                                    updateLoading ||
                                    deleteLoading ||
                                    createLoading ||
                                    employee.uuid === 'new'
                                }
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        )}
                        {isAdmin && (
                            <>
                                <button
                                    className="btn btn-danger"
                                    disabled={
                                        updateLoading ||
                                        deleteLoading ||
                                        createLoading
                                    }
                                    onClick={() => setPwdResetModalOpen(true)}
                                >
                                    Reset Password
                                </button>
                                <button
                                    className="btn btn-primary"
                                    disabled={
                                        updateLoading ||
                                        deleteLoading ||
                                        createLoading
                                    }
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </>
                }
            >
                <Input
                    type="text"
                    name="emp-name"
                    id="emp-name"
                    label="Name"
                    value={employee.name}
                    disabled={isReadOnly}
                    onChange={(event) =>
                        setEmployee((prev) => ({
                            ...prev,
                            name: event.target.value,
                        }))
                    }
                />
                {errors.name && (
                    <div className="alert alert-danger" role="alert">
                        {errors.name}
                    </div>
                )}
                <Input
                    type="email"
                    name="emp-name"
                    id="emp-email"
                    label="Email"
                    value={employee.email}
                    disabled={isReadOnly}
                    onChange={(event) =>
                        setEmployee((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }))
                    }
                />
                {errors.email && (
                    <div className="alert alert-danger" role="alert">
                        {errors.email}
                    </div>
                )}
                <Input
                    type="text"
                    name="emp-phone"
                    id="emp-phone"
                    label="Phone"
                    value={employee.phone}
                    disabled={isReadOnly}
                    onChange={(event) =>
                        setEmployee((prev) => ({
                            ...prev,
                            phone: event.target.value,
                        }))
                    }
                />
                {errors.phone && (
                    <div className="alert alert-danger" role="alert">
                        {errors.phone}
                    </div>
                )}
                {employee.uuid === 'new' && (
                    <>
                        <Input
                            type="password"
                            name="emp-pwd"
                            id="emp-pwd"
                            label="Password"
                            value={password}
                            disabled={isReadOnly}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="alert alert-danger" role="alert">
                                {errors.password}
                            </div>
                        )}
                        <Input
                            type="password"
                            name="emp-rpt-pwd"
                            id="emp-rpt-pwd"
                            label="Repeat Password"
                            value={rptPassword}
                            disabled={isReadOnly}
                            onChange={(event) =>
                                setRptPassword(event.target.value)
                            }
                        />
                        {errors.rptPassword && (
                            <div className="alert alert-danger" role="alert">
                                {errors.rptPassword}
                            </div>
                        )}
                    </>
                )}
                {departments && (
                    <Select
                        id="department"
                        label="Department"
                        disabled={isReadOnly}
                        value={employee.department.uuid}
                        onChange={(event) =>
                            setEmployee((prev) => ({
                                ...prev,
                                department: {
                                    ...prev.department,
                                    uuid: event.target.value,
                                },
                            }))
                        }
                    >
                        {departments.map((dept) => (
                            <Option value={dept.uuid} key={dept.uuid}>
                                {dept.name}
                            </Option>
                        ))}
                    </Select>
                )}
                {roles && (
                    <Select
                        id="role"
                        label="Role"
                        disabled={isReadOnly}
                        value={employee.role}
                        onChange={(event) =>
                            setEmployee((prev) => ({
                                ...prev,
                                role: event.target.value,
                            }))
                        }
                    >
                        {roles.map((role) => (
                            <Option value={role} key={role}>
                                {role.replace('_', ' ')}
                            </Option>
                        ))}
                    </Select>
                )}
                {updateError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to save employee. Please try again.
                    </div>
                )}
                {deleteError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to delete the employee. Please try again.
                    </div>
                )}
                {createError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to create the employee. Please try again.
                    </div>
                )}
            </Modal>
        </>
    );
};

export default EmployeeDetail;
