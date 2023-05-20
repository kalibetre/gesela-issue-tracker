import React, { useState } from 'react';
import { useGetIssuesQuery } from '../../api/issueApi';
import { groupByAttribute } from '../../utils/utils';
import '../Common/Cards.css';
import EditIssueModal from '../EditIssueModal/EditIssueModal';
import IssueCard from '../IssueCard/IssueCard';
import IssueDetail from '../IssueDetail/IssueDetail';
import MessageCard from '../MessageCard/MessageCard';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';
import './Issues.css';

const Issues = (props) => {
    const { data: issues, isLoading, isError } = useGetIssuesQuery();
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [newIssueModalOpen, setNewIssueModalOpen] = useState(false);

    const { groupBy, filter } = props;
    let groupedIssues = null;
    const ALL = 'ALL';

    if (issues && groupBy) {
        groupedIssues = groupByAttribute(issues, groupBy);
    } else {
        groupedIssues = { ALL: issues };
    }

    if (issues && filter) {
        Object.keys(groupedIssues).forEach((group) => {
            groupedIssues[group] = groupedIssues[group].filter(filter);
        });
    }

    if (groupedIssues) {
        const count = Object.keys(groupedIssues).reduce((acc, group) => {
            return acc + groupedIssues[group].length;
        }, 0);
        if (count === 0) {
            return (
                <Workspace title={props.title}>
                    {newIssueModalOpen && (
                        <EditIssueModal
                            handleClose={() => setNewIssueModalOpen(false)}
                        />
                    )}
                    <MessageCard
                        title={`No issues this category`}
                        subtitle="There are no issues to display. Click the button below to create a new issue."
                        action={{
                            label: 'Create New Issue',
                            onClick: () => setNewIssueModalOpen(true),
                        }}
                    />
                </Workspace>
            );
        }
    }

    return (
        <Workspace title={props.title}>
            {selectedIssue && (
                <IssueDetail
                    issue={selectedIssue}
                    handleClose={() => setSelectedIssue(null)}
                />
            )}
            {isLoading ? (
                <StatusMessage loading title="Loading issues ..." />
            ) : isError ? (
                <StatusMessage error title="Error issue ..." />
            ) : (
                <div className="card-list-container">
                    {Object.keys(groupedIssues).map((group) => {
                        const issueGroup = groupedIssues[group];
                        if (issueGroup.length === 0) return null;
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
                                <div className="card-list">
                                    {issueGroup.map((issue) => (
                                        <IssueCard
                                            key={issue.uuid}
                                            issue={issue}
                                            onClick={() =>
                                                setSelectedIssue(issue)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Workspace>
    );
};

export default Issues;
