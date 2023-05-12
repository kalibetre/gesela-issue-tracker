import React, { useState } from 'react';
import { groupByAttribute } from '../../utils/utils';
import IssueCard from '../IssueCard/IssueCard';
import IssueDetail from '../IssueDetail/IssueDetail';
import Workspace from '../Workspace/Workspace';
import './Issues.css';

const Issues = (props) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { groupBy, issues } = props;
    let groupedIssues = null;
    const ALL = 'ALL';

    if (groupBy) {
        groupedIssues = groupByAttribute(issues, groupBy);
    } else {
        groupedIssues = { ALL: issues };
    }

    const handleOnCardClick = (issue) => {
        setOpenDetail(true);
        setSelectedIssue(issue);
    };

    return (
        <Workspace title={props.title}>
            {openDetail && (
                <IssueDetail
                    issue={selectedIssue}
                    handleClose={() => setOpenDetail(false)}
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
                                {group}
                            </h2>
                            <div className="issue-list">
                                {issueGroup.map((issue) => (
                                    <IssueCard
                                        key={issue.id}
                                        issue={issue}
                                        onClick={() => handleOnCardClick(issue)}
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
