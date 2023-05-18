import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCustomersQuery } from '../../api/customerApi';
import { useGetProfileQuery } from '../../api/userApi';
import '../Common/Cards.css';
import Customer from '../Customer/Customer';
import CustomerDetail from '../CustomerDetail/CustomerDetail';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';

const Customers = () => {
    const { data: currentUser } = useGetProfileQuery();
    const { data: customers, isLoading, isError } = useGetCustomersQuery();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const navigate = useNavigate();

    if (currentUser && currentUser.role !== 'ADMIN') {
        navigate('/');
    }

    return (
        <Workspace title="Customers">
            {selectedCustomer && (
                <CustomerDetail
                    customer={selectedCustomer}
                    handleClose={() => setSelectedCustomer(null)}
                />
            )}
            {isLoading && currentUser == null ? (
                <StatusMessage loading title="Loading customers .." />
            ) : isError ? (
                <StatusMessage error title="Error customers .." />
            ) : (
                <div className="card-list-container">
                    <div className="card-list">
                        {customers &&
                            customers.map((customer) => (
                                <Customer
                                    key={customer.uuid}
                                    customer={customer}
                                    onClick={() =>
                                        setSelectedCustomer(customer)
                                    }
                                />
                            ))}
                    </div>
                </div>
            )}
        </Workspace>
    );
};

export default Customers;
