import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../api/authApi';
import Button from '../Button/Button';
import { SpinnerIcon } from '../Common/Icons';
import FormPage from '../FormPage/FormPage';
import { Input } from '../InputControls/InputControls';

const SignUp = () => {
    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rptPassword, setRptPassword] = useState('');
    const [errors, setErrors] = useState({});

    const [register, { isLoading, isError }] = useRegisterMutation();

    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();
        navigate('/signin');
    };

    const checkValidation = () => {
        const validationErrors = {};
        if (!name) {
            validationErrors.name = 'Name is required';
        }
        if (!email) {
            validationErrors.email = 'Email is required';
        }
        if (!phone) {
            validationErrors.phone = 'Phone is required';
        }
        if (!password) {
            validationErrors.password = 'Password is required';
        }
        if (password !== rptPassword) {
            validationErrors.rptPassword = 'Passwords do not match';
        }
        return validationErrors;
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            }
            await register({
                name,
                email,
                phone,
                password,
            }).unwrap();
            navigate('/');
        } catch (error) {
            setErrors({
                ...errors,
                server: error.data.errors,
            });
        }
    };

    return (
        <FormPage>
            <div className="mdl-spinner-container">
                {isLoading && <SpinnerIcon />}
            </div>

            <h2 className="mdl-content-header">
                Sign Up to get access to BeranaBug Enterprise Issue Tracking
                System
            </h2>
            <Input
                type="text"
                name="fname"
                id="fname"
                label="Full Name"
                value={name}
                onChange={(e) => setFullName(e.target.value)}
            />
            {errors && errors.name && (
                <div className="alert alert-danger" role="alert">
                    {errors.name}
                </div>
            )}
            <Input
                type="email"
                name="email"
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors && errors.email && (
                <div className="alert alert-danger" role="alert">
                    {errors.email}
                </div>
            )}
            <Input
                type="text"
                name="phone"
                id="phone"
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {errors && errors.phone && (
                <div className="alert alert-danger" role="alert">
                    {errors.phone}
                </div>
            )}
            <Input
                type="password"
                placeholder=""
                name="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors && errors.password && (
                <div className="alert alert-danger" role="alert">
                    {errors.password}
                </div>
            )}
            <Input
                type="password"
                placeholder=""
                name="rpt-password"
                id="rpt-password"
                label="Repeat Password"
                value={rptPassword}
                onChange={(e) => setRptPassword(e.target.value)}
            />
            {errors && errors.rptPassword && (
                <div className="alert alert-danger" role="alert">
                    {errors.rptPassword}
                </div>
            )}
            {isError && (
                <div className="alert alert-danger" role="alert">
                    Registration failed. Please try again!.
                </div>
            )}
            {errors && errors.server && (
                <div className="alert alert-danger" role="alert">
                    {errors.server}
                </div>
            )}
            <div className="mdl-btn-container">
                <Button
                    className="btn btn-default btn-link"
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
                <Button className="btn btn-primary" onClick={handleSignup}>
                    Sign Up
                </Button>
            </div>
        </FormPage>
    );
};

export default SignUp;
