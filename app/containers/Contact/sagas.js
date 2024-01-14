import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel, call, put } from 'redux-saga/effects';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import * as types from './constants';
import {
  postCustomerQueriesSuccess,
  postCustomerQueriesFailure,
} from './actions';

function* redirectOnSuccess() {
  yield take(types.POST_CUSTOMER_QUERIES_SUCCESS);
}

function* postCustomerQueriesGenerator(action) {
  const { data } = action;
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.post(
      `contact-us`,
      postCustomerQueriesSuccess,
      postCustomerQueriesFailure,
      data,
    ),
  );
  yield take([LOCATION_CHANGE, types.POST_CUSTOMER_QUERIES_FAILURE]);
  yield cancel(successWatcher);
}

export default function* contactPageSaga() {
  yield takeLatest(
    types.POST_CUSTOMER_QUERIES_REQUEST,
    postCustomerQueriesGenerator,
  );
}
