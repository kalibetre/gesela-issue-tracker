export const isDraft = (issue) => issue && issue.status === 'DRAFT';

export const isArchived = (issue) => issue && issue.status === 'ARCHIVED';

export const isSubmitted = (issue) => issue && issue.status === 'SUBMITTED';

export const isOwner = (issue, user) =>
    issue && user && issue.raisedBy?.uuid === user.uuid;

export const isHandler = (issue, user) =>
    issue && user && issue.handler && issue.handler.uuid === user.uuid;

export const isManager = (user) => user && user.role === 'ISSUE_MANAGER';

export const ISSUE_STATUS = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN PROGRESS',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED',
    CLOSED: 'CLOSED',
};
