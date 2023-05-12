import React, { useState } from 'react';
import NotificationDetail from '../NotificationDetail/NotificationDetail';
import Table from '../Table/Table';
import Workspace from '../Workspace/Workspace';
import './Notifications.css';

const Notifications = (props) => {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const { notifications } = props;

    const handleRowClick = (notification) => {
        setSelectedNotification(notification);
    };

    const handleClose = () => {
        setSelectedNotification(null);
    };

    if (!notifications.length) {
        return (
            <Workspace title="Notifications">
                <div className="notifications">
                    <p>No notifications</p>
                </div>
            </Workspace>
        );
    }

    return (
        <Workspace title="Notifications">
            {selectedNotification && (
                <NotificationDetail
                    notification={selectedNotification}
                    handleClose={handleClose}
                />
            )}
            <div className="notifications">
                <Table
                    data={notifications}
                    handleRowClick={handleRowClick}
                    ignoreAttributes={{ id: 0, isRead: 4 }}
                    highlightAttr="isRead"
                />
            </div>
        </Workspace>
    );
};

export default Notifications;
