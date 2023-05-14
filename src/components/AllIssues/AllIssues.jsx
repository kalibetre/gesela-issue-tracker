import React from 'react';
import { useGetIssuesQuery } from '../../api/issueApi';
import Issues from '../Issues/Issues';

const AllIssues = (props) => {
    const { data: issues, isLoading, error } = useGetIssuesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error...</div>;
    }

    return <Issues title="All Issues" issues={issues} {...props} />;
};

export default AllIssues;
