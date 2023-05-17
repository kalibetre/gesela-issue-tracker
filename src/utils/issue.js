export const isDraft = (issue) => issue && issue.status === 'DRAFT';

export const isArchived = (issue) => issue && issue.status === 'ARCHIVED';

export const isOwner = (issue, user) =>
    issue && user && issue.raisedBy.uuid === user.uuid;

export const isHandler = (issue, user) =>
    issue && user && issue.handler && issue.handler.uuid === user.uuid;

export const ISSUE_STATUS = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN PROGRESS',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED',
    CLOSED: 'CLOSED',
};
