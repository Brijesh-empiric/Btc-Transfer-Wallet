/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  validateTokenRequest: false,
  validateTokenSuccess: false,
  validateTokenFailure: false,
  validateTokenSuccessMsg: '',
  validateTokenFailureMsg: '',
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailure: false,
  resetPasswordSuccessMsg: '',
  resetPasswordFailureMsg: '',
});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case types.VALIDATE_TOKEN_REQUEST:
      return state.merge({
        validateTokenRequest: true,
        validateTokenSuccess: false,
        validateTokenFailure: false,
        validateTokenSuccessMsg: '',
        validateTokenFailureMsg: '',
      });
    case types.VALIDATE_TOKEN_SUCCESS:
      return state.merge({
        validateTokenSuccess: true,
        validateTokenRequest: false,
        validateTokenSuccessMsg: action.response.data,
      });
    case types.VALIDATE_TOKEN_FAILURE:
      return state.merge({
        validateTokenFailure: true,
        validateTokenRequest: false,
        validateTokenFailureMsg: action.error.message,
      });
    case types.RESET_PASSWORD_REQUEST:
      return state.merge({
        resetPasswordRequest: true,
        resetPasswordSuccess: false,
        resetPasswordFailure: false,
        resetPasswordSuccessMsg: '',
        resetPasswordFailureMsg: '',
      });
    case types.RESET_PASSWORD_SUCCESS:
      return state.merge({
        resetPasswordSuccess: true,
        resetPasswordRequest: false,
        resetPasswordSuccessMsg: action.response.message,
      });

    case types.RESET_PASSWORD_FAILURE:
      return state.merge({
        resetPasswordFailure: true,
        resetPasswordRequest: false,
        resetPasswordFailureMsg: action.error.message,
      });
    default:
      return state;
  }
}

export default resetPasswordReducer;
