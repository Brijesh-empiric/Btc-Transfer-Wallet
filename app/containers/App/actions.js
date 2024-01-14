import action from 'utils/action';
import * as types from './constants';

export const showDialog = action(types.SHOW_DIALOG, 'payload');
export const setToken = action(types.SET_TOKEN, 'payload');

export const setUser = action(types.SET_USER, 'payload');

export const notUser = action(types.NOT_USER);

export const loginByTokenRequest = action(
  types.LOGIN_BY_TOKEN_REQUEST,
  'payload',
);
export const loginByTokenSuccess = action(
  types.LOGIN_BY_TOKEN_SUCCESS,
  'response',
);
export const loginByTokenFailure = action(
  types.LOGIN_BY_TOKEN_FAILURE,
  'error',
);

// export const logoutRequest = action(loginTypes.LOGOUT_REQUEST);
// export const logoutSuccess = action(loginTypes.LOGOUT_SUCCESS, 'response');
// export const logoutFailure = action(loginTypes.LOGOUT_FAILURE, 'error');

export const getBtcPriceRequest = action(
  types.GET_BTC_PRICE_REQUEST,
  'payload',
);
export const getBtcPriceSuccess = action(
  types.GET_BTC_PRICE_SUCCESS,
  'response',
);
export const getBtcPriceFailure = action(types.GET_BTC_PRICE_FAILURE, 'error');
