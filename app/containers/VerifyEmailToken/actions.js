/*
 *
 * VerifyEmailToken actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const verifyEmailTokenRequest = action(
  types.VERIFY_EMAIL_TOKEN_REQUEST,
  'token',
);
export const verifyEmailTokenFailure = action(
  types.VERIFY_EMAIL_TOKEN_FAILURE,
  'errorResponse',
);
export const verifyEmailTokenSuccess = action(
  types.VERIFY_EMAIL_TOKEN_SUCCESS,
  'successResponse',
);
