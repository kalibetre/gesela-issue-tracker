import React, { useState } from 'react';
import {
    useCreateDepartmentMutation,
    useDeleteDepartmentMutation,
    useUpdateDepartmentMutation,
} from '../../api/departmentApi';
import { Input } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';

const DepartmentDetail = (props) => {
    const { department } = props;

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

    const handleSave = async (event) => {
        event.preventDefault();
        try {
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
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await deleteDepartment(department.uuid).unwrap();
            props.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

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
                        <button
                            className="btn btn-danger"
                            disabled={
                                updateLoading || deleteLoading || createLoading
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
                    name="dept-name"
                    id="dept-name"
                    label="Department Name"
                    value={name}
                    disabled={updateLoading || deleteLoading || createLoading}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    type="text"
                    name="dept-desc"
                    id="dept-desc"
                    label="Department Description"
                    value={description}
                    disabled={updateLoading || deleteLoading || createLoading}
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
            </Modal>
        </form>
    );
};

export default DepartmentDetail;
