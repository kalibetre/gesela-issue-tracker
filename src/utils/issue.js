export const isDraft = (issue) => issue && issue.status === 'DRAFT';

export const isSubmitted = (issue) => issue && issue.status === 'SUBMITTED';

export const isClosed = (issue) => issue && issue.status === 'CLOSED';

export const isOwner = (issue, user) =>
    issue && user && issue.raisedBy?.uuid === user.uuid;

export const isHandler = (issue, user) =>
    issue && user && issue.handler && issue.handler.uuid === user.uuid;

export const isManager = (user) => user && user.role === 'ISSUE_MANAGER';

export const ISSUE_STATUS = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN PROGRESS',
    CLOSED: 'CLOSED',
};
