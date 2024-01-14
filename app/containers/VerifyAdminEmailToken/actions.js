import action from 'utils/action';
import * as types from './constants';

export const verifyAdminEmailTokenRequest = action(
  types.VERIFY_ADMIN_EMAIL_TOKEN_REQUEST,
  'token',
);
export const verifyAdminEmailTokenSuccess = action(
  types.VERIFY_ADMIN_EMAIL_TOKEN_SUCCESS,
  'successResponse',
);
export const verifyAdminEmailTokenFailure = action(
  types.VERIFY_ADMIN_EMAIL_TOKEN_FAILURE,
  'errorResponse',
);
