import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Issues from './components/Issues/Issues';
import NotFound from './components/NotFound/NotFound';
import Notifications from './components/Notifications/Notifications';
import './css-reset.css';
import './index.css';
import { ISSUES_DATA, NOTIFICATIONS } from './utils/data';
import { filterByAttribute } from './utils/utils';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '',
                element: <Issues title="All Issues" issues={ISSUES_DATA} />,
            },
        ],
    },
    { path: 'signin', element: <SignIn /> },
    { path: 'signup', element: <SignUp /> },
    {
        path: 'issues',
        element: <App />,
        children: [
            {
                path: '',
                element: (
                    <Issues
                        title="All Issues"
                        issues={ISSUES_DATA}
                        groupBy="status"
                    />
                ),
            },
            {
                path: 'draft',
                element: (
                    <Issues
                        title="Draft Issues"
                        issues={filterByAttribute(
                            ISSUES_DATA,
                            'status',
                            'DRAFT'
                        )}
                    />
                ),
            },
            {
                path: 'archived',
                element: (
                    <Issues
                        title="Archived Issues"
                        issues={filterByAttribute(
                            ISSUES_DATA,
                            'status',
                            'ARCHIVED'
                        )}
                    />
                ),
            },
            {
                path: 'closed',
                element: (
                    <Issues
                        title="Closed Issues"
                        issues={filterByAttribute(
                            ISSUES_DATA,
                            'status',
                            'CLOSED'
                        )}
                    />
                ),
            },
        ],
    },
    {
        path: 'notifications',
        element: <App />,
        children: [
            {
                path: '',
                element: <Notifications notifications={NOTIFICATIONS} />,
            },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
