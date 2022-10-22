import { call, takeEvery, put, take } from 'redux-saga/effects';
import { fetchCompaniesUser, login } from '../../services/authService';
import { getCompaniesSuccess, requestFailed, loginSuccess } from '../slice/auth';

function* handleGetCompaniesUser(action) {
    try {
        const response = yield call(fetchCompaniesUser, action.payload.username);
        const isSuccess = response.data.success;
        if (isSuccess) {
            const companiesUser = response.data.companies;
            yield put(getCompaniesSuccess(companiesUser));
        } else {
            yield put(requestFailed(response.data?.message));
        }
    } catch (err) {
        yield put(requestFailed(err.message));
    }
}

export function* watcherCompaniesUserSaga() {
    yield takeEvery('auth/getCompaniesUser', handleGetCompaniesUser);
}

function* handleUserLogin(action) {
    try {
        console.log('handleUserLogin');
        const { username, password, mainurl } = action.payload;
        const response = yield call(login, username, password, mainurl);
        // console.log(response.data);
        yield put(loginSuccess(response.data));
    } catch (err) {
        yield put(requestFailed(err.data?.error_description));
    }
}

export function* watcherUserLoginSaga() {
    console.log('watcherUserLoginSaga');
    yield take('auth/requestLogin', handleUserLogin);
}
