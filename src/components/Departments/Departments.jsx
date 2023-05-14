import React from 'react';
import { useGetDepartmentsQuery } from '../../api/departmentApi';
import Department from '../Department/Department';
import LoadingPage from '../LoadingPage/LoadingPage';
import Workspace from '../Workspace/Workspace';

const Departments = () => {
    const { data: departments, isLoading } = useGetDepartmentsQuery();

    if (isLoading) return <LoadingPage />;

    return (
        <Workspace title="Departments">
            {departments.map((department) => (
                <Department key={department.id} department={department} />
            ))}
        </Workspace>
    );
};

export default Departments;
