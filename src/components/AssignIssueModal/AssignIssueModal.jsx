import React, { useState } from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import { useGetEmployeesQuery } from '../../api/employeeApi';
import { useUpdateIssueMutation } from '../../api/issueApi';
import { Option, Select } from '../InputControls/InputControls';

import Modal from '../Modal/Modal';

const AssignIssueModal = (props) => {
    const [selectedDeptUuid, setSelectedDeptUuid] = useState('');
    const [selectedEmpUuid, setSelectedEmplUuid] = useState(null);
    const [handlers, setHandlers] = useState([]);

    const { data: departments, isLoading: loadingDepts } =
        useGetDepartmentsQuery();

    const {
        data: employees,
        isLoading: loadingEmployees,
        isError: employeeLoadError,
    } = useGetEmployeesQuery();

    const [updateIssue, { isLoading, isError }] = useUpdateIssueMutation();
    const [error, setError] = useState(null);

    const handleDeptSelection = (e) => {
        setSelectedDeptUuid((_) => {
            if (employees) {
                setHandlers((_) => {
                    let handlerEmps = employees.filter(
                        (emp) =>
                            emp.role === 'ISSUE_HANDLER' &&
                            emp.department.uuid === e.target.value
                    );
                    if (handlerEmps.length > 0)
                        setSelectedEmplUuid(handlerEmps[0].uuid);
                    else setSelectedEmplUuid(null);
                    return handlerEmps;
                });
            }
            return e.target.value;
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!selectedEmpUuid) {
                setError('Please select a handler for the issue');
                return;
            }
            await updateIssue({
                uuid: props.issue.uuid,
                handlerId: selectedEmpUuid,
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
                            loadingDepts ||
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
                {departments && (
                    <Select
                        id="department"
                        label="Department"
                        value={selectedDeptUuid}
                        onChange={handleDeptSelection}
                        disabled={isLoading || loadingDepts}
                    >
                        <Option>Select a department</Option>
                        {departments &&
                            departments.map((department) => (
                                <Option
                                    value={department.uuid}
                                    key={department.uuid}
                                >
                                    {department.name}
                                </Option>
                            ))}
                    </Select>
                )}
                {selectedEmpUuid && (
                    <Select
                        id="status"
                        label="Issue Handler"
                        value={selectedEmpUuid}
                        onChange={(e) => setSelectedEmplUuid(e.target.value)}
                        disabled={isLoading || loadingDepts}
                    >
                        {handlers.map((employee) => (
                            <Option value={employee.uuid} key={employee.uuid}>
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
