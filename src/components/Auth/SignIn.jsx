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
import LoadingPage from '../LoadingPage/LoadingPage';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resetAppState = useCallback(() => {
        deleteToken();
        dispatch(geselaApi.util.resetApiState());
    }, [dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({ email, password }).unwrap();
            navigate('/');
        } catch (error) {
            resetAppState();
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        navigate('/signup');
    };

    useEffect(() => {
        resetAppState();
    }, [resetAppState]);

    if (isLoading) return <LoadingPage />;

    return (
        <FormPage>
            <div className="mdl-spinner-container">
                {isLoading && <SpinnerIcon />}
            </div>

            <h2 className="mdl-content-header">
                Login into BeranaBug Enterprise Issue Tracking System
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
                {error && (
                    <div className="alert alert-danger" role="alert">
                        SigIn failed. User name or password is incorrect.
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
