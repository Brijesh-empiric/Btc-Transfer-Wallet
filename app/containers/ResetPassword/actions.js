/*
 *
 * ResetPassword actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const validateTokenRequest = action(
  types.VALIDATE_TOKEN_REQUEST,
  'data',
);
export const validateTokenSuccess = action(
  types.VALIDATE_TOKEN_SUCCESS,
  'response',
);
export const validateTokenFailure = action(
  types.VALIDATE_TOKEN_FAILURE,
  'error',
);

export const resetPasswordRequest = action(
  types.RESET_PASSWORD_REQUEST,
  'data',
);
export const resetPasswordSuccess = action(
  types.RESET_PASSWORD_SUCCESS,
  'response',
);
export const resetPasswordFailure = action(
  types.RESET_PASSWORD_FAILURE,
  'error',
);
