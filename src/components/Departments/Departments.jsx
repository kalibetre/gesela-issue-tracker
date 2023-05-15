import React from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import '../Common/Cards.css';
import Department from '../Department/Department';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';
import './Departments.css';

const Departments = () => {
    const { data: departments, isLoading, isError } = useGetDepartmentsQuery();

    const handleOnClick = (department) => {
        console.log(department);
    };

    const handleNewDepartment = () => {
        console.log('New Department');
    };

    return (
        <Workspace title="Departments">
            {isLoading ? (
                <StatusMessage loading title="Loading departments .." />
            ) : isError ? (
                <StatusMessage error title="Error departments .." />
            ) : (
                <div className="card-list-container">
                    <div className="card-list">
                        {departments &&
                            departments.map((department) => (
                                <Department
                                    key={department.uuid}
                                    department={department}
                                    onClick={() => handleOnClick(department)}
                                />
                            ))}
                        <Department actionCard onClick={handleNewDepartment} />
                    </div>
                </div>
            )}
        </Workspace>
    );
};

export default Departments;
