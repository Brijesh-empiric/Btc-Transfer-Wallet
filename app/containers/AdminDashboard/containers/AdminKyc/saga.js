import * as types from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, take, fork, cancel } from 'redux-saga/effects';
import {
  getKycByIdSuccess,
  getKycByIdFailure,
  getKycStatusSuccess,
  getKycStatusFailure,
  getAllKycListSuccess,
  getAllKycListFailure,
  changeKycStatusSuccess,
  changeKycStatusFailure,
  deleteKycSuccess,
  deleteKycFailure,
} from './actions';

import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* getKycStatusGenerator() {
  yield fork(
    API.get(`kyc_status`, getKycStatusSuccess, getKycStatusFailure, ''),
  );
}

function* redirectOnSuccess() {
  yield take(types.GET_ALL_KYC_LIST_SUCCESS);
}

function* getAllKycListGenerator(action) {
  const token = getToken();
  const {
    queryParams: { email, status, sort, perpage, currentpage },
  } = action;
  const successWatcher = yield fork(redirectOnSuccess);
  yield fork(
    API.get(
      `cms/get_all_kyc/?email=${email}&status=${status}&sort=${sort}&perPage=${perpage}&currentPage=${currentpage}`,
      getAllKycListSuccess,
      getAllKycListFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_ALL_KYC_LIST_FAILURE]);
  yield cancel(successWatcher);
}

function* getKycByIdGenerator(action) {
  const token = getToken();
  const { kycId } = action;
  yield fork(
    API.get(
      `cms/get_all_kyc/?kyc_id=${kycId}`,
      getKycByIdSuccess,
      getKycByIdFailure,
      token,
    ),
  );
}

function* changeKycStatusGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.post(
      `cms/change_kyc_status/`,
      changeKycStatusSuccess,
      changeKycStatusFailure,
      reqObj,
      token,
    ),
  );
}

function* deleteKycGenerator(action) {
  const token = getToken();
  const { kyc_id } = action.reqObj;
  yield fork(
    API.delete(
      `cms/change_kyc_status/`,
      deleteKycSuccess,
      deleteKycFailure,
      token,
      {
        kyc_id,
      },
    ),
  );
}

// Individual exports for testing
export default function* adminKycSaga() {
  yield takeLatest(types.DELETE_KYC_REQUEST, deleteKycGenerator);
  yield takeLatest(types.GET_KYC_BY_ID_REQUEST, getKycByIdGenerator);
  yield takeLatest(types.GET_KYC_STATUS_REQUEST, getKycStatusGenerator);
  yield takeLatest(types.GET_ALL_KYC_LIST_REQUEST, getAllKycListGenerator);
  yield takeLatest(types.CHANGE_KYC_STATUS_REQUEST, changeKycStatusGenerator);
}
