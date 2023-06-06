import React, { useState } from 'react';
import { useGetNotificationsQuery } from '../../api/userApi';
import { getFormattedDateTime } from '../../utils/utils';
import MessageCard from '../MessageCard/MessageCard';
import NotificationDetail from '../NotificationDetail/NotificationDetail';
import StatusMessage from '../StatusMessage/StatusMessage';
import Table from '../Table/Table';
import Workspace from '../Workspace/Workspace';
import './Notifications.css';

const Notifications = (props) => {
    const {
        data: notifications,
        isLoading,
        isError,
    } = useGetNotificationsQuery();
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handleRowClick = (notification) => {
        setSelectedNotification(notification);
    };

    const handleClose = () => {
        setSelectedNotification(null);
    };

    if (!isLoading && !isError && !notifications.length) {
        return (
            <Workspace title="Notifications">
                <MessageCard
                    title="No notifications found"
                    subtitle="There are no notifications to display."
                />
            </Workspace>
        );
    }

    const normalizeData = (notification) => {
        return {
            uuid: notification.uuid,
            date: getFormattedDateTime(notification.date),
            from: notification.fromUser.name,
            message: notification.message,
            isSeen: notification.seen,
        };
    };

    return (
        <Workspace title="Notifications">
            {selectedNotification && (
                <NotificationDetail
                    notification={selectedNotification}
                    handleClose={handleClose}
                />
            )}
            {isLoading ? (
                <StatusMessage loading title="Loading notifications ..." />
            ) : isError ? (
                <StatusMessage error title="Error notifications ..." />
            ) : (
                <div className="notifications">
                    <Table
                        data={notifications.map(normalizeData)}
                        handleRowClick={handleRowClick}
                        ignoreAttributes={{ uuid: 0, isSeen: 4 }}
                        highlightAttr="isSeen"
                        sortBy={(a, b) => new Date(b.date) - new Date(a.date)}
                    />
                </div>
            )}
        </Workspace>
    );
};

export default Notifications;
