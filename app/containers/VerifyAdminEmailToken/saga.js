import { LOCATION_CHANGE } from 'react-router-redux';
import { fork, take, cancel, takeLatest } from 'redux-saga/effects';

import API from 'utils/apiHelper';
import * as types from './constants';
import {
  verifyAdminEmailTokenSuccess,
  verifyAdminEmailTokenFailure,
} from './actions';

function* redirectOnTokenVerifiedSuccess() {
  yield take(types.VERIFY_ADMIN_EMAIL_TOKEN_SUCCESS);
}

function* verifyAdminEmailTokenGenerator(action) {
  const { token } = action;
  const successWatcher = yield fork(redirectOnTokenVerifiedSuccess);
  yield fork(
    API.post(
      `cms/admin-email-verify?token=${token}`,
      verifyAdminEmailTokenSuccess,
      verifyAdminEmailTokenFailure,
      {},
      '',
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_ADMIN_EMAIL_TOKEN_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* verifyAdminEmailTokenSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.VERIFY_ADMIN_EMAIL_TOKEN_REQUEST,
    verifyAdminEmailTokenGenerator,
  );
}
