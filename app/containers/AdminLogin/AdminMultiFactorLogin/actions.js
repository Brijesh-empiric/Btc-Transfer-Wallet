import * as types from './constants';
import action from 'utils/action';

export const multiFactorAuthAdminLoginRequest = action(
  types.MULTI_FACTOR_AUTH_ADMIN_LOGIN_REQUEST,
  'userEmail',
  'data',
  'token',
);
export const multiFactorAuthAdminLoginSuccess = action(
  types.MULTI_FACTOR_AUTH_ADMIN_LOGIN_SUCCESS,
  'response',
);
export const multiFactorAuthAdminLoginFailure = action(
  types.MULTI_FACTOR_AUTH_ADMIN_LOGIN_FAILURE,
  'error',
);

export const clearState = action(types.CLEAR_STATE);
