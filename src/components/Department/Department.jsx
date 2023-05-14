import React from 'react';

const Department = (props) => {
    const { department } = props;
    return <div>{department.name}</div>;
};

export default Department;
