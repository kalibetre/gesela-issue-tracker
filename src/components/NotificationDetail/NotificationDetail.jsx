import React, { useEffect } from 'react';
import { useSetNotificationAsReadMutation } from '../../api/userApi';
import Modal from '../Modal/Modal';
import './NotificationDetail.css';

const NotificationDetail = (props) => {
    const { notification } = props;
    const [setNotificationsAsRead, { isLoading, isError }] =
        useSetNotificationAsReadMutation();

    useEffect(() => {
        if (!notification.isSeen) setNotificationsAsRead(notification.uuid);
    }, [notification, setNotificationsAsRead]);

    return (
        <Modal
            title="Notification Detail"
            handleClose={props.handleClose}
            actions={
                <>
                    <button
                        className="btn btn-default"
                        onClick={props.handleClose}
                    >
                        Close
                    </button>
                </>
            }
        >
            {isLoading ? (
                <>Loading please wait...</>
            ) : isError ? (
                <>Error getting notification details please try again later.</>
            ) : (
                <div className="noti-detail">
                    <div className="noti-detail-row">
                        <p className="noti-detail-label">From</p>
                        <h3 className="noti-detail-noti-title">
                            {notification.from}
                        </h3>
                    </div>
                    <div className="noti-detail-row">
                        <p className="noti-detail-label">Date</p>
                        <h3 className="noti-detail-noti-title">
                            {notification.date}
                        </h3>
                    </div>
                    <div className="noti-detail-row">
                        <p className="noti-detail-label">Message</p>
                        <p className="noti-detail-desc">
                            {notification.message}
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default NotificationDetail;
