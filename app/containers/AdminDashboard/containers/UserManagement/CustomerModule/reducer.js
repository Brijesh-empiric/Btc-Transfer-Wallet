import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = {
  getAllCustomerListResponse: {},
  getAllCustomerListSuccess: false,
  getAllCustomerListFailure: false,
  getAllCustomerListSuccessMsg: '',
  getAllCustomerListFailureMsg: '',
  getAllCustomerListRequesting: false,
};

function customerModuleReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CUSTOMER_LIST_REQUEST:
      return {
        ...state,
        getAllCustomerListResponse: {},
        getAllCustomerListSuccess: false,
        getAllCustomerListFailure: false,
        getAllCustomerListSuccessMsg: '',
        getAllCustomerListFailureMsg: '',
        getAllCustomerListRequesting: true,
      };
    case types.GET_ALL_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        getAllCustomerListSuccess: true,
        getAllCustomerListSuccessMsg: '',
        getAllCustomerListRequesting: false,
        getAllCustomerListResponse: action.successResponse,
      };
    case types.GET_ALL_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        getAllCustomerListFailure: true,
        getAllCustomerListFailureMsg: '',
        getAllCustomerListRequesting: false,
      };
    default:
      return state;
  }
}

export default customerModuleReducer;
