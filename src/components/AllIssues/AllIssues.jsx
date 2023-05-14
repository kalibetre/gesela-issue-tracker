import React from 'react';
import { useGetIssuesQuery } from '../../api/issueApi';
import Issues from '../Issues/Issues';

const AllIssues = (props) => {
    const { data: issues, isLoading, isError } = useGetIssuesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    return <Issues title="All Issues" issues={issues} {...props} />;
};

export default AllIssues;
