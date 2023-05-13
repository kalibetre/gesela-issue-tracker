import React from 'react';
import FormPage from '../FormPage/FormPage';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <FormPage>
            <div className="err-pg-container">
                <h2 className="err-pg-status">404</h2>
                <h2 className="err-pg-message">
                    The page you are looking for does not exist
                </h2>
            </div>
        </FormPage>
    );
};

export default NotFoundPage;
