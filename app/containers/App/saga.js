import {
  take,
  takeLatest,
  fork,
  put,
  cancel,
  select,
  call,
  all,
} from 'redux-saga/effects';
import Api from 'utils/apiHelper';
import React from 'react';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import { delay } from 'redux-saga';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';
import * as types from './constants';
import * as actions from './actions';
import * as loginTypes from '../Login/constants';
import { makeSelectLocation, makeSelectUser } from './selectors';
import {
  checkCaptchaSuccess,
  checkCaptchaFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  loginClearState,
  loginByTokenSuccess,
  loginByTokenFailure,
} from '../Login/actions';
import MultiFactorAuth from '../Login/multi-factor-login';
import PasswordSetForm from '../Register/PasswordSetForm';
// import getRedirectUrl from 'utils/getDashboardUrl';
import { changeLocale } from '../LanguageProvider/actions';
import { DEFAULT_LOCALE } from './constants';

function* redirectOnLoginByTokenSuccess() {
  yield take(loginTypes.LOGIN_BY_TOKEN_SUCCESS);
}

// function* loginByTokenFlow(action) {
//   const successWatcher = yield fork(redirectOnLoginByTokenSuccess);
//   const { userId } = action;
//   const token = localStorage.getItem('token');
//   yield fork(
//     Api.get(
//       `user/data/${userId}`,
//       loginByTokenSuccess,
//       loginByTokenFailure,
//       token,
//     ),
//   );
//   yield take(loginTypes.LOGIN_BY_TOKEN_FAILURE);
//   yield cancel(successWatcher);
// }

const checkIfMultiFactor = response => {
  if (response.data && response.data.multi_factor_auth_enable_mobile) {
    return actions.showDialog(
      <MultiFactorAuth user_id={response.data.user_id} />,
    );
  }
  if (response.data && response.data.multi_factor_auth_enable) {
    return actions.showDialog(
      <MultiFactorAuth user_id={response.data.user_id} />,
    );
  }
  if (response.data && response.data.password_set === false) {
    return actions.showDialog(
      <PasswordSetForm
        user_id={response.data.user_id}
        email={response.data.user_email}
      />,
    );
  }
  return loginSuccess(response);
};

const checkIfPasswordNotSet = error => {
  if (error.data && error.data.password_set === false) {
    return actions.showDialog(
      <PasswordSetForm
        user_id={error.data.user_id}
        email={error.data.user_email}
      />,
    );
  }
  return loginFailure(error);
};

function* redirectOnLoginSuccess() {
  const action = yield take(loginTypes.LOGIN_SUCCESS);
  const { user } = action;
  const { token, userInfo } = user.data;
  if (token && userInfo && !userInfo.multi_factor_auth_enable) {
    localStorage.setItem('token', token);
    localStorage.setItem('2fa', userInfo.multi_factor_auth_enable);
    yield all([put(actions.setUser(userInfo)), put(actions.setToken(token))]);
    // yield put(actions.setUser(userInfo));
    // yield put(actions.setToken(token));
    if (userInfo.role === 'customer') {
      yield put(push('/user/dashboard'));
    } else {
      yield put(push('/admin/dashboard'));
    }
  }
}

function* checkCaptchaFlow() {
  // const successWatcher = yield fork(redirectOnCheckCaptchaSuccess);
  // yield fork(
  //   Api.get('user/check/captcha', checkCaptchaSuccess, checkCaptchaFailure),
  // );
  // yield take([LOCATION_CHANGE, loginTypes.CHECK_CAPTCHA_FAILURE]);
  // yield cancel(successWatcher);
}

function* redirectOnCheckCaptchaSuccess() {
  yield take(loginTypes.CHECK_CAPTCHA_SUCCESS);
}

function* loginFlow(action) {
  // {email: 'sareek007@gmail.com', password: 'Test@12345'}
  const successWatcher = yield fork(redirectOnLoginSuccess, action.redirect);
  yield fork(Api.post('login/', loginSuccess, loginFailure, action.data));
  yield take([LOCATION_CHANGE, loginTypes.LOGIN_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnLogoutSuccess() {
  yield take(loginTypes.LOGOUT_SUCCESS);
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('user_id');
  localStorage.removeItem('role');
  localStorage.removeItem('2fa');
  localStorage.removeItem('multi_factor_auth_enable');
  // localStorage.clear();
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('role');
  sessionStorage.removeItem('multi_factor_auth_enable');
  yield put(push('/'));
  yield call(delay, 5000);
  yield put(loginClearState());
}

function* logoutUser() {
  const user = yield select(makeSelectUser());
  const userRoles = user && user.get('role') ? user.get('role') : ['customer'];
  const token = userRoles.includes('superadmin')
    ? localStorage.getItem('token')
    : getToken();

  if (token === localStorage.getItem('token')) {
    const successWatcher = yield fork(redirectOnLogoutSuccess);
    yield fork(Api.delete('logout/', logoutSuccess, logoutFailure, token));
    yield take([LOCATION_CHANGE, loginTypes.LOGOUT_FAILURE]);
    yield cancel(successWatcher);
  } else {
    sessionStorage.removeItem('token');
    yield put(logoutSuccess());
    yield put(push('/'));
  }
}
function* getBtcPriceList(action) {
  yield fork(
    Api.get(
      `https://btctransferwallet.com/api/get-coins-list?currentpage=1&perpage=10&currency=usd&pricechangepercent`,
      actions.getBtcPriceSuccess,
      actions.getBtcPriceFailure,
    ),
  );
  yield take([LOCATION_CHANGE, types.GET_BTC_PRICE_FAILURE]);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(loginTypes.LOGIN_REQUEST, loginFlow);
  yield takeLatest(loginTypes.CHECK_CAPTCHA_REQUEST, checkCaptchaFlow);
  yield takeLatest(loginTypes.LOGOUT_REQUEST, logoutUser);
  yield takeLatest(types.GET_BTC_PRICE_REQUEST, getBtcPriceList);

  // yield takeLatest(loginTypes.LOGIN_BY_TOKEN_REQUEST, loginByTokenFlow);
}
