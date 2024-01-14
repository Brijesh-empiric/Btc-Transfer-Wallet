import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel, put } from 'redux-saga/effects';

import {
  recoverAddressSuccess,
  recoverAddressFailure,
  updateAddressBalanceSuccess,
  updateAddressBalanceFailure,
  fetchAllDeletedAddressSuccess,
  fetchAllDeletedAddressFailure,
} from './actions';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* fetchAllDeletedAddressGenerator(action) {
  const token = getToken();
  const {
    queryParams: { address, perpage, currentpage, sort, email },
  } = action;
  yield fork(
    API.get(
      `cms/deleted_address/?address=${address}&email=${email}&perPage=${perpage}&currentPage=${currentpage}&sort=${sort}`,
      fetchAllDeletedAddressSuccess,
      fetchAllDeletedAddressFailure,
      token,
    ),
  );
}

function* recoverAddressGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.put(
      `cms/deleted_address/?address=${reqObj.address}`,
      recoverAddressSuccess,
      recoverAddressFailure,
      { email: reqObj.email },
      token,
    ),
  );
}

function* updateAddressBalanceGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.put(
      `cms/update_address_balance/?address=${reqObj.address}`,
      updateAddressBalanceSuccess,
      updateAddressBalanceFailure,
      {},
      token,
    ),
  );
}

// Individual exports for testing
export default function* addressManagementSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.FETCH_ALL_DELETED_ADDRESS_REQUEST,
    fetchAllDeletedAddressGenerator,
  );
  yield takeLatest(types.RECOVER_ADDRESS_REQUEST, recoverAddressGenerator);
  yield takeLatest(
    types.UPDATE_ADDRESS_BALANCE_REQUEST,
    updateAddressBalanceGenerator,
  );
}
