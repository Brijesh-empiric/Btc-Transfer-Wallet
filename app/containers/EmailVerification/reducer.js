/*
 *
 * EmailVerification reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  resendUserEmailVerificationSuccess: false,
  resendUserEmailVerificationFailure: false,
  resendUserEmailVerificationSuccessMsg: '',
  resendUserEmailVerificationFailureMsg: '',
  resendUserEmailVerificationRequesting: false,
});

function emailVerificationReducer(state = initialState, action) {
  switch (action.type) {
    case types.RESEND_USER_EMAIL_VERIFICATION_REQUEST:
      return state.merge({
        resendUserEmailVerificationSuccess: false,
        resendUserEmailVerificationFailure: false,
        resendUserEmailVerificationSuccessMsg: '',
        resendUserEmailVerificationFailureMsg: '',
        resendUserEmailVerificationRequesting: true,
      });
    case types.RESEND_USER_EMAIL_VERIFICATION_SUCCESS:
      return state.merge({
        resendUserEmailVerificationSuccess: true,
        resendUserEmailVerificationSuccessMsg:
          action.successResponse.message ||
          'Successfully Resend Verification Email to respective email address.',
        resendUserEmailVerificationRequesting: false,
      });
    case types.RESEND_USER_EMAIL_VERIFICATION_FAILURE:
      return state.merge({
        resendUserEmailVerificationFailure: true,
        resendUserEmailVerificationFailureMsg:
          action.errorResponse.message ||
          'Oooooppps!!! Something went wrong. Please Try Again Later.',
        resendUserEmailVerificationRequesting: false,
      });
    default:
      return state;
  }
}

export default emailVerificationReducer;
