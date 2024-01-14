import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel } from 'redux-saga/effects';
import {
  disable2faSuccess,
  disable2faFailure,
  getCustomerDetailSuccess,
  getCustomerDetailFailure,
  deleteWatchAddressSuccess,
  deleteWatchAddressFailure,
  importWatchAddressSuccess,
  importWatchAddressFailure,
  updateCustomerStatusSuccess,
  updateCustomerStatusFailure,
  getCustomerStatusListSuccess,
  getCustomerStatusListFailure,
  createTicketForUserSuccess,
  createTicketForUserFailure,
  fetchSupportTicketCategoryForAdminSuccess,
  fetchSupportTicketCategoryForAdminFailure,
} from './actions';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess() {
  yield take(types.GET_CUSTOMER_DETAIL_SUCCESS);
}

function* getCustomerDetailGenerator(action) {
  const token = getToken();
  const { id } = action;

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.get(
      `cms/get_customer?id=${id}`,
      getCustomerDetailSuccess,
      getCustomerDetailFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_CUSTOMER_DETAIL_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnGetStatusListSuccess() {
  yield take(types.GET_CUSTOMER_STATUS_LIST_SUCCESS);
}

function* getCustomerStatusListGenerator() {
  const token = getToken();
  const successWatcher = yield fork(redirectOnGetStatusListSuccess);
  yield fork(
    API.get(
      `cms/customer-status-list`,
      getCustomerStatusListSuccess,
      getCustomerStatusListFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_CUSTOMER_STATUS_LIST_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnUpdateCustomerStatusSuccess() {
  yield take(types.UPDATE_CUSTOMER_STATUS_SUCCESS);
}

function* updateCustomerStatusGenerator(action) {
  const token = getToken();
  const { data } = action;
  const successWatcher = yield fork(redirectOnUpdateCustomerStatusSuccess);
  yield fork(
    API.post(
      `cms/customer-status-change`,
      updateCustomerStatusSuccess,
      updateCustomerStatusFailure,
      data,
      token,
      '',
    ),
  );
  yield take([LOCATION_CHANGE, types.UPDATE_CUSTOMER_STATUS_FAILURE]);
  yield cancel(successWatcher);
}

function* importWatchAddressGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.post(
      `cms/import_watch_address`,
      importWatchAddressSuccess,
      importWatchAddressFailure,
      reqObj,
      token,
      '',
    ),
  );
}

function* deleteWatchAddressGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.delete(
      `cms/import_watch_address`,
      deleteWatchAddressSuccess,
      deleteWatchAddressFailure,
      token,
      reqObj,
    ),
  );
}

function* disable2faGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.post(
      `cms/disable_user_2fa`,
      disable2faSuccess,
      disable2faFailure,
      {
        email: reqObj.email,
      },
      token,
      '',
    ),
  );
}

function* fetchSupportTicketCategoryForAdminGenerator() {
  const token = getToken();

  yield fork(
    API.get(
      `support_ticket_category`,
      fetchSupportTicketCategoryForAdminSuccess,
      fetchSupportTicketCategoryForAdminFailure,
      token,
    ),
  );
}

function* createTicketForUserGenerator(action) {
  const { reqObj } = action;
  const token = getToken();

  yield fork(
    API.post(
      `cms/create_support_ticket/`,
      createTicketForUserSuccess,
      createTicketForUserFailure,
      reqObj,
      token,
      '',
    ),
  );
}

// Individual exports for testing
export default function* customerDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.GET_CUSTOMER_DETAIL_REQUEST,
    getCustomerDetailGenerator,
  );

  yield takeLatest(
    types.GET_CUSTOMER_STATUS_LIST_REQUEST,
    getCustomerStatusListGenerator,
  );

  yield takeLatest(
    types.UPDATE_CUSTOMER_STATUS_REQUEST,
    updateCustomerStatusGenerator,
  );

  yield takeLatest(
    types.IMPORT_WATCH_ADDRESS_REQUEST,
    importWatchAddressGenerator,
  );

  yield takeLatest(types.DISABLE_2FA_REQUEST, disable2faGenerator);

  yield takeLatest(
    types.DELETE_WATCH_ADDRESS_REQUEST,
    deleteWatchAddressGenerator,
  );

  yield takeLatest(
    types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_REQUEST,
    fetchSupportTicketCategoryForAdminGenerator,
  );

  yield takeLatest(
    types.CREATE_TICKET_FOR_USER_REQUEST,
    createTicketForUserGenerator,
  );
}
