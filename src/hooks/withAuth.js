import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../api/userApi';
import LoadingPage from '../components/LoadingPage/LoadingPage';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { data: currentUser, isLoading, isError } = useGetProfileQuery();
        const navigate = useNavigate();

        useEffect(() => {
            if (!isLoading && !currentUser) {
                navigate('/signin');
            }
        }, [currentUser, isLoading, navigate]);

        if (isLoading) return <LoadingPage />;
        if (isError) return <div>Something went wrong...</div>;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;