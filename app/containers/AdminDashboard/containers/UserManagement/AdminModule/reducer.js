import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  createAdminSuccess: false,
  createAdminFailure: false,
  createAdminSuccessMsg: '',
  createAdminFailureMsg: '',
  createAdminRequesting: false,
});

function adminModuleReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ADMIN_REQUEST:
      return state.merge({
        createAdminSuccess: false,
        createAdminFailure: false,
        createAdminSuccessMsg: '',
        createAdminFailureMsg: '',
        createAdminRequesting: true,
      });
    case types.CREATE_ADMIN_SUCCESS:
      return state.merge({
        createAdminSuccess: true,
        createAdminRequesting: false,
        createAdminSuccessMsg:
          action.successResponse.message || 'New User Created Successfully.',
      });
    case types.CREATE_ADMIN_FAILURE:
      return state.merge({
        createAdminFailure: true,
        createAdminRequesting: false,
        createAdminFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
      });
    case types.CLEAR_ADMIN_MODULE_STATE:
      return initialState;
    default:
      return state;
  }
}

export default adminModuleReducer;
