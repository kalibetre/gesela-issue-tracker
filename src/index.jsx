import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Issues from './components/Issues/Issues';
import NotFound from './components/NotFound/NotFound';
import Workspace from './components/Workspace/Workspace';
import './css-reset.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    { path: '', element: <App />, children: [
        { path: '', element: <Issues /> },
    ] },
    { path: 'signin', element: <SignIn /> },
    { path: 'signup', element: <SignUp /> },
    {
        path: 'issues', element: <App />, children: [
            { path: '', element: <Issues /> },
            { path: 'archived', element: <Workspace title="Archived Issues" /> }, 
        ]
    },
    { path: '*', element: <NotFound /> },
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
