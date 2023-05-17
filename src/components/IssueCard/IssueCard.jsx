import React from 'react';
import {
    getFormattedDate,
    getStatusCSSClass,
    truncateText,
} from '../../utils/utils';
import '../Common/Cards.css';
import './IssueCard.css';

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
                        className={
                            'card-tag ' + getStatusCSSClass(issue.status)
                        }
                    >
                        {issue.status.replace('_', ' ')}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default IssueCard;
