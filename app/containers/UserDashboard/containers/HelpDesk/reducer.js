import * as types from './constants';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  getAllSupportTicketForUserResponse: {},
  getAllSupportTicketForUserSuccess: false,
  getAllSupportTicketForUserFailure: false,
  getAllSupportTicketForUserSuccessMsg: '',
  getAllSupportTicketForUserFailureMsg: '',
  getAllSupportTicketForUserRequesting: false,

  createSupportTicketSuccess: false,
  createSupportTicketFailure: false,
  createSupportTicketSuccessMsg: '',
  createSupportTicketFailureMsg: '',
  createSupportTicketRequesting: false,
  createSupportTicketSuccessResponse: {},

  fetchSupportTicketCategoryResponse: [],
  fetchSupportTicketCategorySuccess: false,
  fetchSupportTicketCategoryFailure: false,
  fetchSupportTicketCategorySuccessMsg: '',
  fetchSupportTicketCategoryFailureMsg: '',
  fetchSupportTicketCategoryRequesting: false,

  fetchTicketStatusOptionResponse: [],
  fetchTicketStatusOptionSuccess: false,
  fetchTicketStatusOptionFailure: false,
  fetchTicketStatusOptionSuccessMsg: '',
  fetchTicketStatusOptionFailureMsg: '',
  fetchTicketStatusOptionRequesting: false,

  updateSupportTicketStatusSuccess: false,
  updateSupportTicketStatusFailure: false,
  updateSupportTicketStatusSuccessMsg: '',
  updateSupportTicketStatusFailureMsg: '',
  updateSupportTicketStatusRequesting: false,

  deleteSupportTicketSuccess: false,
  deleteSupportTicketFailure: false,
  deleteSupportTicketSuccessMsg: '',
  deleteSupportTicketFailureMsg: '',
  deleteSupportTicketRequesting: false,

  fetchAllSpecificTicketMessageResponse: [],
  fetchAllSpecificTicketMessageSuccess: false,
  fetchAllSpecificTicketMessageFailure: false,
  fetchAllSpecificTicketMessageSuccessMsg: '',
  fetchAllSpecificTicketMessageFailureMsg: '',
  fetchAllSpecificTicketMessageRequesting: false,

  replyChatSuccess: false,
  replyChatFailure: false,
  replyChatSuccessMsg: '',
  replyChatFailureMsg: '',
  replyChatRequesting: false,

  listenNewMessageResponse: [],
  listenNewMessageSuccess: false,
  listenNewMessageFailure: false,
  listenNewMessageSuccessMsg: '',
  listenNewMessageFailureMsg: '',
  listenNewMessageRequesting: false,

  getTicketDetailByIdResponse: null,
  getTicketDetailByIdSuccess: false,
  getTicketDetailByIdFailure: false,
  getTicketDetailByIdSuccessMsg: '',
  getTicketDetailByIdFailureMsg: '',
  getTicketDetailByIdRequesting: false,
});

function helpDeskReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_SUPPORT_TICKET_FOR_USER_REQUEST:
      return state.merge({
        getAllSupportTicketForUserResponse: {},
        getAllSupportTicketForUserSuccess: false,
        getAllSupportTicketForUserFailure: false,
        getAllSupportTicketForUserSuccessMsg: '',
        getAllSupportTicketForUserFailureMsg: '',
        getAllSupportTicketForUserRequesting: true,
      });
    case types.GET_ALL_SUPPORT_TICKET_FOR_USER_SUCCESS:
      return state.merge({
        getAllSupportTicketForUserSuccess: true,
        getAllSupportTicketForUserSuccessMsg: '',
        getAllSupportTicketForUserRequesting: false,
        getAllSupportTicketForUserResponse: action.successResponse,
      });
    case types.GET_ALL_SUPPORT_TICKET_FOR_USER_FAILURE:
      return state.merge({
        getAllSupportTicketForUserFailure: true,
        getAllSupportTicketForUserFailureMsg:
          action.errorResponse.message ||
          'Oooops!!! Something went wrong. Please Try Again Later.',
        getAllSupportTicketForUserRequesting: false,
      });
    case types.CREATE_SUPPORT_TICKET_REQUEST:
      return state.merge({
        createSupportTicketSuccess: false,
        createSupportTicketFailure: false,
        createSupportTicketSuccessMsg: '',
        createSupportTicketFailureMsg: '',
        createSupportTicketRequesting: true,
        createSupportTicketSuccessResponse: {},
      });
    case types.CREATE_SUPPORT_TICKET_SUCCESS:
      return state.merge({
        createSupportTicketSuccess: true,
        createSupportTicketSuccessMsg:
          action.successResponse.message || 'Success!!!',
        createSupportTicketRequesting: false,
        createSupportTicketSuccessResponse: action.successResponse.data,
      });
    case types.CREATE_SUPPORT_TICKET_FAILURE:
      return state.merge({
        createSupportTicketFailure: true,
        createSupportTicketRequesting: false,
        createSupportTicketFailureMsg:
          action.errorResponse.message ||
          'Oooops!!! Something went wrong. Please Try Again Later.',
      });
    case types.FETCH_SUPPORT_TICKET_CATEGORY_REQUEST:
      return state.merge({
        fetchSupportTicketCategoryResponse: {},
        fetchSupportTicketCategorySuccess: false,
        fetchSupportTicketCategoryFailure: false,
        fetchSupportTicketCategorySuccessMsg: '',
        fetchSupportTicketCategoryFailureMsg: '',
        fetchSupportTicketCategoryRequesting: true,
      });
    case types.FETCH_SUPPORT_TICKET_CATEGORY_SUCCESS:
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
        fetchSupportTicketCategorySuccess: true,
        fetchSupportTicketCategorySuccessMsg: '',
        fetchSupportTicketCategoryRequesting: false,
        fetchSupportTicketCategoryResponse: supportTicketCategoryList,
      });
    case types.FETCH_SUPPORT_TICKET_CATEGORY_FAILURE:
      return state.merge({
        fetchSupportTicketCategoryFailure: true,
        fetchSupportTicketCategoryRequesting: false,
        fetchSupportTicketCategoryFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. While fetching support ticket category. Please Try Again Later',
      });

    case types.RESET_CREATE_SUPPORT_TICKET_TO_INITIAL_STATE: {
      return state.merge({
        createSupportTicketSuccess: false,
        createSupportTicketFailure: false,
        createSupportTicketSuccessMsg: '',
        createSupportTicketFailureMsg: '',
        createSupportTicketRequesting: false,
      });
    }

    case types.FETCH_TICKET_STATUS_OPTION_REQUEST:
      return state.merge({
        fetchTicketStatusOptionResponse: [],
        fetchTicketStatusOptionSuccess: false,
        fetchTicketStatusOptionFailure: false,
        fetchTicketStatusOptionSuccessMsg: '',
        fetchTicketStatusOptionFailureMsg: '',
        fetchTicketStatusOptionRequesting: true,
      });

    case types.FETCH_TICKET_STATUS_OPTION_SUCCESS:
      const supportTicketStatusOptionList = action.successResponse.data.map(
        (cat, index) => {
          return {
            key: index,
            text: Object.keys(cat)[0],
            value: Object.values(cat)[0],
          };
        },
      );
      return state.merge({
        fetchTicketStatusOptionSuccess: true,
        fetchTicketStatusOptionSuccessMsg: '',
        fetchTicketStatusOptionRequesting: false,
        fetchTicketStatusOptionResponse: supportTicketStatusOptionList,
      });

    case types.FETCH_TICKET_STATUS_OPTION_FAILURE:
      return state.merge({
        fetchTicketStatusOptionFailure: true,
        fetchTicketStatusOptionFailureMsg:
          action.errorResponse.message ||
          'Something went wrong. While fetching support ticket status option. Please Try Again Later',
        fetchTicketStatusOptionRequesting: false,
      });

    case types.UPDATE_SUPPORT_TICKET_STATUS_REQUEST:
      return state.merge({
        updateSupportTicketStatusSuccess: false,
        updateSupportTicketStatusFailure: false,
        updateSupportTicketStatusSuccessMsg: '',
        updateSupportTicketStatusFailureMsg: '',
        updateSupportTicketStatusRequesting: true,
      });

    case types.UPDATE_SUPPORT_TICKET_STATUS_SUCCESS:
      return state.merge({
        updateSupportTicketStatusSuccess: true,
        updateSupportTicketStatusRequesting: false,
        updateSupportTicketStatusSuccessMsg:
          action.successResponse.message || 'Updated Successfully',
      });

    case types.UPDATE_SUPPORT_TICKET_STATUS_FAILURE:
      return state.merge({
        updateSupportTicketStatusFailure: true,
        updateSupportTicketStatusFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
        updateSupportTicketStatusRequesting: false,
      });

    case types.DELETE_SUPPORT_TICKET_REQUEST:
      return state.merge({
        deleteSupportTicketSuccess: false,
        deleteSupportTicketFailure: false,
        deleteSupportTicketSuccessMsg: '',
        deleteSupportTicketFailureMsg: '',
        deleteSupportTicketRequesting: true,
      });

    case types.DELETE_SUPPORT_TICKET_SUCCESS:
      return state.merge({
        deleteSupportTicketSuccess: true,
        deleteSupportTicketRequesting: false,
        deleteSupportTicketSuccessMsg:
          action.successResponse.message || 'Deleted Successfully',
      });

    case types.DELETE_SUPPORT_TICKET_FAILURE:
      return state.merge({
        deleteSupportTicketFailure: true,
        deleteSupportTicketFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
        deleteSupportTicketRequesting: false,
      });

    case types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_REQUEST:
      return state.merge({
        fetchAllSpecificTicketMessageResponse: [],
        fetchAllSpecificTicketMessageSuccess: false,
        fetchAllSpecificTicketMessageFailure: false,
        fetchAllSpecificTicketMessageSuccessMsg: '',
        fetchAllSpecificTicketMessageFailureMsg: '',
        fetchAllSpecificTicketMessageRequesting: true,
      });

    case types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_SUCCESS:
      return state.merge({
        fetchAllSpecificTicketMessageSuccess: true,
        fetchAllSpecificTicketMessageSuccessMsg: '',
        fetchAllSpecificTicketMessageRequesting: false,
        fetchAllSpecificTicketMessageResponse: action.successResponse.data,
      });

    case types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_FAILURE:
      return state.merge({
        fetchAllSpecificTicketMessageFailure: true,
        fetchAllSpecificTicketMessageFailureMsg: '',
        fetchAllSpecificTicketMessageRequesting: false,
      });

    case types.REPLY_CHAT_REQUEST:
      let prevAllMessage = state.toJS().fetchAllSpecificTicketMessageResponse;
      return state.merge({
        fetchAllSpecificTicketMessageResponse: [
          ...prevAllMessage,
          {
            id:
              prevAllMessage.length === 0
                ? 1
                : prevAllMessage[prevAllMessage.length - 1].id + 1,
            message: action.reqObj.message || '',
            ticket_id: action.reqObj.ticket_id,
            is_admin_message: false,
            is_user_message: true,
          },
        ],
        replyChatSuccess: false,
        replyChatFailure: false,
        replyChatSuccessMsg: '',
        replyChatFailureMsg: '',
        replyChatRequesting: true,
      });
    case types.REPLY_CHAT_SUCCESS:
      let removeData = state.toJS().fetchAllSpecificTicketMessageResponse;
      removeData.pop();
      return state.merge({
        fetchAllSpecificTicketMessageResponse: [
          ...removeData,
          {
            ...action.successResponse.data,
          },
        ],
        replyChatSuccess: true,
        replyChatSuccessMsg: '',
        replyChatRequesting: false,
      });
    case types.REPLY_CHAT_FAILURE:
      return state.merge({
        replyChatFailure: true,
        replyChatFailureMsg: '',
        replyChatRequesting: false,
      });

    case types.LISTEN_NEW_MESSAGE_REQUEST:
      return state.merge({
        listenNewMessageResponse: [],
        listenNewMessageSuccess: false,
        listenNewMessageFailure: false,
        listenNewMessageSuccessMsg: '',
        listenNewMessageFailureMsg: '',
        listenNewMessageRequesting: true,
      });

    case types.LISTEN_NEW_MESSAGE_SUCCESS:
      return state.merge({
        listenNewMessageResponse: [],
        fetchAllSpecificTicketMessageResponse:
          action.successResponse.data &&
          action.successResponse.data.length === 0
            ? state.toJS().fetchAllSpecificTicketMessageResponse
            : [
                ...state.toJS().fetchAllSpecificTicketMessageResponse,
                ...action.successResponse.data,
              ],
        listenNewMessageSuccess: true,
        listenNewMessageSuccessMsg: '',
        listenNewMessageRequesting: false,
      });

    case types.LISTEN_NEW_MESSAGE_FAILURE:
      return state.merge({
        listenNewMessageFailure: true,
        listenNewMessageFailureMsg: '',
        listenNewMessageRequesting: false,
      });

    case types.GET_TICKET_DETAIL_BY_ID_REQUEST:
      return state.merge({
        getTicketDetailByIdResponse: null,
        getTicketDetailByIdSuccess: false,
        getTicketDetailByIdFailure: false,
        getTicketDetailByIdSuccessMsg: '',
        getTicketDetailByIdFailureMsg: '',
        getTicketDetailByIdRequesting: true,
      });

    case types.GET_TICKET_DETAIL_BY_ID_SUCCESS:
      return state.merge({
        getTicketDetailByIdSuccess: true,
        getTicketDetailByIdSuccessMsg: '',
        getTicketDetailByIdRequesting: false,
        getTicketDetailByIdResponse: action.successResponse.data[0],
      });

    case types.GET_TICKET_DETAIL_BY_ID_FAILURE:
      return state.merge({
        getTicketDetailByIdFailure: true,
        getTicketDetailByIdFailureMsg:
          action.errorResponse.message ||
          'Oooops Something Went Wrong. Please Try Again Later',
        getTicketDetailByIdRequesting: false,
      });

    default:
      return state;
  }
}

export default helpDeskReducer;
