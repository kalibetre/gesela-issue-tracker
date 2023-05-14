import React from 'react';
import { getFormattedDate, truncateText } from '../../utils/utils';
import './IssueCard.css';

const status_class = {
    DRAFT: 'isu-draft',
    PENDING: 'isu-pending',
    IN_PROGRESS: 'isu-in-progress',
    COMPLETED: 'isu-completed',
    ARCHIVED: 'isu-archived',
    CLOSED: 'isu-closed',
};

const get_status_class = (status) => {
    return status_class[status];
};

const IssueCard = (props) => {
    const { issue } = props;

    return (
        <div className="issue-card" onClick={props.onClick}>
            <header className="issue-card-header">
                <span>{issue.raisedBy.name}</span>
                <span className="dot"></span>
                <span>{getFormattedDate(issue.createdDate)}</span>
            </header>
            <article className="issue-card-content">
                <h3>{truncateText(issue.title, 50)}</h3>
                <p>{truncateText(issue.description, 200)}</p>
            </article>
            <footer className="issue-card-footer">
                <div
                    className={
                        'isu-card-prog ' + get_status_class(issue.status)
                    }
                >
                    {issue.status}
                </div>
            </footer>
        </div>
    );
};

export default IssueCard;
