import React, { useState } from 'react';
import { useGetEmployeesQuery } from '../../api/employeeApi';
import { useUpdateIssueMutation } from '../../api/issueApi';
import { Option, Select } from '../InputControls/InputControls';
import Modal from '../Modal/Modal';

const AssignIssueModal = (props) => {
    const {
        data: employees,
        isLoading: loadingEmployees,
        isError: employeeLoadError,
    } = useGetEmployeesQuery();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [updateIssue, { isLoading, isError }] = useUpdateIssueMutation();
    const [error, setError] = useState(null);

    const handlers = employees
        ? employees.filter((emp) => emp.role === 'ISSUE_HANDLER')
        : [];

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const handler = selectedEmployee ?? employees[0];
            await updateIssue({
                uuid: props.issue.uuid,
                handlerId: handler.uuid,
            }).unwrap();
            props.handleClose();
        } catch (error) {
            setError('Error assigning the issue to the selected handler');
        }
    };

    return (
        <Modal
            title="Assign Handler"
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
                        disabled={
                            isLoading ||
                            loadingEmployees ||
                            employeeLoadError ||
                            handlers.length <= 0
                        }
                        onClick={(e) => handleSave(e)}
                    >
                        Assign
                    </button>
                </>
            }
        >
            <div className="ap-new-issue-form">
                {true && (
                    <Select
                        id="status"
                        label="Issue Status"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        disabled={isLoading}
                    >
                        {handlers.map((employee) => (
                            <Option value={employee} key={employee.uuid}>
                                {employee.name}
                            </Option>
                        ))}
                    </Select>
                )}
                {isLoading && (
                    <div className="alert alert-info" role="alert">
                        Assigning handler ...
                    </div>
                )}
                {(isError || error) && (
                    <div className="alert alert-danger" role="alert">
                        Unable to assign handler to the issue. Please try again.
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AssignIssueModal;
