import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';

const initialState = {
    profile: null,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(userApi.endpoints.getProfile.matchPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(
                userApi.endpoints.getProfile.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.profile = payload;
                }
            )
            .addMatcher(
                userApi.endpoints.getProfile.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(
                userApi.endpoints.updateProfile.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.updateProfile.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.profile = payload;
                }
            )
            .addMatcher(
                userApi.endpoints.updateProfile.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(userApi.endpoints.updateUser.matchPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(
                userApi.endpoints.updateUser.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.profile = payload;
                }
            )
            .addMatcher(
                userApi.endpoints.updateUser.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            )
            .addMatcher(userApi.endpoints.changeRole.matchPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(
                userApi.endpoints.changeRole.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.profile = payload;
                }
            )
            .addMatcher(
                userApi.endpoints.changeRole.matchRejected,
                (state, { error }) => {
                    state.isLoading = false;
                    state.error = error.message;
                }
            );
    },
});

export default userSlice;
