import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel, call } from 'redux-saga/effects';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import * as types from './constants';
import * as actions from './actions';

function* fetchAllAdminNotifcationGenerator(action) {
  console.log(action, 'saga admin dashboard');
  const token = getToken();
  const {
    queryParams: { perPage, currentPage },
  } = action;
  yield fork(
    API.get(
      `cms/get_admin_notifications?perPage=${perPage}&currentPage=${currentPage}`,
      actions.fetchAllAdminNotificationSuccessAction,
      actions.fetchAllAdminNotificationFailureAction,
      token,
    ),
  );
}

function* seenAdminNotificationGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  console.log(reqObj);
  yield fork(
    API.post(
      `notification_mark_as_read/`,
      actions.seenAdminNotificationSuccessAction,
      actions.seenAdminNotificationFailureAction,
      {
        id: reqObj.notificationId,
      },
      token,
    ),
  );
}

function* deleteAdminNotificationGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  console.log(reqObj);
  yield fork(
    API.post(
      `notification_delete/`,
      actions.deleteAdminNotificationSuccessAction,
      actions.deleteAdminNotificationFailureAction,
      {
        id: reqObj.notificationId,
      },
      token,
    ),
  );
}

export default function* adminDashboardSaga() {
  yield takeLatest(
    types.FETCH_ALL_ADMIN_NOTIFICATION_REQUEST,
    fetchAllAdminNotifcationGenerator,
  );
  yield takeLatest(
    types.SEEN_ADMIN_NOTIFICATION_REQUEST,
    seenAdminNotificationGenerator,
  );
  yield takeLatest(
    types.SEE_MORE_ADMIN_NOTIFICATION_REQUEST,
    fetchAllAdminNotifcationGenerator,
  );
  yield takeLatest(
    types.DELETE_ADMIN_NOTIFICATION_REQUEST,
    deleteAdminNotificationGenerator,
  );
}
