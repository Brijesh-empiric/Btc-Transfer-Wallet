/*
 *
 * EmailVerification actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const resendUserEmailVerificationRequestAction = action(
  types.RESEND_USER_EMAIL_VERIFICATION_REQUEST,
  'reqObj',
);

export const resendUserEmailVerificationSuccessAction = action(
  types.RESEND_USER_EMAIL_VERIFICATION_SUCCESS,
  'successResponse',
);

export const resendUserEmailVerificationFailureAction = action(
  types.RESEND_USER_EMAIL_VERIFICATION_FAILURE,
  'errorResponse',
);
