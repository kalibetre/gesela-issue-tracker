import React, { useState } from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import {
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
} from '../../api/employeeApi';
import { useGetRolesQuery } from '../../api/userApi';
import { Input, Option, Select } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';

const EmployeeDetail = (props) => {
    const [employee, setEmployee] = useState(props.employee);
    const [password, setPassword] = useState('');
    const [rptPassword, setRptPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const [updateEmployee, { isLoading: updateLoading, isError: updateError }] =
        useUpdateEmployeeMutation();
    const [createEmployee, { isLoading: createLoading, isError: createError }] =
        useCreateEmployeeMutation();
    const [deleteEmployee, { isLoading: deleteLoading, isError: deleteError }] =
        useDeleteEmployeeMutation();

    const { data: departments } = useGetDepartmentsQuery();
    const { data: roles } = useGetRolesQuery();

    const checkValidation = () => {
        let validationErrors = [];
        if (!employee.name) {
            validationErrors = [...validationErrors, 'Name is required'];
        }
        if (!employee.email) {
            validationErrors = [...validationErrors, 'Email is required'];
        }
        if (!employee.phone) {
            validationErrors = [...validationErrors, 'Phone is required'];
        }
        if (employee.uuid === 'new' && password !== rptPassword) {
            validationErrors = [...validationErrors, 'Passwords do not match'];
        }
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return false;
        }
        return true;
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (!checkValidation()) return;
        try {
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

    return (
        <form onSubmit={(e) => e.preventDefault()}>
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
                        <button
                            className="btn btn-primary"
                            disabled={
                                updateLoading || deleteLoading || createLoading
                            }
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </>
                }
            >
                <Input
                    type="text"
                    name="emp-name"
                    id="emp-name"
                    label="Name"
                    value={employee.name}
                    disabled={updateLoading || deleteLoading || createLoading}
                    onChange={(event) =>
                        setEmployee((prev) => ({
                            ...prev,
                            name: event.target.value,
                        }))
                    }
                />
                <Input
                    type="email"
                    name="emp-name"
                    id="emp-email"
                    label="Email"
                    value={employee.email}
                    disabled={updateLoading || deleteLoading || createLoading}
                    onChange={(event) =>
                        setEmployee((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }))
                    }
                />
                <Input
                    type="text"
                    name="emp-phone"
                    id="emp-phone"
                    label="Phone"
                    value={employee.phone}
                    disabled={updateLoading || deleteLoading || createLoading}
                    onChange={(event) =>
                        setEmployee((prev) => ({
                            ...prev,
                            phone: event.target.value,
                        }))
                    }
                />
                {employee.uuid === 'new' && (
                    <>
                        <Input
                            type="password"
                            name="emp-pwd"
                            id="emp-pwd"
                            label="Password"
                            value={password}
                            disabled={
                                updateLoading || deleteLoading || createLoading
                            }
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <Input
                            type="password"
                            name="emp-rpt-pwd"
                            id="emp-rpt-pwd"
                            label="Repeat Password"
                            value={rptPassword}
                            disabled={
                                updateLoading || deleteLoading || createLoading
                            }
                            onChange={(event) =>
                                setRptPassword(event.target.value)
                            }
                        />
                    </>
                )}
                {departments && (
                    <Select
                        id="department"
                        label="Department"
                        disabled={
                            updateLoading || deleteLoading || createLoading
                        }
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
                        disabled={
                            updateLoading || deleteLoading || createLoading
                        }
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
        </form>
    );
};

export default EmployeeDetail;
