import React, { useState } from 'react';
import {
    useDeleteIssueMutation,
    useUpdateIssueMutation,
} from '../../api/issueApi';
import { useGetProfileQuery } from '../../api/userApi';
import {
    isArchived,
    isDraft,
    isHandler,
    isManager,
    isOwner,
    isSubmitted,
} from '../../utils/issue';
import { getStatusCSSClass } from '../../utils/utils';
import AssignIssueModal from '../AssignIssueModal/AssignIssueModal';
import EditIssueModal from '../EditIssueModal/EditIssueModal';
import Modal from '../Modal/Modal';
import './IssueDetail.css';

const IssueDetail = (props) => {
    const { issue } = props;
    const { data: currentUser } = useGetProfileQuery();
    const [openEdit, setOpenEdit] = useState(false);
    const [openAssignIssue, setOpenAssignIssue] = useState(false);
    const [updateIssue, { isLoading: isUpdating, isError: updateError }] =
        useUpdateIssueMutation();
    const [deleteIssue, { isLoading: isDeleting, isError: deleteError }] =
        useDeleteIssueMutation();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (issue) {
                await updateIssue({
                    uuid: issue.uuid,
                    status: 'SUBMITTED',
                }).unwrap();
                props.handleClose();
            }
        } catch (e) {
            setError('Unable to submit the issue.');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            if (issue) {
                await deleteIssue(issue.uuid).unwrap();
                props.handleClose();
            }
        } catch (e) {
            setError('Unable to delete the issue');
        }
    };

    return (
        <Modal
            title="Issue Detail"
            handleClose={props.handleClose}
            actions={
                <>
                    <button
                        className="btn btn-default"
                        onClick={props.handleClose}
                        disabled={isUpdating || isDeleting}
                    >
                        Close
                    </button>
                    {isDraft(issue) && isOwner(issue, currentUser) && (
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={isUpdating || isDeleting}
                        >
                            Delete
                        </button>
                    )}
                    {isDraft(issue) && isOwner(issue, currentUser) && (
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={isUpdating || isDeleting}
                        >
                            Submit
                        </button>
                    )}
                    {((isOwner(issue, currentUser) && isDraft(issue)) ||
                        isHandler(issue, currentUser)) &&
                        !isArchived(issue) && (
                            <button
                                className="btn btn-primary"
                                onClick={(e) => setOpenEdit(true)}
                                disabled={isUpdating || isDeleting}
                            >
                                Edit
                            </button>
                        )}
                    {isManager(currentUser) && isSubmitted(issue) && (
                        <button
                            className="btn btn-primary"
                            disabled={isUpdating || isDeleting}
                            onClick={(e) => setOpenAssignIssue(true)}
                        >
                            Assign
                        </button>
                    )}
                </>
            }
        >
            {openEdit && issue && (
                <EditIssueModal
                    issue={issue}
                    handleClose={props.handleClose}
                    disableSubmit
                />
            )}
            {openAssignIssue && issue && (
                <AssignIssueModal
                    issue={issue}
                    handleClose={props.handleClose}
                />
            )}
            <div className="isu-detail">
                <div
                    className={
                        'isu-detail-prog ' + getStatusCSSClass(issue.status)
                    }
                >
                    {issue.status.replace('_', ' ')}
                </div>
                <div className="isu-detail-row">
                    <p className="isu-detail-label">Title</p>
                    <h3 className="isu-detail-issue-title">{issue.title}</h3>
                </div>
                <div className="isu-detail-row">
                    <p className="isu-detail-label">Description</p>
                    <p className="isu-detail-desc">{issue.description}</p>
                </div>
                <div className="isu-detail-row">
                    <p className="isu-detail-label">Assigned To</p>
                    <p className="isu-detail-desc">
                        {issue.handler
                            ? issue.handler.name
                            : 'Not Yet Assigned'}
                    </p>
                </div>
                <div className="isu-detail-row">
                    <p className="isu-detail-label isu-detail-label-center">
                        Notifications
                    </p>
                    <div className="isu-detail-events">
                        {issue.notifications
                            ? issue.notifications.map((notification, idx) => (
                                  <div key={idx} className="isu-notification">
                                      <div className="isu-notification-card">
                                          <span className="big-dot"></span>
                                          <span className="connect-line"></span>
                                          <div className="isu-notification-card-content">
                                              <div className="isu-notification-hdr">
                                                  <p>{notification.user}</p>
                                                  <span className="dot"></span>
                                                  <p>{notification.date}</p>
                                              </div>
                                              <div className="isu-notification-msg">
                                                  {notification.message}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
                {isUpdating && (
                    <div className="isu-detail-row">
                        <div className="alert alert-info" role="alert">
                            Saving your changes ...
                        </div>
                    </div>
                )}
                {isDeleting && (
                    <div className="isu-detail-row">
                        <div className="alert alert-info" role="alert">
                            Deleting your issue ...
                        </div>
                    </div>
                )}
                {(error || updateError || deleteError) && (
                    <div className="isu-detail-row">
                        <div className="alert alert-danger" role="alert">
                            Unable to perform the operation. Please try again.
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default IssueDetail;
