import React from 'react';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel, call } from 'redux-saga/effects';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import * as types from './constants';
import * as actions from './actions';

function* redirectOnResendConfirmationSuccess() {
  yield take(types.RESEND_CONFIRMATION_SUCCESS);
}

function* resendConfirmationFlow() {
  const successWatcher = yield fork(redirectOnResendConfirmationSuccess);
  yield fork(
    API.post(
      'api/user/resend-confirm-email',
      actions.resendConfirmationSuccess,
      actions.resendConfirmationFailure,
      { 'confirm-resend': '' },
      getToken(),
    ),
  );
  yield take([LOCATION_CHANGE, types.RESEND_CONFIRMATION_FAILURE]);
  yield cancel(successWatcher);
}

function* fetchAllUserNotificationGenerator(action) {
  const token = getToken();
  const {
    queryParams: { perPage, currentPage },
  } = action;
  yield fork(
    API.get(
      `get_customer_notifications?perPage=${perPage}&currentPage=${currentPage}`,
      actions.fetchAllUserNotificationSuccessAction,
      actions.fetchAllUserNotificationFailureAction,
      token,
    ),
  );
}

function* seenUserNotificationGenerator(action) {
  const token = getToken();
  const { reqObj } = action;

  yield fork(
    API.post(
      `notification_mark_as_read/`,
      actions.seenUserNotificationSuccessAction,
      actions.seenUserNotificationFailureAction,
      {
        id: reqObj.notificationId,
      },
      token,
    ),
  );
}

function* deleteUserNotificationGenerator(action) {
  const token = getToken();
  const { reqObj } = action;

  yield fork(
    API.post(
      `notification_delete/`,
      actions.deleteUserNotificationSuccessAction,
      actions.deleteUserNotificationFailureAction,
      {
        id: reqObj.notificationId,
      },
      token,
    ),
  );
}

export default function* userDashboardSaga() {
  yield takeLatest(types.RESEND_CONFIRMATION_REQUEST, resendConfirmationFlow);
  yield takeLatest(
    types.FETCH_ALL_USER_NOTIFICATION_REQUEST,
    fetchAllUserNotificationGenerator,
  );
  yield takeLatest(
    types.SEE_MORE_USER_NOTIFICATION_REQUEST,
    fetchAllUserNotificationGenerator,
  );
  yield takeLatest(
    types.SEEN_USER_NOTIFICATION_REQUEST,
    seenUserNotificationGenerator,
  );
  yield takeLatest(
    types.DELETE_USER_NOTIFICATION_REQUEST,
    deleteUserNotificationGenerator,
  );
}
