import * as types from './constants';
import action from 'utils/action';

export const getAllCustomerListRequest = action(
  types.GET_ALL_CUSTOMER_LIST_REQUEST,
  'queryParams',
  'userType',
);
export const getAllCustomerListSuccess = action(
  types.GET_ALL_CUSTOMER_LIST_SUCCESS,
  'successResponse',
);
export const getAllCustomerListFailure = action(
  types.GET_ALL_CUSTOMER_LIST_FAILURE,
  'errorResponse',
);

export const getAllAdminListRequest = action(
  types.GET_ALL_ADMIN_LIST_REQUEST,
  'queryParams',
  'userType',
);

export const getAllAdminListSuccess = action(
  types.GET_ALL_ADMIN_LIST_SUCCESS,
  'successResponse',
);

export const getAllAdminListFailure = action(
  types.GET_ALL_ADMIN_LIST_FAILURE,
  'errorResponse',
);

export const deleteAdminRequest = action(types.DELETE_ADMIN_REQUEST, 'id');

export const deleteAdminSuccess = action(
  types.DELETE_ADMIN_SUCCESS,
  'successResponse',
);

export const deleteAdminFailure = action(
  types.DELETE_ADMIN_FAILURE,
  'errorResponse',
);

export const deleteCustomerRequest = action(
  types.DELETE_CUSTOMER_REQUEST,
  'id',
);

export const deleteCustomerSuccess = action(
  types.DELETE_CUSTOMER_SUCCESS,
  'successResponse',
);

export const deleteCustomerFailure = action(
  types.DELETE_CUSTOMER_FAILURE,
  'errorResponse',
);
