import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../api/userApi';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const {
            data: currentUser,
            isLoading: profileLoading,
            error,
        } = useGetProfileQuery();

        const navigate = useNavigate();

        useEffect(() => {
            if ((!profileLoading && !currentUser) || error) {
                navigate('/signin');
            }
        }, [currentUser, profileLoading, error, navigate]);

        if (profileLoading) return <LoadingPage />;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
