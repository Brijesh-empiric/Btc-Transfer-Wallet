import React from 'react';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { takeLatest, take, put, fork, cancel } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import { setToken, setUser } from 'containers/App/actions';
// import { loginSuccess } from '../actions';
import API from 'utils/apiHelper';

function* redirectOnMultiFactorAuthAdminLoginSuccess() {
  const action = yield take(types.MULTI_FACTOR_AUTH_ADMIN_LOGIN_SUCCESS);
  const { response } = action;
  const { token, userInfo } = response.data;
  localStorage.setItem('token', token);
  yield put(setToken(token));
  yield put(setUser(userInfo));
  if (userInfo.role === 'customer') {
    yield put(push('/user/dashboard'));
  } else {
    yield put(push('/admin/dashboard/user-management/customer'));
  }
}

function* multiFactorAuthAdminLoginFlow(action) {
  const successWatcher = yield fork(redirectOnMultiFactorAuthAdminLoginSuccess);
  const dispatchData = {
    email: action.userEmail,
    otp: action.data.totp_token,
    is_admin: true,
  };
  yield fork(
    API.post(
      `multifactor_login/`,
      actions.multiFactorAuthAdminLoginSuccess,
      actions.multiFactorAuthAdminLoginFailure,
      dispatchData,
      action.token,
    ),
  );
  yield take([LOCATION_CHANGE, types.MULTI_FACTOR_AUTH_ADMIN_LOGIN_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* adminMultiFactorLoginSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.MULTI_FACTOR_AUTH_ADMIN_LOGIN_REQUEST,
    multiFactorAuthAdminLoginFlow,
  );
}
