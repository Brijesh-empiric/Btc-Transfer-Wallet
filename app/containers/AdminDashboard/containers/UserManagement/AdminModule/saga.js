import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { createAdminSuccess, createAdminFailure } from './actions';
import { takeLatest, take, fork, cancel } from 'redux-saga/effects';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess() {
  yield take(types.CREATE_ADMIN_SUCCESS);
}

function* createAdminGenerator(action) {
  const { data } = action;
  const token = getToken();
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.post(
      `cms/new_admin/`,
      createAdminSuccess,
      createAdminFailure,
      data,
      token,
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.CREATE_ADMIN_FAILURE]);
  yield cancel(successWatcher);
}

export default function* adminModuleSaga() {
  yield takeLatest(types.CREATE_ADMIN_REQUEST, createAdminGenerator);
}
