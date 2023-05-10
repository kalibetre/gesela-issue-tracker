import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import '../ModalContainer/ModalContainer.css';

const SignIn = () => {
    return (
        <ModalContainer>
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
        </ModalContainer>
    );
};

export default SignIn;
