import React from 'react';
import { getFormattedDate, truncateText } from '../../utils/utils';
import '../Common/Cards.css';
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
        <div className="issue-card">
            <div className="card" onClick={props.onClick}>
                <header className="card-header">
                    <div className="card-header-subtitle">
                        <span>{issue.raisedBy.name}</span>
                        <span className="dot"></span>
                        <span>{getFormattedDate(issue.createdDate)}</span>
                    </div>
                    <div className="card-header-title">
                        <h3>{truncateText(issue.title, 50)}</h3>
                    </div>
                </header>
                <article className="card-content">
                    <p>{truncateText(issue.description, 200)}</p>
                </article>
                <footer className="card-footer">
                    <div
                        className={'card-tag ' + get_status_class(issue.status)}
                    >
                        {issue.status}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default IssueCard;
