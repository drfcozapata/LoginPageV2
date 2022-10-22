import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas/rootSaga';

import authReducer from './slice/auth';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export const selectCompaniesUser = (state) => state.auth.companiesUser;

export default store;
