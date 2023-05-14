import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import FormPage from '../FormPage/FormPage';
import { Input } from '../InputControls/InputControls';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();
        navigate('/signin');
    };

    return (
        <FormPage>
            <h2 className="mdl-content-header">
                Sign Up to get access to BeranaBug Enterprise Issue Tracking
                System
            </h2>
            <Input type="text" name="fname" id="fname" label="Full Name" />
            <Input type="email" name="email" id="email" label="Email" />
            <Input type="text" name="phone" id="phone" label="Phone" />
            <Input
                type="password"
                placeholder=""
                name="password"
                id="password"
                label="Password"
            />
            <Input
                type="password"
                placeholder=""
                name="rpt-password"
                id="rpt-password"
                label="Repeat Password"
            />
            <div className="mdl-btn-container">
                <Button
                    className="btn btn-default btn-link"
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
                <Button className="btn btn-primary">Sign Up</Button>
            </div>
        </FormPage>
    );
};

export default SignUp;
