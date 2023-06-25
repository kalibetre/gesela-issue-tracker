import React, { useEffect, useState } from 'react';
import { useGetEmployeesQuery } from '../../api/employeeApi';
import { useGetProfileQuery } from '../../api/userApi';
import { groupByAttribute } from '../../utils/utils';
import '../Common/Cards.css';
import Employee from '../Employee/Employee';
import EmployeeDetail from '../EmployeeDetail/EmployeeDetail';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';

const Employees = (props) => {
    const { data: currentUser } = useGetProfileQuery();
    const { data: employees, isLoading, isError } = useGetEmployeesQuery();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { groupBy } = props;
    const [groupedEmployees, setGroupedIssues] = useState({});

    const handleNewEmployee = () => {
        setSelectedEmployee({
            uuid: 'new',
            name: '',
            email: '',
            phone: '',
            role: 'DEFAULT',
            department: {
                uuid: '',
                name: '',
            },
        });
    };

    const isAdmin = currentUser && currentUser.role === 'ADMIN';

    useEffect(() => {
        if (employees) setGroupedIssues(groupByAttribute(employees, groupBy));
    }, [groupBy, employees]);

    return (
        <Workspace title="Employees">
            {selectedEmployee && (
                <EmployeeDetail
                    employee={selectedEmployee}
                    handleClose={() => setSelectedEmployee(null)}
                />
            )}
            {isLoading ? (
                <StatusMessage loading title="Loading employees .." />
            ) : isError ? (
                <StatusMessage error title="Error employees .." />
            ) : (
                <div className="card-list-container">
                    {Object.keys(groupedEmployees).map((group) => {
                        const empGroup = groupedEmployees[group];
                        if (empGroup.length === 0) return null;
                        return (
                            <div key={group} className="issue-group">
                                <h2
                                    className={
                                        group !== 'ALL'
                                            ? 'issue-group-title'
                                            : 'display-none'
                                    }
                                >
                                    {group.replace('_', ' ')}
                                </h2>
                                <div className="card-list">
                                    {empGroup.map((employee) => (
                                        <Employee
                                            key={employee.uuid}
                                            employee={employee}
                                            onClick={() =>
                                                setSelectedEmployee(employee)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    {isAdmin && (
                        <div className="issue-group">
                            <h2 className="issue-group-title">New</h2>
                            <div className="card-list">
                                {isAdmin && (
                                    <Employee
                                        actionCard
                                        onClick={handleNewEmployee}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Workspace>
    );
};

export default Employees;
