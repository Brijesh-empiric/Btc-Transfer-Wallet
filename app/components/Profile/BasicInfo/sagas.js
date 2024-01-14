import { takeLatest, take, fork, cancel, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from './constants';
import {
  updateBasicInfoSuccess,
  updateBasicInfoFailure,
  getKycInfoSuccess,
  getKycInfoFailure,
  fetchDocumentTypeSuccess,
  fetchDocumentTypeFailure,
} from './actions';
import { updateUserInfo } from 'containers/Login/actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* redirectOnSuccess(user) {
  const action = yield take(types.UPDATE_BASIC_INFO_SUCCESS);
  const updatedUser = { ...user, ...action.response.data };
  yield put(updateUserInfo(updatedUser));
}

function* confirmBasicInfoUpdateFlow(action) {
  const { image, user } = action;
  const token = getToken();
  const successWatcher = yield fork(redirectOnSuccess, action.user);
  yield fork(
    API.multipartPostWithKycDoc(
      `upload_kyc/`,
      updateBasicInfoSuccess,
      updateBasicInfoFailure,
      user,
      image.identification_verification_front,
      image.identification_verification_back,
      image.hand_held_identification,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.UPDATE_BASIC_INFO_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnGetKycInfoSuccess() {
  yield take(types.GET_KYC_INFO_SUCCESS);
}

function* getKycInfoSagaGenerator(action) {
  const { data } = action;
  const token = getToken();
  const successWatcher = yield fork(redirectOnGetKycInfoSuccess);
  yield fork(
    API.get(`get_user_kyc/`, getKycInfoSuccess, getKycInfoFailure, token),
  );
  yield take([LOCATION_CHANGE, types.GET_KYC_INFO_FAILURE]);
  yield cancel(successWatcher);
}

function* documentTypeGenerator() {
  yield fork(
    API.get(
      `kyc_docs_type/`,
      fetchDocumentTypeSuccess,
      fetchDocumentTypeFailure,
      '',
    ),
  );
}

export default function* profileBasicInfoUpdateWatcher() {
  yield takeLatest(types.GET_KYC_INFO_REQUEST, getKycInfoSagaGenerator);
  yield takeLatest(types.FETCH_DOCUMENT_TYPE_REQUEST, documentTypeGenerator);
  yield takeLatest(types.UPDATE_BASIC_INFO_REQUEST, confirmBasicInfoUpdateFlow);
}
