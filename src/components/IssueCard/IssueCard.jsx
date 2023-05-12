import React from 'react';
import { truncateText } from '../../utils/utils';
import './IssueCard.css';

const status_class = {
    DRAFT: 'isu-draft',
    PENDING: 'isu-pending',
    'IN PROGRESS': 'isu-in-progress',
    COMPLETED: 'isu-completed',
};

const get_status_class = (status) => {
    return status_class[status];
};

const IssueCard = (props) => {
    const { issue } = props;

    return (
        <div className="issue-card" onClick={props.onClick}>
            <header className="issue-card-header">
                <span>{issue.user}</span>
                <span className="dot"></span>
                <span>{issue.date}</span>
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
