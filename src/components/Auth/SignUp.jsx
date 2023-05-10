import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import ModalContainer from '../../components/ModalContainer/ModalContainer';
import '../ModalContainer/ModalContainer.css';

const SignUp = () => {
    return (
        <ModalContainer>
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
                <Button className="btn btn-default btn-link">
                    <Link to="/signin">Sign In</Link>
                </Button>
                <Button className="btn btn-primary">Sign Up</Button>
            </div>
        </ModalContainer>
    );
};

export default SignUp;
