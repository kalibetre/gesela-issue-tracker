import React, { useState } from 'react';
import {
    useCreateIssueMutation,
    useUpdateIssueMutation,
} from '../../api/issueApi';
import { useGetProfileQuery } from '../../api/userApi';
import { ISSUE_STATUS, isDraft, isHandler, isOwner } from '../../utils/issue';
import {
    Input,
    Option,
    Select,
    TextArea,
} from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import './EditIssueModal.css';

const EditIssueModal = (props) => {
    const { data: currentUser } = useGetProfileQuery();
    const { disableSubmit } = props;
    const [issue, setIssue] = useState(
        props.issue ?? {
            uuid: 'new',
            title: '',
            description: '',
            status: 'DRAFT',
        }
    );

    const [createIssue, { isLoading: isCreating, isError: createError }] =
        useCreateIssueMutation();
    const [updateIssue, { isLoading: isUpdating, isError: updateError }] =
        useUpdateIssueMutation();

    const [errors, setErrors] = useState({});

    const checkValidation = () => {
        const validationErrors = {};
        if (!issue.title) {
            validationErrors.title = 'Title is required';
        }
        return validationErrors;
    };

    const handleSave = async (e, isSubmitted = false) => {
        e.preventDefault();
        try {
            const result = window.confirm(
                'Are you sure you want to save this issue?'
            );
            if (!result) return;

            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            }

            if (issue.uuid === 'new') {
                if (isSubmitted) {
                    await createIssue({
                        title: issue.title,
                        description: issue.description,
                        submitted: true,
                    }).unwrap();
                } else {
                    await createIssue({
                        title: issue.title,
                        description: issue.description,
                    }).unwrap();
                }
            } else {
                if (isHandler(issue, currentUser)) {
                    await updateIssue({
                        uuid: issue.uuid,
                        status: issue.status,
                    }).unwrap();
                } else {
                    await updateIssue({
                        uuid: issue.uuid,
                        title: issue.title,
                        description: issue.description,
                    }).unwrap();
                }
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

    const isReadOnly = () => {
        if (issue.uuid === 'new') {
            return false;
        }
        if (isOwner(issue, currentUser) && isDraft(issue)) {
            return false;
        }
        return true;
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
                    {!disableSubmit && (
                        <button
                            className="btn btn-primary"
                            disabled={isCreating || isUpdating}
                            onClick={(e) => handleSave(e, true)}
                        >
                            Save & Submit
                        </button>
                    )}
                    <button
                        className="btn btn-primary"
                        disabled={isCreating || isUpdating}
                        onClick={(e) => handleSave(e)}
                    >
                        Save
                    </button>
                </>
            }
        >
            <div className="ap-new-issue-form">
                <Input
                    type="text"
                    id="title"
                    label="Title"
                    value={issue.title}
                    onChange={(e) =>
                        setIssue((prev) => ({ ...prev, title: e.target.value }))
                    }
                    disabled={isReadOnly() || isCreating || isUpdating}
                />
                {errors.title && (
                    <div className="alert alert-danger" role="alert">
                        {errors.title}
                    </div>
                )}
                <TextArea
                    id="description"
                    label="Description"
                    value={issue.description}
                    onChange={(e) =>
                        setIssue((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    disabled={isReadOnly() || isCreating || isUpdating}
                />
                {isHandler(issue, currentUser) && (
                    <Select
                        id="status"
                        label="Issue Status"
                        value={issue.status}
                        onChange={(e) =>
                            setIssue((prev) => ({
                                ...prev,
                                status: e.target.value,
                            }))
                        }
                        disabled={isUpdating}
                    >
                        {Object.keys(ISSUE_STATUS).map((status) => (
                            <Option value={status} key={status}>
                                {ISSUE_STATUS[status]}
                            </Option>
                        ))}
                    </Select>
                )}
                {(isCreating || isUpdating) && (
                    <div className="alert alert-info" role="alert">
                        Saving your new issue ...
                    </div>
                )}
                {(createError || updateError) && (
                    <div className="alert alert-danger" role="alert">
                        Unable to save your issue. Please try again.
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default EditIssueModal;
