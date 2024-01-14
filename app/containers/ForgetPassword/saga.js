import { fork, take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import API from 'utils/apiHelper';
import * as types from './constants';
import { forgetPasswordSuccess, forgetPasswordFailure } from './actions';

function* redirectOnForgetPasswordSuccess() {
  yield take(types.FORGET_PASSWORD_SUCCESS);
}

function* forgetPasswordGenerator(action) {
  const { email } = action;
  const successWatcher = yield fork(redirectOnForgetPasswordSuccess);
  yield fork(
    API.post(
      `forget-password-request`,
      forgetPasswordSuccess,
      forgetPasswordFailure,
      {
        email: email.email,
      },
      '',
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.FORGET_PASSWORD_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* forgetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.FORGET_PASSWORD_REQUEST, forgetPasswordGenerator);
}
