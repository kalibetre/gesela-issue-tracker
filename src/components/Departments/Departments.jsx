import React, { useState } from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import { useGetProfileQuery } from '../../api/userApi';
import '../Common/Cards.css';
import Department from '../Department/Department';
import DepartmentDetail from '../DepartmentDetail/DepartmentDetail';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';

const Departments = () => {
    const { data: currentUser } = useGetProfileQuery();
    const { data: departments, isLoading, isError } = useGetDepartmentsQuery();
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleNewDepartment = () => {
        setSelectedDepartment({
            uuid: 'new',
            name: '',
            description: '',
        });
    };

    const isAdmin = currentUser && currentUser.role === 'ADMIN';

    return (
        <Workspace title="Departments">
            {selectedDepartment && (
                <DepartmentDetail
                    department={selectedDepartment}
                    handleClose={() => setSelectedDepartment(null)}
                />
            )}
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
                                    onClick={() =>
                                        setSelectedDepartment(department)
                                    }
                                />
                            ))}
                        {isAdmin && (
                            <Department
                                actionCard
                                onClick={handleNewDepartment}
                            />
                        )}
                    </div>
                </div>
            )}
        </Workspace>
    );
};

export default Departments;
