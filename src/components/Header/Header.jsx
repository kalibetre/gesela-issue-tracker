import React from 'react';
import { useGetProfileQuery } from '../../api/userApi';
import Avatar from '../Avatar/Avatar';
import './Header.css';

const Header = () => {
    const { data: currentUser } = useGetProfileQuery();

    return (
        <header className="hd-container">
            {currentUser && currentUser.role !== 'DEFAULT' && (
                <div className="hd-role">
                    {currentUser.role.replace('_', ' ')}
                </div>
            )}
            <div className="hd-acc">
                <Avatar />
            </div>
        </header>
    );
};

export default Header;
