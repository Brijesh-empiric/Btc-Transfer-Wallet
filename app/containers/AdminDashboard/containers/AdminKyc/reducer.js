/*
 *
 * AdminKyc reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  getAllKycListResponse: [],
  getAllKycListSuccess: false,
  getAllKycListFailure: false,
  getAllKycListSuccessMsg: '',
  getAllKycListFailureMsg: '',
  getAllKycListRequesting: false,

  getKycStatusResponse: [],
  getKycStatusSuccess: false,
  getKycStatusFailure: false,
  getKycStatusSuccessMsg: '',
  getKycStatusFailureMsg: '',
  getKycStatusRequesting: false,

  getKycByIdResponse: [],
  getKycByIdSuccess: false,
  getKycByIdFailure: false,
  getKycByIdSuccessMsg: '',
  getKycByIdFailureMsg: '',
  getKycByIdRequesting: false,

  changeKycStatusSuccess: false,
  changeKycStatusFailure: false,
  changeKycStatusSuccessMsg: '',
  changeKycStatusFailureMsg: '',
  changeKycStatusRequesting: false,

  deleteKycSuccess: false,
  deleteKycFailure: false,
  deleteKycSuccessMsg: '',
  deleteKycFailureMsg: '',
  deleteKycRequesting: false,
});

function adminKycReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_KYC_STATUS_REQUEST:
      return state.merge({
        getKycStatusResponse: [],
        getKycStatusSuccess: false,
        getKycStatusFailure: false,
        getKycStatusSuccessMsg: '',
        getKycStatusFailureMsg: '',
        getKycStatusRequesting: true,
      });
    case types.GET_KYC_STATUS_SUCCESS:
      const kycStatusList = action.successResponse.data.map((cat, index) => {
        return {
          key: index,
          text: Object.keys(cat)[0],
          value: Object.values(cat)[0],
        };
      });
      return state.merge({
        getKycStatusSuccess: true,
        getKycStatusSuccessMsg: '',
        getKycStatusRequesting: false,
        getKycStatusResponse: fromJS([
          ...kycStatusList,
          {
            key: kycStatusList.length + 1,
            text: 'All',
            value: '',
          },
        ]),
      });
    case types.GET_KYC_STATUS_FAILURE:
      return state.merge({
        getKycStatusFailure: true,
        getKycStatusFailureMsg: '',
        getKycStatusRequesting: false,
      });
    case types.GET_ALL_KYC_LIST_REQUEST:
      return state.merge({
        getAllKycListResponse: [],
        getAllKycListSuccess: false,
        getAllKycListFailure: false,
        getAllKycListSuccessMsg: '',
        getAllKycListFailureMsg: '',
        getAllKycListRequesting: true,
      });
    case types.GET_ALL_KYC_LIST_SUCCESS:
      return state.merge({
        getAllKycListSuccess: true,
        getAllKycListSuccessMsg: '',
        getAllKycListRequesting: false,
        getAllKycListResponse: fromJS(action.successResponse),
      });
    case types.GET_ALL_KYC_LIST_FAILURE:
      return state.merge({
        getAllKycListFailure: true,
        getAllKycListFailureMsg: '',
        getAllKycListRequesting: false,
      });
    case types.GET_KYC_BY_ID_REQUEST:
      return state.merge({
        getKycByIdResponse: [],
        getKycByIdSuccess: false,
        getKycByIdFailure: false,
        getKycByIdSuccessMsg: '',
        getKycByIdFailureMsg: '',
        getKycByIdRequesting: true,
      });
    case types.GET_KYC_BY_ID_SUCCESS:
      return state.merge({
        getKycByIdSuccess: true,
        getKycByIdSuccessMsg: '',
        getKycByIdRequesting: false,
        getKycByIdResponse: fromJS(action.successResponse),
      });
    case types.GET_KYC_BY_ID_FAILURE:
      return state.merge({
        getKycByIdFailure: true,
        getKycByIdFailureMsg: '',
        getKycByIdRequesting: false,
      });
    case types.CHANGE_KYC_STATUS_REQUEST:
      return state.merge({
        changeKycStatusSuccess: false,
        changeKycStatusFailure: false,
        changeKycStatusSuccessMsg: '',
        changeKycStatusFailureMsg: '',
        changeKycStatusRequesting: true,
      });
    case types.CHANGE_KYC_STATUS_SUCCESS:
      return state.merge({
        getKycByIdResponse: fromJS(action.successResponse),
        changeKycStatusSuccess: true,
        changeKycStatusSuccessMsg:
          action.successResponse.msg || 'KYC status updated.',
        changeKycStatusRequesting: false,
      });
    case types.CHANGE_KYC_STATUS_FAILURE:
      return state.merge({
        changeKycStatusFailure: true,
        changeKycStatusFailureMsg:
          action.errorResponse.msg ||
          'Something went wrong. Please Try Again Later',
        changeKycStatusRequesting: false,
      });

    case types.DELETE_KYC_REQUEST:
      return state.merge({
        deleteKycSuccess: false,
        deleteKycFailure: false,
        deleteKycSuccessMsg: '',
        deleteKycFailureMsg: '',
        deleteKycRequesting: true,
      });

    case types.DELETE_KYC_SUCCESS:
      return state.merge({
        deleteKycSuccess: true,
        deleteKycRequesting: false,
        deleteKycSuccessMsg:
          action.successResponse.message || 'Deleted Successfully',
      });

    case types.DELETE_KYC_FAILURE:
      return state.merge({
        deleteKycFailure: true,
        deleteKycRequesting: false,
        deleteKycFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
      });
    default:
      return state;
  }
}

export default adminKycReducer;
