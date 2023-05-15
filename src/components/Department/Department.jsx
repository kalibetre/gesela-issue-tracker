import React from 'react';
import { truncateText } from '../../utils/utils';
import '../Common/Cards.css';
import { PlusIcon } from '../Common/Icons';
import './Department.css';

const Department = (props) => {
    const { department } = props;

    return (
        <div className="dept-card" onClick={props.onClick}>
            <div className="card">
                {props.actionCard ? (
                    <div className="action-card">
                        <div className="action-card-icon">
                            <PlusIcon />
                        </div>
                        <div className="action-card-text">
                            Add New Department
                        </div>
                    </div>
                ) : (
                    <>
                        <header className="card-header">
                            <h3 className="card-header-title">
                                {department.name}
                            </h3>
                        </header>
                        <div className="card-content">
                            <p className="card-text">
                                {truncateText(department.description, 100)}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Department;
