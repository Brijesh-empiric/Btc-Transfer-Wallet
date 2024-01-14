import * as types from './constants';
import action from 'utils/action';

export const getKycInfoRequest = action(types.GET_KYC_INFO_REQUEST, 'data');
export const getKycInfoSuccess = action(types.GET_KYC_INFO_SUCCESS, 'response');
export const getKycInfoFailure = action(types.GET_KYC_INFO_FAILURE, 'error');

export const updateBasicInfoRequest = action(
  types.UPDATE_BASIC_INFO_REQUEST,
  'user',
  'image',
);
export const updateBasicInfoSuccess = action(
  types.UPDATE_BASIC_INFO_SUCCESS,
  'response',
);
export const updateBasicInfoFailure = action(
  types.UPDATE_BASIC_INFO_FAILURE,
  'error',
);

export const basicInfoClearState = action(types.BASIC_INFO_CLEAR_STATE);

export const fetchDocumentTypeRequest = action(
  types.FETCH_DOCUMENT_TYPE_REQUEST,
);
export const fetchDocumentTypeSuccess = action(
  types.FETCH_DOCUMENT_TYPE_SUCCESS,
  'successResponse',
);
export const fetchDocumentTypeFailure = action(
  types.FETCH_DOCUMENT_TYPE_FAILURE,
  'errorResponse',
);
