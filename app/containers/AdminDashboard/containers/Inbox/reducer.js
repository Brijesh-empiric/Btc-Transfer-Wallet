/*
 *
 * Inbox reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  fetchAllSupportTicketResponse: [],
  fetchAllSupportTicketSuccess: false,
  fetchAllSupportTicketFailure: false,
  fetchAllSupportTicketSuccessMsg: '',
  fetchAllSupportTicketFailureMsg: '',
  fetchAllSupportTicketRequesting: false,
  allSupportTicketCount: 0,
  loadMoreMessageRequesting: false,

  fetchTicketStatusResponse: [],
  fetchTicketStatusSuccess: false,
  fetchTicketStatusFailure: false,
  fetchTicketStatusSuccessMsg: '',
  fetchTicketStatusFailureMsg: '',
  fetchTicketStatusRequesting: false,

  updateTicketStatusSuccess: false,
  updateTicketStatusFailure: false,
  updateTicketStatusSuccessMsg: '',
  updateTicketStatusFailureMsg: '',
  updateTicketStatusRequesting: false,

  deleteTicketSuccess: false,
  deleteTicketFailure: false,
  deleteTicketSuccessMsg: '',
  deleteTicketFailureMsg: '',
  deleteTicketRequesting: false,

  fetchSpecificTicketAllMessageResponse: [],
  fetchSpecificTicketAllMessageSuccess: false,
  fetchSpecificTicketAllMessageSuccessMsg: '',
  fetchSpecificTicketAllMessageFailure: false,
  fetchSpecificTicketAllMessageFailureMsg: '',
  fetchSpecificTicketAllMessageRequesting: false,

  replyMessageToSpecificTicketByAdminSuccess: false,
  replyMessageToSpecificTicketByAdminSuccessMsg: '',
  replyMessageToSpecificTicketByAdminFailure: false,
  replyMessageToSpecificTicketByAdminFailureMsg: '',
  replyMessageToSpecificTicketByAdminRequesting: false,

  getNewMessageResponse: [],
  getNewMessageSuccess: false,
  getNewMessageSuccessMsg: '',
  getNewMessageFailure: false,
  getNewMessageFailureMsg: '',
  getNewMessageRequesting: false,
});

function inboxReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_SUPPORT_TICKET_REQUEST:
      return state.merge({
        allSupportTicketCount: 0,
        fetchAllSupportTicketResponse: [],
        fetchAllSupportTicketSuccess: false,
        fetchAllSupportTicketFailure: false,
        fetchAllSupportTicketSuccessMsg: '',
        fetchAllSupportTicketFailureMsg: '',
        fetchAllSupportTicketRequesting: true,
      });
    case types.FETCH_ALL_SUPPORT_TICKET_SUCCESS:
      return state.merge({
        fetchAllSupportTicketSuccess: true,
        fetchAllSupportTicketSuccessMsg: '',
        fetchAllSupportTicketRequesting: false,
        loadMoreMessageRequesting: false,
        fetchAllSupportTicketResponse: [
          ...state.toJS().fetchAllSupportTicketResponse,
          ...action.successResponse.data,
        ],
        allSupportTicketCount:
          action.successResponse.pagination_data &&
          action.successResponse.pagination_data.total_count
            ? action.successResponse.pagination_data.total_count
            : 0,
      });
    case types.FETCH_ALL_SUPPORT_TICKET_FAILURE:
      return state.merge({
        fetchAllSupportTicketFailure: true,
        fetchAllSupportTicketFailureMsg:
          action.errorResponse.message ||
          'Oooops!!! Something went wrong. Please Try Again Later.',
        fetchAllSupportTicketRequesting: false,
        loadMoreMessageRequesting: false,
      });
    case types.LOAD_MORE_MESSAGE_REQUEST:
      return state.merge({
        loadMoreMessageRequesting: true,
      });
    case types.FETCH_TICKET_STATUS_REQUEST:
      return state.merge({
        fetchTicketStatusResponse: [],
        fetchTicketStatusSuccess: false,
        fetchTicketStatusFailure: false,
        fetchTicketStatusSuccessMsg: '',
        fetchTicketStatusFailureMsg: '',
        fetchTicketStatusRequesting: true,
      });
    case types.FETCH_TICKET_STATUS_SUCCESS:
      const supportTicketStatusList = action.successResponse.data.map(
        (cat, index) => {
          return {
            key: index,
            text: Object.keys(cat)[0],
            value: Object.values(cat)[0],
          };
        },
      );
      return state.merge({
        fetchTicketStatusResponse: supportTicketStatusList,
        fetchTicketStatusSuccess: true,
        fetchTicketStatusSuccessMsg: '',
        fetchTicketStatusRequesting: false,
      });
    case types.FETCH_TICKET_STATUS_FAILURE:
      return state.merge({
        fetchTicketStatusFailure: true,
        fetchTicketStatusFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. While fetching support ticket status option. Please Try Again Later',
        fetchTicketStatusRequesting: false,
      });

    case types.UPDATE_TICKET_STATUS_REQUEST:
      return state.merge({
        updateTicketStatusSuccess: false,
        updateTicketStatusFailure: false,
        updateTicketStatusSuccessMsg: '',
        updateTicketStatusFailureMsg: '',
        updateTicketStatusRequesting: true,
      });
    case types.UPDATE_TICKET_STATUS_SUCCESS:
      return state.merge({
        updateTicketStatusSuccess: true,
        updateTicketStatusSuccessMsg:
          action.successResponse.message || 'Updated Successfully',
        updateTicketStatusRequesting: false,
      });

    case types.UPDATE_TICKET_STATUS_FAILURE:
      return state.merge({
        updateTicketStatusFailure: true,
        updateTicketStatusFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
        updateTicketStatusRequesting: false,
      });

    case types.DELETE_TICKET_REQUEST:
      return state.merge({
        deleteTicketSuccess: false,
        deleteTicketFailure: false,
        deleteTicketSuccessMsg: '',
        deleteTicketFailureMsg: '',
        deleteTicketRequesting: true,
      });
    case types.DELETE_TICKET_SUCCESS:
      return state.merge({
        deleteTicketSuccess: true,
        deleteTicketSuccessMsg:
          action.successResponse.message || 'Deleted Successfully',
        deleteTicketRequesting: false,
      });
    case types.DELETE_TICKET_FAILURE:
      return state.merge({
        deleteTicketFailure: true,
        deleteTicketFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
        deleteTicketRequesting: false,
      });
    case types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_REQUEST:
      return state.merge({
        fetchSpecificTicketAllMessageResponse: [],
        fetchSpecificTicketAllMessageSuccess: false,
        fetchSpecificTicketAllMessageSuccessMsg: '',
        fetchSpecificTicketAllMessageFailure: false,
        fetchSpecificTicketAllMessageFailureMsg: '',
        fetchSpecificTicketAllMessageRequesting: true,
      });
    case types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_SUCCESS:
      return state.merge({
        fetchSpecificTicketAllMessageSuccess: true,
        fetchSpecificTicketAllMessageSuccessMsg: '',
        fetchSpecificTicketAllMessageRequesting: false,
        fetchSpecificTicketAllMessageResponse: action.successResponse.data,
      });
    case types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_FAILURE:
      return state.merge({
        fetchSpecificTicketAllMessageFailure: true,
        fetchSpecificTicketAllMessageFailureMsg: '',
        fetchSpecificTicketAllMessageRequesting: false,
      });
    case types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_REQUEST:
      let prevAllMessage = state.toJS().fetchSpecificTicketAllMessageResponse;

      return state.merge({
        fetchSpecificTicketAllMessageResponse: [
          ...prevAllMessage,
          {
            id:
              prevAllMessage.length === 0
                ? 1
                : prevAllMessage[prevAllMessage.length - 1].id + 1,
            message: action.reqObj.message || '',
            ticket_id: action.reqObj.ticket_id,
            is_admin_message: true,
            is_user_message: false,
          },
        ],
        replyMessageToSpecificTicketByAdminSuccess: false,
        replyMessageToSpecificTicketByAdminSuccessMsg: '',
        replyMessageToSpecificTicketByAdminFailure: false,
        replyMessageToSpecificTicketByAdminFailureMsg: '',
        replyMessageToSpecificTicketByAdminRequesting: true,
      });

    case types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_SUCCESS:
      let removeData = state.toJS().fetchSpecificTicketAllMessageResponse;
      removeData.pop();
      return state.merge({
        fetchSpecificTicketAllMessageResponse: [
          ...removeData,
          {
            ...action.successResponse.data,
          },
        ],
        replyMessageToSpecificTicketByAdminSuccess: true,
        replyMessageToSpecificTicketByAdminSuccessMsg: '',
        replyMessageToSpecificTicketByAdminRequesting: false,
      });

    case types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_REQUEST:
      return state.merge({
        replyMessageToSpecificTicketByAdminFailure: true,
        replyMessageToSpecificTicketByAdminFailureMsg: '',
        replyMessageToSpecificTicketByAdminRequesting: false,
      });

    case types.GET_NEW_MESSAGE_REQUEST:
      return state.merge({
        getNewMessageResponse: [],
        getNewMessageSuccess: false,
        getNewMessageSuccessMsg: '',
        getNewMessageFailure: false,
        getNewMessageFailureMsg: '',
        getNewMessageRequesting: true,
      });

    case types.GET_NEW_MESSAGE_SUCCESS:
      return state.merge({
        fetchSpecificTicketAllMessageResponse:
          action.successResponse.data &&
          action.successResponse.data.length === 0
            ? state.toJS().fetchSpecificTicketAllMessageResponse
            : [
                ...state.toJS().fetchSpecificTicketAllMessageResponse,
                ...action.successResponse.data,
              ],
        getNewMessageResponse: [],
        getNewMessageSuccess: true,
        getNewMessageSuccessMsg: '',
        getNewMessageRequesting: false,
      });

    case types.GET_NEW_MESSAGE_FAILURE:
      return state.merge({
        getNewMessageFailure: true,
        getNewMessageFailureMsg: '',
        getNewMessageRequesting: false,
      });
    default:
      return state;
  }
}

export default inboxReducer;
