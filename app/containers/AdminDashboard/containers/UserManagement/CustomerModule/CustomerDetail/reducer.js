import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  getCustomerDetailResponse: {},
  getCustomerDetailSuccess: false,
  getCustomerDetailFailure: false,
  getCustomerDetailSuccessMsg: '',
  getCustomerDetailFailureMsg: '',
  getCustomerDetailRequesting: false,

  getCustomerStatusListResponse: [],
  getCustomerStatusListSuccess: false,
  getCustomerStatusListFailure: false,
  getCustomerStatusListSuccessMsg: '',
  getCustomerStatusListFailureMsg: '',
  getCustomerStatusListRequesting: false,

  updateCustomerStatusSuccess: false,
  updateCustomerStatusFailure: false,
  updateCustomerStatusSuccessMsg: '',
  updateCustomerStatusFailureMsg: '',
  updateCustomerStatusRequesting: false,

  importWatchAddressSuccess: false,
  importWatchAddressFailure: false,
  importWatchAddressSuccessMsg: '',
  importWatchAddressFailureMsg: '',
  importWatchAddressRequesting: false,

  disable2faSuccess: false,
  disable2faSuccessMsg: '',
  disable2faFailureMsg: '',
  disable2faFailure: false,
  disable2faRequesting: false,

  deleteWatchAddressSuccess: false,
  deleteWatchAddressFailure: false,
  deleteWatchAddressSuccessMsg: '',
  deleteWatchAddressFailureMsg: '',
  deleteWatchAddressRequesting: false,

  createTicketForUserSuccess: false,
  createTicketForUserFailure: false,
  createTicketForUserSuccessMsg: '',
  createTicketForUserFailureMsg: '',
  createTicketForUserRequesting: false,

  fetchSupportTicketCategoryForAdminResponse: [],
  fetchSupportTicketCategoryForAdminSuccess: false,
  fetchSupportTicketCategoryForAdminFailure: false,
  fetchSupportTicketCategoryForAdminSuccessMsg: '',
  fetchSupportTicketCategoryForAdminFailureMsg: '',
  fetchSupportTicketCategoryForAdminRequesting: false,
});

function customerDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CUSTOMER_DETAIL_REQUEST:
      return state.merge({
        getCustomerDetailResponse: {},
        getCustomerDetailSuccess: false,
        getCustomerDetailFailure: false,
        getCustomerDetailSuccessMsg: '',
        getCustomerDetailFailureMsg: '',
        getCustomerDetailRequesting: true,
      });
    case types.GET_CUSTOMER_DETAIL_SUCCESS:
      return state.merge({
        getCustomerDetailSuccess: true,
        getCustomerDetailSuccessMsg: '',
        getCustomerDetailRequesting: false,
        getCustomerDetailResponse: fromJS(action.successResponse),
      });
    case types.GET_CUSTOMER_DETAIL_FAILURE:
      return state.merge({
        getCustomerDetailFailure: true,
        getCustomerDetailRequesting: false,
        getCustomerDetailFailureMsg: 'Something went wrong. Try again later.',
      });

    case types.GET_CUSTOMER_STATUS_LIST_REQUEST:
      return state.merge({
        getCustomerStatusListResponse: [],
        getCustomerStatusListSuccess: false,
        getCustomerStatusListFailure: false,
        getCustomerStatusListSuccessMsg: '',
        getCustomerStatusListFailureMsg: '',
        getCustomerStatusListRequesting: true,
      });
    case types.GET_CUSTOMER_STATUS_LIST_SUCCESS:
      const statusList = Object.keys(
        action.successResponse.customer_status_list,
      ).map((key, index) => {
        return {
          key: index,
          text: action.successResponse.customer_status_list[key],
          value: Object.keys(action.successResponse.customer_status_list).find(
            keys =>
              action.successResponse.customer_status_list[keys] ===
              action.successResponse.customer_status_list[key],
          ),
        };
      });
      return state.merge({
        getCustomerStatusListSuccess: true,
        getCustomerStatusListSuccessMsg: '',
        getCustomerStatusListRequesting: false,
        getCustomerStatusListResponse: statusList,
      });
    case types.GET_CUSTOMER_STATUS_LIST_FAILURE:
      return state.merge({
        getCustomerStatusListFailure: true,
        getCustomerStatusListRequesting: false,
        getCustomerStatusListFailureMsg:
          action.errorResponse.message ||
          'Error while fetching data. Please Try Again Later.',
      });
    case types.UPDATE_CUSTOMER_STATUS_REQUEST:
      return state.merge({
        updateCustomerStatusSuccess: false,
        updateCustomerStatusFailure: false,
        updateCustomerStatusSuccessMsg: '',
        updateCustomerStatusFailureMsg: '',
        updateCustomerStatusRequesting: true,
      });
    case types.UPDATE_CUSTOMER_STATUS_SUCCESS:
      return state.merge({
        updateCustomerStatusSuccess: true,
        updateCustomerStatusSuccessMsg:
          action.successResponse.data.message || 'Success!!!!',
        updateCustomerStatusRequesting: false,
      });
    case types.UPDATE_CUSTOMER_STATUS_FAILURE:
      return state.merge({
        updateCustomerStatusFailure: true,
        updateCustomerStatusFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        updateCustomerStatusRequesting: false,
      });

    case types.IMPORT_WATCH_ADDRESS_REQUEST:
      return state.merge({
        importWatchAddressSuccess: false,
        importWatchAddressFailure: false,
        importWatchAddressSuccessMsg: '',
        importWatchAddressFailureMsg: '',
        importWatchAddressRequesting: true,
      });

    case types.IMPORT_WATCH_ADDRESS_SUCCESS:
      return state.merge({
        importWatchAddressSuccess: true,
        importWatchAddressSuccessMsg:
          action.successResponse.data.message || 'Success!!!!',
        importWatchAddressRequesting: false,
      });

    case types.IMPORT_WATCH_ADDRESS_FAILURE:
      return state.merge({
        importWatchAddressFailure: true,
        importWatchAddressFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        importWatchAddressRequesting: false,
      });

    case types.DISABLE_2FA_REQUEST:
      return state.merge({
        disable2faSuccess: false,
        disable2faSuccessMsg: '',
        disable2faFailureMsg: '',
        disable2faFailure: false,
        disable2faRequesting: true,
      });

    case types.DISABLE_2FA_SUCCESS:
      return state.merge({
        disable2faSuccess: true,
        disable2faSuccessMsg:
          action.successResponse.data.message || 'Success!!!!',
        disable2faRequesting: false,
      });

    case types.DISABLE_2FA_FAILURE:
      return state.merge({
        disable2faFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        disable2faFailure: true,
        disable2faRequesting: false,
      });
    case types.DELETE_WATCH_ADDRESS_REQUEST:
      return state.merge({
        deleteWatchAddressSuccess: false,
        deleteWatchAddressFailure: false,
        deleteWatchAddressSuccessMsg: '',
        deleteWatchAddressFailureMsg: '',
        deleteWatchAddressRequesting: true,
      });
    case types.DELETE_WATCH_ADDRESS_SUCCESS:
      return state.merge({
        deleteWatchAddressSuccess: true,
        deleteWatchAddressSuccessMsg:
          action.successResponse.data.message || 'Success!!!!',
        deleteWatchAddressRequesting: false,
      });
    case types.DELETE_WATCH_ADDRESS_FAILURE:
      return state.merge({
        deleteWatchAddressFailure: true,
        deleteWatchAddressFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. Please Try Again Later.',
        deleteWatchAddressRequesting: false,
      });
    case types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_REQUEST:
      return state.merge({
        fetchSupportTicketCategoryForAdminResponse: [],
        fetchSupportTicketCategoryForAdminSuccess: false,
        fetchSupportTicketCategoryForAdminFailure: false,
        fetchSupportTicketCategoryForAdminSuccessMsg: '',
        fetchSupportTicketCategoryForAdminFailureMsg: '',
        fetchSupportTicketCategoryForAdminRequesting: true,
      });
    case types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_SUCCESS:
      console.log(action.successResponse.data);
      const supportTicketCategoryList = action.successResponse.data.map(
        (cat, index) => {
          return {
            key: index,
            text: Object.keys(cat)[0],
            value: Object.values(cat)[0],
          };
        },
      );
      return state.merge({
        fetchSupportTicketCategoryForAdminSuccess: true,
        fetchSupportTicketCategoryForAdminRequesting: false,
        fetchSupportTicketCategoryForAdminSuccessMsg: 'Success',
        fetchSupportTicketCategoryForAdminResponse: supportTicketCategoryList,
      });
    case types.FETCH_SUPPORT_TICKET_CATEGORY_FOR_ADMIN_FAILURE:
      return state.merge({
        fetchSupportTicketCategoryForAdminFailure: true,
        fetchSupportTicketCategoryForAdminFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. While fetching support ticket category. Please Try Again Later',
        fetchSupportTicketCategoryForAdminRequesting: false,
      });

    case types.CREATE_TICKET_FOR_USER_REQUEST:
      return state.merge({
        createTicketForUserSuccess: false,
        createTicketForUserFailure: false,
        createTicketForUserSuccessMsg: '',
        createTicketForUserFailureMsg: '',
        createTicketForUserRequesting: true,
      });

    case types.CREATE_TICKET_FOR_USER_SUCCESS:
      return state.merge({
        createTicketForUserSuccess: true,
        createTicketForUserSuccessMsg:
          action.successResponse.message || 'Success!!!',
        createTicketForUserRequesting: false,
      });

    case types.CREATE_TICKET_FOR_USER_FAILURE:
      return state.merge({
        createTicketForUserFailure: true,
        createTicketForUserFailureMsg:
          action.errorResponse.message ||
          'Oooops!!! Something went wrong. Please Try Again Later.',
        createTicketForUserRequesting: false,
      });

    case types.RESET_CREATE_SUPPORT_TICKET_FOR_USER_INITIAL_STATE:
      return state.merge({
        createTicketForUserSuccess: false,
        createTicketForUserFailure: false,
        createTicketForUserSuccessMsg: '',
        createTicketForUserFailureMsg: '',
        createTicketForUserRequesting: false,
      });

    default:
      return state;
  }
}

export default customerDetailReducer;
