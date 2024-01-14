import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  verifyAdminEmailTokenSuccessMsg: '',
  verifyAdminEmailTokenFailureMsg: '',
  verifyAdminEmailTokenSuccess: false,
  verifyAdminEmailTokenFailure: false,
  verifyAdminEmailTokenRequesting: false,
});

function verifyAdminEmailTokenReducer(state = initialState, action) {
  switch (action.type) {
    case types.VERIFY_ADMIN_EMAIL_TOKEN_REQUEST:
      return state.merge({
        verifyAdminEmailTokenSuccessMsg: '',
        verifyAdminEmailTokenFailureMsg: '',
        verifyAdminEmailTokenSuccess: false,
        verifyAdminEmailTokenFailure: false,
        verifyAdminEmailTokenRequesting: true,
      });
    case types.VERIFY_ADMIN_EMAIL_TOKEN_SUCCESS:
      return state.merge({
        verifyAdminEmailTokenSuccess: true,
        verifyAdminEmailTokenSuccessMsg: '',
        verifyAdminEmailTokenRequesting: false,
      });
    case types.VERIFY_ADMIN_EMAIL_TOKEN_FAILURE:
      return state.merge({
        verifyAdminEmailTokenFailure: true,
        verifyAdminEmailTokenFailureMsg: '',
        verifyAdminEmailTokenRequesting: false,
      });
    default:
      return state;
  }
}

export default verifyAdminEmailTokenReducer;
