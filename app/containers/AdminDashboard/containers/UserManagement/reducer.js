import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  getAllCustomerListResponse: {},
  getAllCustomerListSuccess: false,
  getAllCustomerListFailure: false,
  getAllCustomerListSuccessMsg: '',
  getAllCustomerListFailureMsg: '',
  getAllCustomerListRequesting: false,
  deleteAdminSuccess: false,
  deleteAdminFailure: false,
  deleteAdminSuccessMsg: '',
  deleteAdminFailureMsg: '',
  deleteAdminRequesting: false,
  deleteCustomerSuccess: false,
  deleteCustomerFailure: false,
  deleteCustomerSuccessMsg: '',
  deleteCustomerFailureMsg: '',
  deleteCustomerRequesting: false,
});

function userManagementReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CUSTOMER_LIST_REQUEST:
      return state.merge({
        getAllCustomerListResponse: {},
        getAllCustomerListSuccess: false,
        getAllCustomerListFailure: false,
        getAllCustomerListSuccessMsg: '',
        getAllCustomerListFailureMsg: '',
        getAllCustomerListRequesting: true,
      });
    case types.GET_ALL_CUSTOMER_LIST_SUCCESS:
      return state.merge({
        getAllCustomerListSuccess: true,
        getAllCustomerListSuccessMsg: '',
        getAllCustomerListRequesting: false,
        getAllCustomerListResponse: fromJS(action.successResponse),
      });
    case types.GET_ALL_CUSTOMER_LIST_FAILURE:
      return state.merge({
        getAllCustomerListFailure: true,
        getAllCustomerListRequesting: false,
        getAllCustomerListFailureMsg: fromJS(action.errorResponse.message),
      });
    case types.DELETE_ADMIN_REQUEST:
      return state.merge({
        deleteAdminSuccess: false,
        deleteAdminFailure: false,
        deleteAdminSuccessMsg: '',
        deleteAdminFailureMsg: '',
        deleteAdminRequesting: true,
      });
    case types.DELETE_ADMIN_SUCCESS:
      return state.merge({
        deleteAdminSuccess: true,
        deleteAdminSuccessMsg: action.successResponse.message || 'Success!!!',
        deleteAdminRequesting: false,
      });
    case types.DELETE_ADMIN_FAILURE:
      return state.merge({
        deleteAdminFailure: true,
        deleteAdminFailureMsg: '',
        deleteAdminRequesting: false,
      });
    case types.DELETE_CUSTOMER_REQUEST:
      return state.merge({
        deleteCustomerSuccess: false,
        deleteCustomerFailure: false,
        deleteCustomerSuccessMsg: '',
        deleteCustomerFailureMsg: '',
        deleteCustomerRequesting: true,
      });
    case types.DELETE_CUSTOMER_SUCCESS:
      return state.merge({
        deleteCustomerSuccess: true,
        deleteCustomerSuccessMsg:
          action.successResponse.message || 'Success!!!',
        deleteCustomerRequesting: false,
      });
    case types.DELETE_CUSTOMER_FAILURE:
      return state.merge({
        deleteCustomerFailure: true,
        deleteCustomerFailureMsg:
          fromJS(action.errorResponse.message) || 'Something went wrong.',
        deleteCustomerRequesting: false,
      });
    default:
      return state;
  }
}

export default userManagementReducer;
