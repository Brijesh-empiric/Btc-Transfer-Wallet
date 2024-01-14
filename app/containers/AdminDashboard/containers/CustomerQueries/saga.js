import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel, put } from 'redux-saga/effects';
import {
  getAllCustomerQueriesSuccess,
  getAllCustomerQueriesFailure,
  updateResolveStatusSuccess,
  updateResolveStatusFailure,
  updateResolveStatusResponse,
  deleteCustomerQuerySuccess,
  deleteCustomerQueryFailure,
} from './actions';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess() {
  yield take(types.GET_ALL_CUSTOMER_QUERIES_SUCCESS);
}

function* getAllCustomerQueriesGenerator(action) {
  const token = getToken();
  const {
    queryParams: { email, sort, perpage, currentpage, order },
  } = action;

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.get(
      `cms/get-contact-us?currentpage=${currentpage}&perpage=${perpage}&email=${email}&resolved=&sort=${sort}&order=${order}`,
      getAllCustomerQueriesSuccess,
      getAllCustomerQueriesFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_ALL_CUSTOMER_QUERIES_FAILURE]);
  yield cancel(successWatcher);
}

function* deleteCustomerQueryGenerator(action) {
  const token = getToken();
  const { ticketId } = action.reqObj;
  yield fork(
    API.delete(
      `cms/contact-us-status-change`,
      deleteCustomerQuerySuccess,
      deleteCustomerQueryFailure,
      token,
      {
        id: ticketId,
      },
    ),
  );
}

function* redirectOnUpdateResolveStatusSuccess(data) {
  const action = yield take(types.UPDATE_RESOLVE_STATUS_SUCCESS);
  if (action.successResponse.sucess && action.successResponse.status === 200) {
    yield put(updateResolveStatusResponse(data));
  }
}

function* updateResolveStatusGenerator(action) {
  const token = getToken();
  const { data } = action;
  const successWatcher = yield fork(redirectOnUpdateResolveStatusSuccess, data);
  yield fork(
    API.post(
      `cms/contact-us-status-change`,
      updateResolveStatusSuccess,
      updateResolveStatusFailure,
      data,
      token,
      '',
    ),
  );
  yield take(LOCATION_CHANGE, types.UPDATE_RESOLVE_STATUS_FAILURE);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* customerQueriesSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.GET_ALL_CUSTOMER_QUERIES_REQUEST,
    getAllCustomerQueriesGenerator,
  );
  yield takeLatest(
    types.UPDATE_RESOLVE_STATUS_REQUEST,
    updateResolveStatusGenerator,
  );
  yield takeLatest(
    types.DELETE_CUSTOMER_QUERY_REQUEST,
    deleteCustomerQueryGenerator,
  );
}
