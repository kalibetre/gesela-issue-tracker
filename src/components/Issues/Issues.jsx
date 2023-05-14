import React, { useState } from 'react';
import { groupByAttribute } from '../../utils/utils';
import IssueCard from '../IssueCard/IssueCard';
import IssueDetail from '../IssueDetail/IssueDetail';
import Workspace from '../Workspace/Workspace';
import './Issues.css';

const Issues = (props) => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { groupBy, issues } = props;
    let groupedIssues = null;
    const ALL = 'ALL';

    if (groupBy) {
        groupedIssues = groupByAttribute(issues, groupBy);
    } else {
        groupedIssues = { ALL: issues };
    }

    return (
        <Workspace title={props.title}>
            {selectedIssue && (
                <IssueDetail
                    issue={selectedIssue}
                    handleClose={() => setSelectedIssue(null)}
                />
            )}
            <div className="issue-list-container">
                {Object.keys(groupedIssues).map((group) => {
                    const issueGroup = groupedIssues[group];
                    return (
                        <div key={group} className="issue-group">
                            <h2
                                className={
                                    group !== ALL
                                        ? 'issue-group-title'
                                        : 'display-none'
                                }
                            >
                                {group.replace('_', ' ')}
                            </h2>
                            <div className="issue-list">
                                {issueGroup.map((issue) => (
                                    <IssueCard
                                        key={issue.uuid}
                                        issue={issue}
                                        onClick={() => setSelectedIssue(issue)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Workspace>
    );
};

export default Issues;
