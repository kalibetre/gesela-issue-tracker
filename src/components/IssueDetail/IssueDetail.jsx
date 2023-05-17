import React from 'react';
import { getStatusCSSClass } from '../../utils/utils';
import Modal from '../Modal/Modal';
import './IssueDetail.css';

const IssueDetail = (props) => {
    const { issue } = props;

    return (
        <Modal
            title="Issue Detail"
            handleClose={props.handleClose}
            actions={
                <>
                    <button
                        className="btn btn-default"
                        onClick={props.handleClose}
                    >
                        Close
                    </button>
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-primary">Save</button>
                    <button className="btn btn-primary">Submit</button>
                </>
            }
        >
            <div className="isu-detail">
                <div
                    className={
                        'isu-detail-prog ' + getStatusCSSClass(issue.status)
                    }
                >
                    {issue.status}
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
                    <p className="isu-detail-label">Department</p>
                    <p className="isu-detail-desc">{issue.department}</p>
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
            </div>
        </Modal>
    );
};

export default IssueDetail;
