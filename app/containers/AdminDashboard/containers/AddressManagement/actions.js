/*
 *
 * AddressManagement actions
 *
 */

import * as types from './constants';
import action from 'utils/action';

export const fetchAllDeletedAddressRequest = action(
  types.FETCH_ALL_DELETED_ADDRESS_REQUEST,
  'queryParams',
);

export const fetchAllDeletedAddressSuccess = action(
  types.FETCH_ALL_DELETED_ADDRESS_SUCCESS,
  'successResponse',
);

export const fetchAllDeletedAddressFailure = action(
  types.FETCH_ALL_DELETED_ADDRESS_FAILURE,
  'errorResponse',
);

export const recoverAddressRequest = action(
  types.RECOVER_ADDRESS_REQUEST,
  'reqObj',
);

export const recoverAddressSuccess = action(
  types.RECOVER_ADDRESS_SUCCESS,
  'successResponse',
);

export const recoverAddressFailure = action(
  types.RECOVER_ADDRESS_FAILURE,
  'errorResponse',
);

export const updateAddressBalanceRequest = action(
  types.UPDATE_ADDRESS_BALANCE_REQUEST,
  'reqObj',
);

export const updateAddressBalanceSuccess = action(
  types.UPDATE_ADDRESS_BALANCE_SUCCESS,
  'successResponse',
);

export const updateAddressBalanceFailure = action(
  types.UPDATE_ADDRESS_BALANCE_FAILURE,
  'errorResponse',
);
