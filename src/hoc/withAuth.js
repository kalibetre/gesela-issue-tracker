import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../api/userApi';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import { logout } from '../store/authSlice';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const {
            data: currentUser,
            isLoading: profileLoading,
            isError,
        } = useGetProfileQuery();
        const { token, isLoading: tokenLoading } = useSelector(
            (state) => state.auth
        );
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            if (!profileLoading && !tokenLoading && !currentUser) {
                if (token) dispatch(logout());
                navigate('/signin');
            }
        }, [
            currentUser,
            profileLoading,
            tokenLoading,
            navigate,
            token,
            dispatch,
        ]);

        if (profileLoading || tokenLoading) return <LoadingPage />;
        if (isError) return <div>Something went wrong...</div>;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
