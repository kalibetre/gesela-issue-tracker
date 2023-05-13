import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/authApi';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import { authFail, authSuccess, loginStart } from '../../store/authSlice';
import FormPage from '../FormPage/FormPage';
import { Input } from '../InputControls/InputControls';
import LoadingPage from '../LoadingPage/LoadingPage';

const SignIn = () => {
    const { currentUser, loading } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(loginStart());
            const result = await login({ email, password }).unwrap();
            const { token, user } = result;
            dispatch(authSuccess({ token, user }));
            navigate('/');
        } catch (error) {
            dispatch(authFail(error));
        }
    };

    if (loading) return <LoadingPage />;

    return (
        <FormPage>
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
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    type="password"
                    placeholder=""
                    name="password"
                    id="password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div className="mdl-btn-container">
                    <Button className="btn btn-default btn-link" type="submit">
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                    <Button className="btn btn-primary">Sign In</Button>
                </div>
            </form>
        </FormPage>
    );
};

export default SignIn;
