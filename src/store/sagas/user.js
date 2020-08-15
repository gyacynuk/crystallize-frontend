import { call, put, delay, takeEvery, takeLatest } from 'redux-saga/effects'
import Api, { db } from '../../api'
import { FETCH_USER_ASYNC, SIGN_OUT_USER, SET_USER_PREFERRED_THEME } from '../actionTypes'
import { setTheme, setUser } from '../actions'

export function* fetchUserAsync(action) {
    try {
        const user = yield call(Api.fetchUser, db, action.payload.userId)
        yield put(setUser(user))
        yield put(setTheme(user.preferredTheme))
     } catch (error) {
        // TODO: implement
        yield put({type: "FETCH_FAILED", error})
     }
}
export function* watchFetchUserAsync() {
    yield takeEvery(FETCH_USER_ASYNC, fetchUserAsync)
}

export function* setUserPreferredTheme(action) {
    yield put(setTheme(action.payload.theme))
    yield delay(2000)
    yield call(Api.upsertUser, db, { preferredTheme: action.payload.theme }) 
}
export function* watchSetUserPreferredTheme() {
    yield takeLatest(SET_USER_PREFERRED_THEME, setUserPreferredTheme)
}

export function* signOutUser(action) {
    yield call(Api.signOutUser, action.payload.history)
    yield put(setUser(null)) 
}
export function* watchSignOutUser() {
    yield takeEvery(SIGN_OUT_USER, signOutUser)
}