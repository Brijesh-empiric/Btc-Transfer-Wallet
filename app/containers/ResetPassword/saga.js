import { fork, take, cancel, takeLatest, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import API from 'utils/apiHelper';
import * as types from './constants';
import {
  validateTokenSuccess,
  validateTokenFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
} from './actions';

function* redirectOnValidateTokenSuccess() {
  yield take(types.VALIDATE_TOKEN_SUCCESS);
}

function* validateTokenGenerator(action) {
  const { data } = action;
  const successWatcher = yield fork(redirectOnValidateTokenSuccess);
  yield fork(
    API.post(
      `token_validation/?token=${data}`,
      validateTokenSuccess,
      validateTokenFailure,
      {},
      '',
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.VALIDATE_TOKEN_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnResetPasswordSuccess() {
  yield take(types.RESET_PASSWORD_SUCCESS);
  yield put(push('/login'));
}

function* resetPasswordGenerator(action) {
  const { data } = action;
  if (data.triggerEvent === 'forgot_password') {
    const successWatcher = yield fork(redirectOnResetPasswordSuccess);
    yield fork(
      API.post(`reset-password`, resetPasswordSuccess, resetPasswordFailure, {
        token: data.newTokenAfterValidation,
        new_password: data.password,
        confirm_password: data.confirmPassword,
      }),
    );
    yield take([LOCATION_CHANGE, types.RESET_PASSWORD_FAILURE]);
    yield cancel(successWatcher);
  }
}

// Individual exports for testing
export default function* resetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(types.VALIDATE_TOKEN_REQUEST, validateTokenGenerator);
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPasswordGenerator);
}
