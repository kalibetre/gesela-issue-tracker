import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import FormPage from '../FormPage/FormPage';
import { Input } from '../InputControls/InputControls';

const SignIn = () => {
    return (
        <FormPage>
            <h2 className="mdl-content-header">
                Login into BeranaBug Enterprise Issue Tracking System
            </h2>
            <Input type="email" name="email" id="email" label="Email" />
            <Input
                type="password"
                placeholder=""
                name="password"
                id="password"
                label="Password"
            />
            <div className="mdl-btn-container">
                <Button className="btn btn-default btn-link">
                    <Link to="/signup">Sign Up</Link>
                </Button>
                <Button className="btn btn-primary">Sign In</Button>
            </div>
        </FormPage>
    );
};

export default SignIn;
