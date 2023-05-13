import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Issues from './components/Issues/Issues';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Notifications from './components/Notifications/Notifications';
import './css-reset.css';
import './index.css';
import store from './store/store';
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
    { path: '*', element: <NotFoundPage /> },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
