import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import '../Common/ErrorStyles.css';
import FormPage from '../FormPage/FormPage';

const ErrorPage = () => {
    return (
        <FormPage>
            <div className="err-pg-container">
                <h2 className="err-pg-status">Error</h2>
                <h2 className="err-pg-message">
                    Error occurred while trying to fulfil your request. Please
                    try again later.
                </h2>
                <div className="err-ph-btn-container">
                    <Button className="btn btn-primary">
                        <Link to="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        </FormPage>
    );
};

export default ErrorPage;
