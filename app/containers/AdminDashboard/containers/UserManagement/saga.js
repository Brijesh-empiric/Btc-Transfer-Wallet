import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel } from 'redux-saga/effects';
import {
  deleteAdminSuccess,
  deleteAdminFailure,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  getAllCustomerListSuccess,
  getAllCustomerListFailure,
} from './actions';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess() {
  yield take(types.GET_ALL_CUSTOMER_LIST_SUCCESS);
}

function* getAllCustomerListGenerator(action) {
  const token = getToken();
  const {
    userType,
    queryParams: { email, sort, perpage, currentpage, order },
  } = action;

  if (userType === 'customer') {
    const successWatcher = yield fork(redirectOnSuccess);
    yield fork(
      API.get(
        `cms/get_all_customer?currentpage=${currentpage}&perpage=${perpage}&email=${email}&sort=${sort}&order=${order}`,
        getAllCustomerListSuccess,
        getAllCustomerListFailure,
        token,
      ),
    );
    yield take([LOCATION_CHANGE, types.GET_ALL_CUSTOMER_LIST_FAILURE]);
    yield cancel(successWatcher);
  }

  if (userType === 'admin') {
    const successWatcher = yield fork(redirectOnSuccess);
    yield fork(
      API.get(
        `cms/get_all_admins?currentpage=${currentpage}&perpage=${perpage}&email=${email}&sort=${sort}&order=created_at`,
        getAllCustomerListSuccess,
        getAllCustomerListFailure,
        token,
      ),
    );
    yield take([LOCATION_CHANGE, types.GET_ALL_CUSTOMER_LIST_FAILURE]);
    yield cancel(successWatcher);
  }
}

function* redirectOnAdminDeleteSuccess() {
  yield take(types.DELETE_ADMIN_SUCCESS);
}

function* deleteAdminGenerator(action) {
  const token = getToken();
  const { id } = action;
  const successWatcher = yield fork(redirectOnAdminDeleteSuccess);
  yield fork(
    API.post(
      `cms/delete-admin`,
      deleteAdminSuccess,
      deleteAdminFailure,
      {
        id,
      },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.DELETE_ADMIN_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnCustomerDeleteSuccess() {
  yield take(types.DELETE_CUSTOMER_SUCCESS);
}

function* deleteCustomerGenerator(action) {
  const token = getToken();
  const { id } = action;
  const successWatcher = yield fork(redirectOnCustomerDeleteSuccess);
  yield fork(
    API.post(
      `cms/delete-customer`,
      deleteCustomerSuccess,
      deleteCustomerFailure,
      { id },
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.DELETE_ADMIN_FAILURE]);
  yield cancel(successWatcher);
}

export default function* userManagementSaga() {
  yield takeLatest(
    types.GET_ALL_CUSTOMER_LIST_REQUEST,
    getAllCustomerListGenerator,
  );
  yield takeLatest(types.DELETE_ADMIN_REQUEST, deleteAdminGenerator);
  yield takeLatest(types.DELETE_CUSTOMER_REQUEST, deleteCustomerGenerator);
}
