import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../api/userApi';
import { getInitials } from '../../utils/utils';
import Button from '../Button/Button';
import SettingsModal from '../SettingsModal/SettingsModal';
import './Avatar.css';

const Avatar = () => {
    const { data: currentUser } = useGetProfileQuery();
    const [open, setOpen] = useState(false);
    const [settingModalOpen, setSettingModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/signin');
    };

    return (
        <div className="av-container">
            {settingModalOpen && (
                <SettingsModal
                    currentUser={currentUser}
                    handleClose={() => setSettingModalOpen(false)}
                />
            )}
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
                            <div className="av-menu-action">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setSettingModalOpen(true);
                                        setOpen(false);
                                    }}
                                    className="btn btn-default"
                                >
                                    Settings
                                </Button>
                            </div>
                            <div className="av-menu-action">
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
                </div>
            )}
        </div>
    );
};

export default Avatar;
