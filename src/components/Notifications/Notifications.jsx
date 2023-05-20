import React, { useState } from 'react';
import NotificationDetail from '../NotificationDetail/NotificationDetail';
import Table from '../Table/Table';
import Workspace from '../Workspace/Workspace';
import './Notifications.css';
import MessageCard from '../MessageCard/MessageCard';

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
                <MessageCard
                    title="No notifications found"
                    subtitle="There are no notifications to display."
                />
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
