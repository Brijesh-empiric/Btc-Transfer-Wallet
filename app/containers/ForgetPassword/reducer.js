/*
 *
 * ForgetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  forgetPasswordRequest: false,
  forgetPasswordSuccess: false,
  forgetPasswordFailure: false,
  forgetPasswordSuccessMsg: '',
  forgetPasswordFailureMsg: '',
});

function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case types.FORGET_PASSWORD_REQUEST:
      return state.merge({
        forgetPasswordRequest: true,
        forgetPasswordSuccess: false,
        forgetPasswordFailure: false,
        forgetPasswordSuccessMsg: '',
        forgetPasswordFailureMsg: '',
      });
    case types.FORGET_PASSWORD_SUCCESS:
      return state.merge({
        forgetPasswordRequest: false,
        forgetPasswordSuccess: true,
        forgetPasswordSuccessMsg: action.response.data.message || 'Success.',
      });
    case types.FORGET_PASSWORD_FAILURE:
      return state.merge({
        forgetPasswordRequest: false,
        forgetPasswordFailure: true,
        forgetPasswordFailureMsg:
          action.error.message || 'Something went wrong. Try again later.',
      });
    case types.FORGET_PASSWORD_CLEAR_STATE:
    case types.FORGET_PASSWORD_CLEAR_MESSAGES:
      return state;
    default:
      return state;
  }
}

export default forgetPasswordReducer;
