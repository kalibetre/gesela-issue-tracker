import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/authApi';
import geselaApi from '../../api/geselaApi';
import Button from '../../components/Button/Button';
import { deleteToken } from '../../utils/utils';
import { SpinnerIcon } from '../Common/Icons';
import FormPage from '../FormPage/FormPage';
import { Input } from '../InputControls/InputControls';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resetAppState = useCallback(() => {
        deleteToken();
        dispatch(geselaApi.util.resetApiState());
    }, [dispatch]);

    const checkValidation = () => {
        const validationErrors = {};
        if (!email) {
            validationErrors.email = 'Email is required';
        }
        if (!password) {
            validationErrors.password = 'Password is required';
        }
        return validationErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let validationErrors = checkValidation();
            if (Object.keys(validationErrors).length > 0) {
                setErrors({ ...validationErrors });
                return;
            } else {
                setErrors({});
            }
            await login({ email, password }).unwrap();
            navigate('/');
        } catch (error) {
            resetAppState();
            setErrors({
                ...errors,
                server: 'Email or password incorrect. Please try again.',
            });
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        navigate('/signup');
    };

    useEffect(() => {
        resetAppState();
    }, [resetAppState]);

    return (
        <FormPage>
            <div className="mdl-spinner-container">
                {isLoading && <SpinnerIcon />}
            </div>

            <h2 className="mdl-content-header">
                Login into Gesela Enterprise Issue Tracking System
            </h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    value={email}
                    disabled={isLoading}
                    onChange={(event) => setEmail(event.target.value)}
                />
                {errors && errors.email && (
                    <div className="alert alert-danger" role="alert">
                        {errors.email}
                    </div>
                )}
                <Input
                    type="password"
                    placeholder=""
                    name="password"
                    id="password"
                    label="Password"
                    value={password}
                    disabled={isLoading}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {errors && errors.password && (
                    <div className="alert alert-danger" role="alert">
                        {errors.password}
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
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <Button className="btn btn-primary" disabled={isLoading}>
                        Sign In
                    </Button>
                </div>
            </form>
        </FormPage>
    );
};

export default SignIn;
