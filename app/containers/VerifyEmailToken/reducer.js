/*
 *
 * VerifyEmailToken reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  verifyEmailTokenRequest: false,
  verifyEmailTokenSuccess: false,
  verifyEmailTokenFailure: false,
  verifyEmailTokenSuccessMsg: '',
  verifyEmailTokenFailureMsg: '',
});

function verifyEmailTokenReducer(state = initialState, action) {
  switch (action.type) {
    case types.VERIFY_EMAIL_TOKEN_REQUEST:
      return state.merge({
        verifyEmailTokenRequest: true,
        verifyEmailTokenSuccess: false,
        verifyEmailTokenFailure: false,
        verifyEmailTokenSuccessMsg: '',
        verifyEmailTokenFailureMsg: '',
      });
    case types.VERIFY_EMAIL_TOKEN_SUCCESS:
      if (
        action.successResponse.data &&
        !action.successResponse.data.userInfo.multi_factor_auth_enable
      ) {
        localStorage.setItem('token', action.successResponse.data.token); // todo: localStorage changes to be put in sagas
        localStorage.setItem(
          'email',
          action.successResponse.data.userInfo.email,
        );
        localStorage.setItem(
          'user_id',
          action.successResponse.data.userInfo.user_id,
        );
        localStorage.setItem('role', action.successResponse.data.userInfo.role);
        localStorage.setItem(
          'multi_factor_auth_enable',
          action.successResponse.data.userInfo.multi_factor_auth_enable,
        );
        action.successResponse.data.allowed_actions &&
          localStorage.setItem(
            'allowed_actions',
            action.successResponse.data.allowed_actions,
          );
        return state.merge({
          loginRequesting: false,
          userInfo: fromJS(action.successResponse.data.userInfo),
          isLoggedIn: true,
          hasUserConfirmed: action.successResponse.data.userInfo.confirmed,
          verifyEmailTokenRequest: false,
          verifyEmailTokenSuccess: true,
          verifyEmailTokenSuccessMsg: '',
        });
      } else {
        return state.merge({
          userInfo: fromJS(action.successResponse.data),
          verifyEmailTokenRequest: false,
          verifyEmailTokenSuccess: true,
          verifyEmailTokenSuccessMsg: '',
          isLoggedIn: false,
          // userId: fromJS(action.user.data.user_id),
        });
      }
    case types.VERIFY_EMAIL_TOKEN_FAILURE:
      return state.merge({
        verifyEmailTokenRequest: false,
        verifyEmailTokenFailure: true,
        verifyEmailTokenFailureMsg: '',
      });
    default:
      return state;
  }
}

export default verifyEmailTokenReducer;
