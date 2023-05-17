import React, { useState } from 'react';
import { useCreateIssueMutation } from '../../api/issueApi';
import { Input, TextArea } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import './NewIssueModal.css';

const NewIssueModal = (props) => {
    const [createIssue, { isLoading, isError }] = useCreateIssueMutation();
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const checkValidation = () => {
        const validationErrors = {};
        if (!title) {
            validationErrors.title = 'Title is required';
        }
        return validationErrors;
    };

    const handleSave = async (e, isSubmitted = false) => {
        e.preventDefault();
        try {
            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            }

            if (isSubmitted) {
                await createIssue({
                    title,
                    description,
                    submitted: true,
                }).unwrap();
            } else {
                await createIssue({
                    title,
                    description,
                }).unwrap();
            }
            props.handleClose();
        } catch (error) {
            setErrors({
                ...errors,
                server: error.data
                    ? error.data.errors
                    : 'Error creating the issue',
            });
        }
    };

    return (
        <Modal
            title="Edit Issue"
            handleClose={props.handleClose}
            actions={
                <>
                    <button
                        className="btn btn-default"
                        onClick={props.handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={(e) => handleSave(e, true)}
                    >
                        Save & Submit
                    </button>
                    <button
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={(e) => handleSave(e)}
                    >
                        Save as Draft
                    </button>
                </>
            }
        >
            <div className="ap-new-issue-form">
                <Input
                    type="text"
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                    <div className="alert alert-danger" role="alert">
                        {errors.title}
                    </div>
                )}
                <TextArea
                    id="description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {isLoading && (
                    <div className="alert alert-danger" role="alert">
                        Saving your new issue ... CHANGE STYLE !!!!
                    </div>
                )}
                {isError && (
                    <div className="alert alert-danger" role="alert">
                        Unable to create your issue. Please try again.
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default NewIssueModal;
