import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import Button from '../Button/Button';
import './Avatar.css';

const Avatar = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getInitials = (name) => {
        const parts = name.split(' ');
        return parts[0].charAt(0) + (parts[1] ? parts[1].charAt(0) : '');
    };

    const handleLogout = (event) => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <div className="av-container">
            <div className="av-initial" onClick={() => setOpen(!open)}>
                {currentUser ? getInitials(currentUser.name) : ''}
            </div>
            {open && (
                <div className="av-menu-overlay" onClick={() => setOpen(false)}>
                    <div
                        className="av-menu"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>{currentUser ? currentUser.name : ''}</h3>
                        <p>{currentUser ? currentUser.email : ''}</p>
                        <div className="av-menu-actions">
                            <Button
                                type="button"
                                onClick={handleLogout}
                                className="btn btn-default"
                            >
                                LogOut
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
