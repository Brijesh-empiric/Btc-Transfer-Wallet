import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  email: '',
  userId: '',
  userInfo: {},
  isLoggedIn: false,
  hasUserConfirmed: false,
  adminLoginRequest: false,
  adminLoginSuccess: false,
  adminLoginError: false,
  adminLoginErrorResponse: '',
  adminLoginSuccessResponse: '',
});

function adminLoginReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_DIALOG:
      return state.merge({
        dialog: fromJS(action.payload),
      });
    case types.ADMIN_LOGIN_REQUEST:
      return state.merge({
        email: '',
        userId: '',
        adminLoginRequest: true,
        adminLoginSuccess: false,
        adminLoginError: false,
        adminLoginErrorResponse: '',
        adminLoginSuccessResponse: '',
      });
    case types.ADMIN_LOGIN_SUCCESS:
      if (
        action.successResponse.data &&
        !action.successResponse.data.userInfo.multi_factor_auth_enable
      ) {
        localStorage.setItem('token', action.successResponse.data.token);
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
          userId: '',
          isLoggedIn: true,
          adminLoginRequest: false,
          adminLoginErrorResponse: null,
          userInfo: fromJS(action.successResponse.data.userInfo),
          hasUserConfirmed: action.successResponse.data.userInfo.confirmed,
        });
      } else {
        return state.merge({
          error: '',
          isLoggedIn: false,
          userInfo: fromJS(action.successResponse.data),
        });
      }
    case types.ADMIN_LOGIN_FAILURE:
      return state.merge({
        adminLoginRequest: false,
        adminLoginSuccess: false,
        adminLoginError: true,
        adminLoginErrorResponse:
          action.errorResponse.msg ||
          'Something went wrong. Please Try Again Later.',
        adminLoginSuccessResponse: '',
        userId:
          action.errorResponse.data && action.errorResponse.data.user_id
            ? action.errorResponse.data.user_id
            : '',
      });
    case types.ADMIN_LOGIN_CLEAR_STATE:
      localStorage.removeItem('token');
      return initialState;
    case types.ADMIN_LOGIN_CLEAR_MESSAGES:
      return state.merge({
        adminLoginError: false,
        adminLoginSuccess: false,
        adminLoginErrorResponse: '',
        adminLoginSuccessResponse: '',
      });
    default:
      return state;
  }
}

export default adminLoginReducer;
