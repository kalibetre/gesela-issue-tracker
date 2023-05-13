import React from 'react';
import FormPage from '../FormPage/FormPage';
import './LoadingPage.css';

const LoadingPage = () => {
    return (
        <FormPage>
            <div className="ldg-pg-container">
                <h2 className="lgd-pg-message">
                    Please wait while we authenticate you...
                </h2>
            </div>
        </FormPage>
    );
};

export default LoadingPage;
