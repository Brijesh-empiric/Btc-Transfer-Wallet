/*
 *
 * CustomerQueries reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  getAllCustomerQueriesResponse: {},
  getAllCustomerQueriesSuccess: false,
  getAllCustomerQueriesFailure: false,
  getAllCustomerQueriesSuccessMsg: '',
  getAllCustomerQueriesFailureMsg: '',
  getAllCustomerQueriesRequesting: false,
  updateResolveStatusSuccess: false,
  updateResolveStatusFailure: false,
  updateResolveStatusSuccessMsg: '',
  updateResolveStatusFailureMsg: '',
  updateResolveStatusRequesting: false,

  deleteCustomerQuerySuccess: false,
  deleteCustomerQueryFailure: false,
  deleteCustomerQuerySuccessMsg: '',
  deleteCustomerQueryFailureMsg: '',
  deleteCustomerQueryRequesting: false,
});

function customerQueriesReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CUSTOMER_QUERIES_REQUEST:
      return state.merge({
        getAllCustomerQueriesResponse: {},
        getAllCustomerQueriesSuccess: false,
        getAllCustomerQueriesFailure: false,
        getAllCustomerQueriesSuccessMsg: '',
        getAllCustomerQueriesFailureMsg: '',
        getAllCustomerQueriesRequesting: true,
      });
    case types.GET_ALL_CUSTOMER_QUERIES_SUCCESS:
      return state.merge({
        getAllCustomerQueriesSuccess: true,
        getAllCustomerQueriesSuccessMsg: '',
        getAllCustomerQueriesRequesting: false,
        getAllCustomerQueriesResponse: action.successResponse,
      });
    case types.GET_ALL_CUSTOMER_QUERIES_FAILURE:
      return state.merge({
        getAllCustomerQueriesFailure: true,
        getAllCustomerQueriesFailureMsg: '',
        getAllCustomerQueriesRequesting: false,
      });
    case types.UPDATE_RESOLVE_STATUS_REQUEST:
      return state.merge({
        updateResolveStatusSuccess: false,
        updateResolveStatusFailure: false,
        updateResolveStatusSuccessMsg: '',
        updateResolveStatusFailureMsg: '',
        updateResolveStatusRequesting: true,
      });
    case types.UPDATE_RESOLVE_STATUS_SUCCESS:
      return state.merge({
        updateResolveStatusSuccess: true,
        updateResolveStatusSuccessMsg:
          action.successResponse.message || 'Success!!',
        updateResolveStatusRequesting: false,
      });
    case types.UPDATE_RESOLVE_STATUS_RESPONSE:
      let prevState = state.toJS().getAllCustomerQueriesResponse;
      let objIndex = prevState.data.findIndex(obj => obj.id == action.data.id);
      prevState.data[objIndex].resolved = action.data.resolved;

      return state.merge({
        getAllCustomerQueriesResponse: prevState,
      });
    case types.UPDATE_RESOLVE_STATUS_FAILURE:
      return state.merge({
        updateResolveStatusFailure: true,
        updateResolveStatusFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        updateResolveStatusRequesting: false,
      });
    case types.DELETE_CUSTOMER_QUERY_REQUEST:
      return state.merge({
        deleteCustomerQuerySuccess: false,
        deleteCustomerQueryFailure: false,
        deleteCustomerQuerySuccessMsg: '',
        deleteCustomerQueryFailureMsg: '',
        deleteCustomerQueryRequesting: true,
      });
    case types.DELETE_CUSTOMER_QUERY_SUCCESS:
      return state.merge({
        deleteCustomerQuerySuccess: true,
        deleteCustomerQueryRequesting: false,
        deleteCustomerQuerySuccessMsg:
          action.successResponse.message || 'Deleted Successfully',
      });
    case types.DELETE_CUSTOMER_QUERY_FAILURE:
      return state.merge({
        deleteCustomerQueryFailure: true,
        deleteCustomerQueryFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
        deleteCustomerQueryRequesting: false,
      });
    default:
      return state;
  }
}

export default customerQueriesReducer;
