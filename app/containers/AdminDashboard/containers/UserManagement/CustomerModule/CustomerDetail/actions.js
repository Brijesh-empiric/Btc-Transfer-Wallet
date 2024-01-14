import action from 'utils/action';
import * as types from './constants';

export const getCustomerDetailRequest = action(
  types.GET_CUSTOMER_DETAIL_REQUEST,
  'id',
);

export const getCustomerDetailSuccess = action(
  types.GET_CUSTOMER_DETAIL_SUCCESS,
  'successResponse',
);

export const getCustomerDetailFailure = action(
  types.GET_CUSTOMER_DETAIL_FAILURE,
  'errorResponse',
);

export const getCustomerStatusListRequest = action(
  types.GET_CUSTOMER_STATUS_LIST_REQUEST,
);

export const getCustomerStatusListSuccess = action(
  types.GET_CUSTOMER_STATUS_LIST_SUCCESS,
  'successResponse',
);

export const getCustomerStatusListFailure = action(
  types.GET_CUSTOMER_STATUS_LIST_FAILURE,
  'errorResponse',
);

export const updateCustomerStatusRequest = action(
  types.UPDATE_CUSTOMER_STATUS_REQUEST,
  'data',
);

export const updateCustomerStatusSuccess = action(
  types.UPDATE_CUSTOMER_STATUS_SUCCESS,
  'successResponse',
);

export const updateCustomerStatusFailure = action(
  types.UPDATE_CUSTOMER_STATUS_FAILURE,
  'errorResponse',
);

export const importWatchAddressRequest = action(
  types.IMPORT_WATCH_ADDRESS_REQUEST,
  'reqObj',
);

export const importWatchAddressSuccess = action(
  types.IMPORT_WATCH_ADDRESS_SUCCESS,
  'successResponse',
);

export const importWatchAddressFailure = action(
  types.IMPORT_WATCH_ADDRESS_FAILURE,
  'errorResponse',
);

export const disable2faRequest = action(types.DISABLE_2FA_REQUEST, 'reqObj');

export const disable2faSuccess = action(
  types.DISABLE_2FA_SUCCESS,
  'successResponse',
);

export const disable2faFailure = action(
  types.DISABLE_2FA_FAILURE,
  'errorResponse',
);

export const deleteWatchAddressRequest = action(
  types.DELETE_WATCH_ADDRESS_REQUEST,
  'reqObj',
);
export const deleteWatchAddressSuccess = action(
  types.DELETE_WATCH_ADDRESS_SUCCESS,
  'successResponse',
);
export const deleteWatchAddressFailure = action(
  types.DELETE_WATCH_ADDRESS_FAILURE,
  'errorResponse',
);

export const fetchSupportTicketCategoryForAdminRequest = action(
  types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_REQUEST,
);

export const fetchSupportTicketCategoryForAdminSuccess = action(
  types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_SUCCESS,
  'successResponse',
);

export const fetchSupportTicketCategoryForAdminFailure = action(
  types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_FAILURE,
  'errorResponse',
);

export const createTicketForUserRequest = action(
  types.CREATE_TICKET_FOR_USER_REQUEST,
  'reqObj',
);

export const createTicketForUserSuccess = action(
  types.CREATE_TICKET_FOR_USER_SUCCESS,
  'successResponse',
);

export const createTicketForUserFailure = action(
  types.CREATE_TICKET_FOR_USER_FAILURE,
  'errorResponse',
);

export const resetCreateSupportTicketForUserInitialState = action(
  types.RESET_CREATE_SUPPORT_TICKET_FOR_USER_INITIAL_STATE,
);
