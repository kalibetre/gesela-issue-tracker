import { createSlice } from '@reduxjs/toolkit';
import { issueApi } from '../api/issueApi';

const initialState = {
    issues: [],
    currentIssue: null,
    isLoading: false,
    error: null,
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(issueApi.endpoints.getIssues.matchPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(
                issueApi.endpoints.getIssues.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.issues = payload;
                }
            )
            .addMatcher(
                issueApi.endpoints.getIssues.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(issueApi.endpoints.getIssue.matchPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(
                issueApi.endpoints.getIssue.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.currentIssue = payload;
                }
            )
            .addMatcher(
                issueApi.endpoints.getIssue.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(
                issueApi.endpoints.createIssue.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                issueApi.endpoints.createIssue.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.issues.push(payload);
                }
            )
            .addMatcher(
                issueApi.endpoints.createIssue.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(
                issueApi.endpoints.updateIssue.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                issueApi.endpoints.updateIssue.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    const index = state.issues.findIndex(
                        (issue) => issue.id === payload.id
                    );
                    if (index !== -1) {
                        state.issues[index] = payload;
                    }
                }
            )
            .addMatcher(
                issueApi.endpoints.updateIssue.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(
                issueApi.endpoints.deleteIssue.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                issueApi.endpoints.deleteIssue.matchFulfilled,
                (state, { meta: { arg } }) => {
                    state.isLoading = false;
                    state.issues = state.issues.filter(
                        (issue) => issue.id !== arg
                    );
                }
            )
            .addMatcher(
                issueApi.endpoints.deleteIssue.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            );
    },
});

export default issuesSlice;
