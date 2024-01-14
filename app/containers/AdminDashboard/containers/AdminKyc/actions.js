import * as types from './constants';
import action from 'utils/action';

export const getAllKycListRequest = action(
  types.GET_ALL_KYC_LIST_REQUEST,
  'queryParams',
);

export const getAllKycListSuccess = action(
  types.GET_ALL_KYC_LIST_SUCCESS,
  'successResponse',
);

export const getAllKycListFailure = action(
  types.GET_ALL_KYC_LIST_FAILURE,
  'errorResponse',
);

export const getKycStatusRequest = action(types.GET_KYC_STATUS_REQUEST);

export const getKycStatusSuccess = action(
  types.GET_KYC_STATUS_SUCCESS,
  'successResponse',
);

export const getKycStatusFailure = action(
  types.GET_ALL_KYC_LIST_FAILURE,
  'errorResponse',
);

export const getKycByIdRequest = action(types.GET_KYC_BY_ID_REQUEST, 'kycId');

export const getKycByIdSuccess = action(
  types.GET_KYC_BY_ID_SUCCESS,
  'successResponse',
);

export const getKycByIdFailure = action(
  types.GET_KYC_BY_ID_FAILURE,
  'errorResponse',
);

export const changeKycStatusRequest = action(
  types.CHANGE_KYC_STATUS_REQUEST,
  'reqObj',
);
export const changeKycStatusSuccess = action(
  types.CHANGE_KYC_STATUS_SUCCESS,
  'successResponse',
);
export const changeKycStatusFailure = action(
  types.CHANGE_KYC_STATUS_FAILURE,
  'errorResponse',
);

export const deleteKycRequest = action(types.DELETE_KYC_REQUEST, 'reqObj');

export const deleteKycSuccess = action(
  types.DELETE_KYC_SUCCESS,
  'successResponse',
);

export const deleteKycFailure = action(
  types.DELETE_KYC_FAILURE,
  'errorResponse',
);
