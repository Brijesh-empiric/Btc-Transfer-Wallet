import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  postCustomerQueriesSuccess: false,
  postCustomerQueriesFailure: false,
  postCustomerQueriesFailureMsg: '',
  postCustomerQueriesSuccessMsg: '',
  postCustomerQueriesRequesting: false,
});

function homePageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.POST_CUSTOMER_QUERIES_REQUEST:
      return state.merge({
        postCustomerQueriesSuccess: false,
        postCustomerQueriesFailure: false,
        postCustomerQueriesFailureMsg: '',
        postCustomerQueriesSuccessMsg: '',
        postCustomerQueriesRequesting: true,
      });
    case types.POST_CUSTOMER_QUERIES_SUCCESS:
      return state.merge({
        postCustomerQueriesSuccess: true,
        postCustomerQueriesRequesting: false,
        postCustomerQueriesSuccessMsg: action.successResponse.data.message,
      });
    case types.POST_CUSTOMER_QUERIES_FAILURE:
      return state.merge({
        postCustomerQueriesFailure: true,
        postCustomerQueriesRequesting: false,
        postCustomerQueriesFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
      });
    default:
      return state;
  }
}

export default homePageReducer;
