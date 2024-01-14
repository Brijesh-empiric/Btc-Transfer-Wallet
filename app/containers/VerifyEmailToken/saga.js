import {
  all,
  put,
  call,
  fork,
  take,
  select,
  cancel,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import API from 'utils/apiHelper';
import * as types from './constants';
import * as actions from '../App/actions';
import { verifyEmailTokenSuccess, verifyEmailTokenFailure } from './actions';

function* redirectOnTokenVerifiedSuccess() {
  const action = yield take(types.VERIFY_EMAIL_TOKEN_SUCCESS);
  const { successResponse } = action;
  const { token, userInfo } = successResponse.data;
  // console.log('User Detail: ', { token, userInfo });
  if (token && userInfo && !userInfo.multi_factor_auth_enable) {
    yield all([
      put(actions.setUser(userInfo)),
      put(actions.setToken(token)),
      // put(push('/user/dashboard')),
    ]);
  }
}

function* verifyEmailTokenGenerator(action) {
  const { token } = action;
  const successWatcher = yield fork(redirectOnTokenVerifiedSuccess);
  yield fork(
    API.post(
      `email-verify?token=${token}`,
      verifyEmailTokenSuccess,
      verifyEmailTokenFailure,
      {},
      '',
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.VERIFY_EMAIL_TOKEN_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* verifyEmailTokenSaga() {
  yield takeLatest(types.VERIFY_EMAIL_TOKEN_REQUEST, verifyEmailTokenGenerator);
}
