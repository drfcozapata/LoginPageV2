import { all } from 'redux-saga/effects';
import { watcherCompaniesUserSaga, watcherUserLoginSaga } from './auth';

export default function* rootSaga() {
    yield all([watcherCompaniesUserSaga(), watcherUserLoginSaga()]);
}
