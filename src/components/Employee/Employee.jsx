import React from 'react';
import { getInitials } from '../../utils/utils';
import { PlusIcon } from '../Common/Icons';
import './Employee.css';

const Employee = (props) => {
    const { employee } = props;

    return (
        <div className="emp-card" onClick={props.onClick}>
            <div className="card">
                {props.actionCard ? (
                    <div className="action-card">
                        <div className="action-card-icon">
                            <PlusIcon />
                        </div>
                        <div className="action-card-text">Add New Employee</div>
                    </div>
                ) : (
                    <>
                        <div className="emp-card-content">
                            <div className="emp-initial">
                                {getInitials(employee.userAccount.name)}
                            </div>
                            <div className="emp-info">
                                <h3 className="emp-title">
                                    {employee.userAccount.name}
                                </h3>
                                <p className="emp-subtitle">
                                    {employee.userAccount.email}
                                </p>
                                <p className="emp-subtitle-2">
                                    {employee.department}
                                </p>
                                <span className="emp-role-pill">
                                    {employee.userAccount.role.replace(
                                        '_',
                                        ' '
                                    )}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Employee;
