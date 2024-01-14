/*
 *
 * CustomerQueries actions
 *
 */

import * as types from './constants';
import action from 'utils/action';

export const getAllCustomerQueriesRequest = action(
  types.GET_ALL_CUSTOMER_QUERIES_REQUEST,
  'queryParams',
);

export const getAllCustomerQueriesSuccess = action(
  types.GET_ALL_CUSTOMER_QUERIES_SUCCESS,
  'successResponse',
);

export const getAllCustomerQueriesFailure = action(
  types.GET_ALL_CUSTOMER_QUERIES_FAILURE,
  'errorResponse',
);

export const updateResolveStatusRequest = action(
  types.UPDATE_RESOLVE_STATUS_REQUEST,
  'data',
);

export const updateResolveStatusSuccess = action(
  types.UPDATE_RESOLVE_STATUS_SUCCESS,
  'successResponse',
);

export const updateResolveStatusFailure = action(
  types.UPDATE_RESOLVE_STATUS_FAILURE,
  'errorResponse',
);

export const updateResolveStatusResponse = action(
  types.UPDATE_RESOLVE_STATUS_RESPONSE,
  'data',
);

export const deleteCustomerQueryRequest = action(
  types.DELETE_CUSTOMER_QUERY_REQUEST,
  'reqObj',
);

export const deleteCustomerQuerySuccess = action(
  types.DELETE_CUSTOMER_QUERY_SUCCESS,
  'successResponse',
);

export const deleteCustomerQueryFailure = action(
  types.DELETE_CUSTOMER_QUERY_FAILURE,
  'errorResponse',
);
