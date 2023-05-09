import React from 'react';
import ReactDOM from 'react-dom/client';
import SignUp from './components/Auth/SignUp';
import './css-reset.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <SignUp />
    </React.StrictMode>
);
