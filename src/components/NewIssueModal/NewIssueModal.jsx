import React from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import {
    Input,
    Option,
    Select,
    TextArea,
} from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import './NewIssueModal.css';

const NewIssueModal = (props) => {
    const { data: departments } = useGetDepartmentsQuery();

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
                        Cancel
                    </button>
                    <button className="btn btn-primary">Submit</button>
                    <button className="btn btn-primary">Save</button>
                </>
            }
        >
            <div className="ap-new-issue-form">
                <Input type="text" id="title" label="Title" />
                <TextArea id="description" label="Description" />
                {departments && (
                    <Select id="department" label="Department">
                        {departments.map((dept) => (
                            <Option key={dept.uuid} value={dept.uuid}>
                                {dept.name}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
        </Modal>
    );
};

export default NewIssueModal;
