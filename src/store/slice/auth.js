import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    access_token: null,
    refresh_token: null,
    companiesUser: [],
    currentUser: undefined,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getCompaniesUser: (state) => {
            state.isLoading = true;
        },

        getCompaniesSuccess: (state, action) => {
            state.companiesUser = action.payload;
            state.isLoading = false;
        },

        requestLogin: (state) => {
            console.log('requestLogin slice');
            state.isLoading = true;
        },

        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.currentUser = action.payload;
            const userResponse = action.payload;
            console.log(`userResponse: ${JSON.stringify(userResponse, '', 4)}`);

            state.access_token = userResponse.access_token;
            state.token_type = userResponse.token_type;
            console.log('token:', state.access_token);
        },

        requestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        cleanAuthState: (state) => {
            state.error = null;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }
});

export const {
    getCompaniesUser,
    getCompaniesSuccess,
    requestLogin,
    loginSuccess,
    requestFailed,
    cleanAuthState,
    logOut
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
