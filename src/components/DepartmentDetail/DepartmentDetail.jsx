import React, { useState } from 'react';
import {
    useCreateDepartmentMutation,
    useDeleteDepartmentMutation,
    useUpdateDepartmentMutation,
} from '../../api/departmentApi';
import { useGetProfileQuery } from '../../api/userApi';
import { Input } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';

const DepartmentDetail = (props) => {
    const { data: currentUser } = useGetProfileQuery();
    const { department } = props;
    const [errors, setErrors] = useState([]);

    const [name, setName] = useState(department.name);
    const [description, setDescription] = useState(department.description);
    const [
        updateDepartment,
        { isLoading: updateLoading, isError: updateError },
    ] = useUpdateDepartmentMutation();

    const [
        deleteDepartment,
        { isLoading: deleteLoading, isError: deleteError },
    ] = useDeleteDepartmentMutation();

    const [
        createDepartment,
        { isLoading: createLoading, isError: createError },
    ] = useCreateDepartmentMutation();

    const checkValidation = () => {
        let validationErrors = [];
        if (!name) {
            validationErrors = [...validationErrors, 'Name is required'];
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
            const result = window.confirm(
                'Are you sure you want to save this department?'
            );
            if (result) {
                if (department.uuid === 'new') {
                    await createDepartment({
                        name,
                        description,
                    }).unwrap();
                } else {
                    await updateDepartment({
                        uuid: department.uuid,
                        name,
                        description,
                    }).unwrap();
                }
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
                'Are you sure you want to delete this department?'
            );
            if (result) {
                await deleteDepartment(department.uuid).unwrap();
                props.handleClose();
            }
        } catch (error) {
            return;
        }
    };

    const isAdmin = currentUser && currentUser.role === 'ADMIN';
    const isReadOnly =
        updateLoading || deleteLoading || createLoading || !isAdmin;

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Modal
                title="Department Detail"
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
                                    department.uuid === 'new'
                                }
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        )}
                        {isAdmin && (
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
                        )}
                    </>
                }
            >
                <Input
                    type="text"
                    name="dept-name"
                    id="dept-name"
                    label="Name"
                    value={name}
                    disabled={isReadOnly}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    type="text"
                    name="dept-desc"
                    id="dept-desc"
                    label="Description"
                    value={description}
                    disabled={isReadOnly}
                    onChange={(event) => setDescription(event.target.value)}
                />
                {updateError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to save department. Please try again.
                    </div>
                )}
                {deleteError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to delete the department. Please try again.
                    </div>
                )}
                {createError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to create the department. Please try again.
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

export default DepartmentDetail;
