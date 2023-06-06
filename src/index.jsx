import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Customers from './components/Customers/Customers';
import Departments from './components/Departments/Departments';
import Employees from './components/Employees/Employees';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Issues from './components/Issues/Issues';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Notifications from './components/Notifications/Notifications';
import Report from './components/Report/Report';
import './css-reset.css';
import './index.css';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <Issues
                        title="All Issues"
                        groupBy="status"
                        filter={(issue) => !issue.archived}
                    />
                ),
            },
        ],
    },
    { path: 'signin', element: <SignIn /> },
    { path: 'signup', element: <SignUp /> },
    {
        path: 'issues',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <Issues
                        title="All Issues"
                        groupBy="status"
                        filter={(issue) => !issue.archived}
                    />
                ),
            },
            {
                path: 'draft',
                element: (
                    <Issues
                        title="Draft Issues"
                        filter={(issue) =>
                            issue.status === 'DRAFT' && !issue.archived
                        }
                    />
                ),
            },
            {
                path: 'archived',
                element: (
                    <Issues
                        title="Archived Issues"
                        filter={(issue) => issue.archived}
                    />
                ),
            },
            {
                path: 'closed',
                element: (
                    <Issues
                        title="Closed Issues"
                        filter={(issue) =>
                            issue.status === 'CLOSED' && !issue.archived
                        }
                    />
                ),
            },
            {
                path: 'submitted',
                element: (
                    <Issues
                        title="Submitted Issues"
                        filter={(issue) => issue.status === 'SUBMITTED'}
                    />
                ),
            },
            {
                path: 'assigned',
                element: (
                    <Issues
                        title="Assigned"
                        wrappedFilter={(user) => (issue) =>
                            !issue.archived && issue.handler.uuid === user.uuid}
                    />
                ),
            },
        ],
    },
    {
        path: 'notifications',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Notifications />,
            },
        ],
    },
    {
        path: 'departments',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Departments />,
            },
        ],
    },
    {
        path: 'employees',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Employees />,
            },
        ],
    },
    {
        path: 'customers',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Customers />,
            },
        ],
    },
    {
        path: 'report',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Report />,
            },
        ],
    },
    { path: '*', element: <NotFoundPage /> },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
