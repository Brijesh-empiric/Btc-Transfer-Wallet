import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel } from 'redux-saga/effects';
import {
  getAllCustomerListSuccess,
  getAllCustomerListFailure,
} from './actions';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess() {
  yield take(types.GET_ALL_CUSTOMER_LIST_SUCCESS);
}

function* getAllCustomerListGenerator(action) {
  const { queryParams } = action;
  const token = getToken();

  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.get(
      `cms/get_all_customer?currentpage=1&perpage=10&email=pa&sort=asc&order=timestamp`,
      getAllCustomerListSuccess,
      getAllCustomerListFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_ALL_CUSTOMER_LIST_FAILURE]);
  yield cancel(successWatcher);
}
// Individual exports for testing
export default function* customerModuleSaga() {
  yield takeLatest(
    types.GET_ALL_CUSTOMER_LIST_REQUEST,
    getAllCustomerListGenerator,
  );
}
