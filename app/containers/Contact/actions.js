import * as types from './constants';
import action from 'utils/action';

export const postCustomerQueriesRequest = action(
  types.POST_CUSTOMER_QUERIES_REQUEST,
  'data',
);
export const postCustomerQueriesSuccess = action(
  types.POST_CUSTOMER_QUERIES_SUCCESS,
  'successResponse',
);
export const postCustomerQueriesFailure = action(
  types.POST_CUSTOMER_QUERIES_FAILURE,
  'errorResponse',
);
