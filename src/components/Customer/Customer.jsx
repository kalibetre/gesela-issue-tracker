import React from 'react';
import { getInitials } from '../../utils/utils';

const Customer = (props) => {
    const { customer } = props;

    return (
        <div className="emp-card" onClick={props.onClick}>
            <div className="card">
                <div className="emp-card-content">
                    <div className="emp-initial">
                        {getInitials(customer.name)}
                    </div>
                    <div className="emp-info">
                        <h3 className="emp-title">{customer.name}</h3>
                        <p className="emp-subtitle">{customer.email}</p>
                        <p className="emp-subtitle-2">{customer.phone}</p>
                        <span className="emp-role-pill">
                            {customer.accountStatus}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
