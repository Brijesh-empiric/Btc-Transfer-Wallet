import * as types from './constants';
import action from 'utils/action';

export const getAllCustomerListRequest = action(
  types.GET_ALL_CUSTOMER_LIST_REQUEST,
  'queryParams',
);
export const getAllCustomerListSuccess = action(
  types.GET_ALL_CUSTOMER_LIST_SUCCESS,
  'successResponse',
);
export const getAllCustomerListFailure = action(
  types.GET_ALL_CUSTOMER_LIST_FAILURE,
  'errorResponse',
);
