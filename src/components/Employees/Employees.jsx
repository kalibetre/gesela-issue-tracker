import React, { useState } from 'react';
import { useGetEmployeesQuery } from '../../api/employeeApi';
import { useGetProfileQuery } from '../../api/userApi';
import '../Common/Cards.css';
import Employee from '../Employee/Employee';
import EmployeeDetail from '../EmployeeDetail/EmployeeDetail';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';

const Employees = () => {
    const { data: currentUser } = useGetProfileQuery();
    const { data: employees, isLoading, isError } = useGetEmployeesQuery();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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
                    <div className="card-list">
                        {employees &&
                            employees.map((employee) => (
                                <Employee
                                    key={employee.uuid}
                                    employee={employee}
                                    onClick={() =>
                                        setSelectedEmployee(employee)
                                    }
                                />
                            ))}
                        {isAdmin && (
                            <Employee actionCard onClick={handleNewEmployee} />
                        )}
                    </div>
                </div>
            )}
        </Workspace>
    );
};

export default Employees;
