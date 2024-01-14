import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  requesting: false,
  success: false,
  response: null,
  error: null,
  getKycInfoResponse: null,
  getKycInfoSuccess: false,
  getKycInfoFailure: false,
  getKycInfoSuccessMsg: '',
  getKycInfoFailureMsg: '',
  getKycInfoRequesting: false,

  fetchDocumentTypeResponse: [],
  fetchDocumentTypeSuccess: false,
  fetchDocumentTypeFailure: false,
  fetchDocumentTypeSuccessMsg: '',
  fetchDocumentTypeFailureMsg: '',
  fetchDocumentTypeRequesting: false,
});

function basicInfoReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_BASIC_INFO_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false,
      });
    case types.UPDATE_BASIC_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        error: null,
        response: action.response.message,
        success: true,
      });
    // .updateIn(['user'], user => {
    //   const userJS = user.toJS();
    //   return fromJS({...userJS, ...action.response.data });
    // });
    case types.UPDATE_BASIC_INFO_FAILURE:
      return state.merge({
        requesting: false,
        response: null,
        error: action.error.message,
        success: false,
      });
    case types.GET_KYC_INFO_REQUEST:
      return state.merge({
        getKycInfoResponse: null,
        getKycInfoSuccess: false,
        getKycInfoFailure: false,
        getKycInfoSuccessMsg: '',
        getKycInfoFailureMsg: '',
        getKycInfoRequesting: true,
      });
    case types.GET_KYC_INFO_SUCCESS:
      return state.merge({
        getKycInfoSuccess: true,
        getKycInfoRequesting: false,
        getKycInfoResponse: action.response,
        getKycInfoSuccessMsg: action.response.message,
      });
    case types.GET_KYC_INFO_FAILURE:
      return state.merge({
        getKycInfoFailure: true,
        getKycInfoRequesting: false,
        getKycInfoFailureMsg: action.error.message,
      });
    case types.BASIC_INFO_CLEAR_STATE:
    case LOGOUT_SUCCESS:
      return initialState;
    case types.FETCH_DOCUMENT_TYPE_REQUEST:
      return state.merge({
        fetchDocumentTypeResponse: [],
        fetchDocumentTypeSuccess: false,
        fetchDocumentTypeFailure: false,
        fetchDocumentTypeSuccessMsg: '',
        fetchDocumentTypeFailureMsg: '',
        fetchDocumentTypeRequesting: true,
      });

    case types.FETCH_DOCUMENT_TYPE_SUCCESS:
      const documentTypeList = action.successResponse.data.map((cat, index) => {
        return {
          key: index,
          text: Object.keys(cat)[0],
          value: Object.values(cat)[0],
        };
      });
      return state.merge({
        fetchDocumentTypeSuccess: true,
        fetchDocumentTypeSuccessMsg: '',
        fetchDocumentTypeRequesting: false,
        fetchDocumentTypeResponse: documentTypeList,
      });

    case types.FETCH_DOCUMENT_TYPE_FAILURE:
      return state.merge({
        fetchDocumentTypeFailure: true,
        fetchDocumentTypeFailureMsg: '',
        fetchDocumentTypeRequesting: false,
      });
    default:
      return state;
  }
}

export default basicInfoReducer;
