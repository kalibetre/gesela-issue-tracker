import React, { useEffect, useMemo, useState } from 'react';
import { useGetIssuesQuery } from '../../api/issueApi';
import { useGetProfileQuery } from '../../api/userApi';
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
    const { data: currentUser } = useGetProfileQuery();
    const { groupBy, filter, wrappedFilter } = props;
    const [groupedIssues, setGroupedIssues] = useState(null);
    const filterBy = useMemo(
        () =>
            wrappedFilter
                ? wrappedFilter(currentUser)
                : filter
                ? filter
                : () => true,
        [currentUser, filter, wrappedFilter]
    );

    useEffect(() => {
        if (issues)
            setGroupedIssues(
                groupByAttribute(issues.filter(filterBy), groupBy)
            );
    }, [filterBy, groupBy, issues]);

    const count = groupedIssues
        ? Object.keys(groupedIssues).reduce((acc, group) => {
              return acc + groupedIssues[group].length;
          }, 0)
        : 0;

    const searchHandler = (term) => {
        if (issues) {
            if (term.length === 0)
                setGroupedIssues(
                    groupByAttribute(issues.filter(filterBy), groupBy)
                );
            else {
                const filterWithTerm = (issue) =>
                    filterBy(issue) &&
                    (issue.title.includes(term) ||
                        issue.description.includes(term));
                setGroupedIssues(
                    groupByAttribute(issues.filter(filterWithTerm), groupBy)
                );
            }
        }
    };

    if (count === 0) {
        return (
            <Workspace title={props.title} searchHandler={searchHandler}>
                {newIssueModalOpen && (
                    <EditIssueModal
                        handleClose={() => setNewIssueModalOpen(false)}
                    />
                )}
                <MessageCard
                    title={`No issues in this category`}
                    subtitle="There are no issues to display. Click the button below to create a new issue."
                    action={{
                        label: 'Create New Issue',
                        onClick: () => setNewIssueModalOpen(true),
                    }}
                />
            </Workspace>
        );
    }

    return (
        <Workspace title={props.title} searchHandler={searchHandler}>
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
                                        group !== 'ALL'
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
