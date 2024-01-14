import {
  all,
  put,
  take,
  call,
  fork,
  cancel,
  select,
  takeLatest,
} from 'redux-saga/effects';

import Api from 'utils/apiHelper';
import * as types from './constants';
import * as actionTypes from './actions';
import { setToken, setUser } from '../App/actions';
import { push, LOCATION_CHANGE } from 'react-router-redux';

function* redirectOnAdminLoginSuccess() {
  const action = yield take(types.ADMIN_LOGIN_SUCCESS);
  const { successResponse } = action;
  const { token, userInfo } = successResponse.data;
  if (token && userInfo && !userInfo.multi_factor_auth_enable) {
    yield all([
      put(setToken(token)),
      put(setUser(userInfo)),
      put(push('/admin/dashboard/user-management/customer')),
    ]);
  }
}

function* adminLoginGenerator(action) {
  const successWatcher = yield fork(
    redirectOnAdminLoginSuccess,
    action.redirect,
  );
  yield fork(
    Api.post(
      'cms/login/',
      actionTypes.adminLoginSuccess,
      actionTypes.adminLoginFailure,
      action.data,
    ),
  );
  yield take([LOCATION_CHANGE, types.ADMIN_LOGIN_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* adminLoginSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.ADMIN_LOGIN_REQUEST, adminLoginGenerator);
}
