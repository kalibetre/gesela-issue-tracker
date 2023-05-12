import React from 'react';
import {
    Input,
    Option,
    Select,
    TextArea,
} from '../InputControls/InputControls';
import Modal from '../Modal/Modal';
import './NewIssueModal.css';

const departments = ['Human Resources', 'Accounting', 'Customer Service'];

const NewIssueModal = (props) => {
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
                <Select id="department" label="Department">
                    {departments.map((department, index) => (
                        <Option key={index} value={department}>
                            {department}
                        </Option>
                    ))}
                </Select>
            </div>
        </Modal>
    );
};

export default NewIssueModal;
