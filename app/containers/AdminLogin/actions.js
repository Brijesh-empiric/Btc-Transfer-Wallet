/*
 *
 * AdminLogin actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const showDialog = action(types.SHOW_DIALOG, 'payload');

export const adminLoginRequest = action(
  types.ADMIN_LOGIN_REQUEST,
  'data',
  'redirect',
);
export const adminLoginSuccess = action(
  types.ADMIN_LOGIN_SUCCESS,
  'successResponse',
);
export const adminLoginFailure = action(
  types.ADMIN_LOGIN_FAILURE,
  'errorResponse',
);

export const adminLoginClearState = action(types.ADMIN_LOGIN_CLEAR_STATE);
export const adminLoginClearMessages = action(types.ADMIN_LOGIN_CLEAR_MESSAGES);

export const updateUserInfo = action(types.UPDATE_USER_INFO, 'newInfo');
