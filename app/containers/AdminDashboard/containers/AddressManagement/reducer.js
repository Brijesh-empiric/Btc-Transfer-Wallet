/*
 *
 * AddressManagement reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  fetchAllDeletedAddressResponse: {},
  fetchAllDeletedAddressSuccessMsg: '',
  fetchAllDeletedAddressFailureMsg: '',
  fetchAllDeletedAddressSuccess: false,
  fetchAllDeletedAddressFailure: false,
  fetchAllDeletedAddressRequesting: false,

  recoverAddressFailure: false,
  recoverAddressSuccess: false,
  recoverAddressSuccessMsg: '',
  recoverAddressFailureMsg: '',
  recoverAddressRequesting: false,

  updateAddressBalanceSuccess: false,
  updateAddressBalanceFailure: false,
  updateAddressBalanceSuccessMsg: '',
  updateAddressBalanceFailureMsg: '',
  updateAddressBalanceRequesting: false,
});

function addressManagementReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_DELETED_ADDRESS_REQUEST:
      return state.merge({
        fetchAllDeletedAddressResponse: {},
        fetchAllDeletedAddressSuccessMsg: '',
        fetchAllDeletedAddressFailureMsg: '',
        fetchAllDeletedAddressSuccess: false,
        fetchAllDeletedAddressFailure: false,
        fetchAllDeletedAddressRequesting: true,
      });
    case types.FETCH_ALL_DELETED_ADDRESS_SUCCESS:
      return state.merge({
        fetchAllDeletedAddressSuccess: true,
        fetchAllDeletedAddressRequesting: false,
        fetchAllDeletedAddressResponse: action.successResponse,
        fetchAllDeletedAddressSuccessMsg:
          action.successResponse.message || 'Success!!',
      });
    case types.FETCH_ALL_DELETED_ADDRESS_FAILURE:
      return state.merge({
        fetchAllDeletedAddressFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        fetchAllDeletedAddressFailure: true,
        fetchAllDeletedAddressRequesting: false,
      });
    case types.RECOVER_ADDRESS_REQUEST:
      return state.merge({
        recoverAddressSuccessMsg: '',
        recoverAddressFailureMsg: '',
        recoverAddressFailure: false,
        recoverAddressSuccess: false,
        recoverAddressRequesting: true,
      });
    case types.RECOVER_ADDRESS_SUCCESS:
      return state.merge({
        recoverAddressSuccessMsg:
          action.successResponse.message || 'Recover Successfully!!',
        recoverAddressSuccess: true,
        recoverAddressRequesting: false,
      });
    case types.RECOVER_ADDRESS_FAILURE:
      return state.merge({
        recoverAddressFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        recoverAddressFailure: true,
        recoverAddressRequesting: false,
      });
    case types.UPDATE_ADDRESS_BALANCE_REQUEST:
      return state.merge({
        updateAddressBalanceSuccess: false,
        updateAddressBalanceFailure: false,
        updateAddressBalanceSuccessMsg: '',
        updateAddressBalanceFailureMsg: '',
        updateAddressBalanceRequesting: true,
      });
    case types.UPDATE_ADDRESS_BALANCE_SUCCESS:
      return state.merge({
        updateAddressBalanceSuccess: true,
        updateAddressBalanceSuccessMsg:
          action.successResponse.message || 'Updated Successfully!!',
        updateAddressBalanceRequesting: false,
      });

    case types.UPDATE_ADDRESS_BALANCE_FAILURE:
      console.log('Error Response: ', action.errorResponse);
      return state.merge({
        updateAddressBalanceFailure: true,
        updateAddressBalanceFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        updateAddressBalanceRequesting: false,
      });
    default:
      return state;
  }
}

export default addressManagementReducer;
