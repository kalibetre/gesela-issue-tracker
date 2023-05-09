import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ModalContainer from '../ModalContainer/ModalContainer';
import '../ModalContainer/ModalContainer.css';

const SignIn = () => {
    return (
        <ModalContainer>
            <h2 className="s-header">
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
            <div className="s-btn-container">
                <Button className="btn btn-default">Sign Up</Button>
                <Button className="btn btn-primary">Sign In</Button>
            </div>
        </ModalContainer>
    );
};

export default SignIn;
