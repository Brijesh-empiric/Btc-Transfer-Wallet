import action from 'utils/action';
import * as types from './constants';

export const getAllSupportTicketForUserRequest = action(
  types.GET_ALL_SUPPORT_TICKET_FOR_USER_REQUEST,
  'queryParams',
);

export const getAllSupportTicketForUserSuccess = action(
  types.GET_ALL_SUPPORT_TICKET_FOR_USER_SUCCESS,
  'successResponse',
);

export const getAllSupportTicketForUserFailure = action(
  types.GET_ALL_SUPPORT_TICKET_FOR_USER_FAILURE,
  'errorResponse',
);

export const createSupportTicketRequest = action(
  types.CREATE_SUPPORT_TICKET_REQUEST,
  'dataObj',
  'userId',
);

export const createSupportTicketSuccess = action(
  types.CREATE_SUPPORT_TICKET_SUCCESS,
  'successResponse',
);

export const createSupportTicketFailure = action(
  types.CREATE_SUPPORT_TICKET_FAILURE,
  'errorResponse',
);

export const fetchSupportTicketCategoryRequest = action(
  types.FETCH_SUPPORT_TICKET_CATEGORY_REQUEST,
);

export const fetchSupportTicketCategorySuccess = action(
  types.FETCH_SUPPORT_TICKET_CATEGORY_SUCCESS,
  'successResponse',
);

export const fetchSupportTicketCategoryFailure = action(
  types.FETCH_SUPPORT_TICKET_CATEGORY_FAILURE,
  'errorResponse',
);

export const resetCreateSupportTicketToInitialState = action(
  types.RESET_CREATE_SUPPORT_TICKET_TO_INITIAL_STATE,
);

export const fetchTicketStatusOptionRequest = action(
  types.FETCH_TICKET_STATUS_OPTION_REQUEST,
);

export const fetchTicketStatusOptionSuccess = action(
  types.FETCH_TICKET_STATUS_OPTION_SUCCESS,
  'successResponse',
);

export const fetchTicketStatusOptionFailure = action(
  types.FETCH_TICKET_STATUS_OPTION_FAILURE,
  'errorResponse',
);

export const updateSupportTicketStatusRequest = action(
  types.UPDATE_SUPPORT_TICKET_STATUS_REQUEST,
  'reqDataObj',
);

export const updateSupportTicketStatusSuccess = action(
  types.UPDATE_SUPPORT_TICKET_STATUS_SUCCESS,
  'successResponse',
);

export const updateSupportTicketStatusFailure = action(
  types.UPDATE_SUPPORT_TICKET_STATUS_FAILURE,
  'errorResponse',
);

export const deleteSupportTicketRequest = action(
  types.DELETE_SUPPORT_TICKET_REQUEST,
  'ticketId',
);

export const deleteSupportTicketSuccess = action(
  types.DELETE_SUPPORT_TICKET_SUCCESS,
  'successResponse',
);

export const deleteSupportTicketFailure = action(
  types.DELETE_SUPPORT_TICKET_FAILURE,
  'errorResponse',
);

export const fetchAllSpecificTicketMessageRequest = action(
  types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_REQUEST,
  'ticketId',
);

export const fetchAllSpecificTicketMessageSuccess = action(
  types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_SUCCESS,
  'successResponse',
);

export const fetchAllSpecificTicketMessageFailure = action(
  types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_FAILURE,
  'errorResponse',
);

export const replyChatRequest = action(types.REPLY_CHAT_REQUEST, 'reqObj');

export const replyChatSuccess = action(
  types.REPLY_CHAT_SUCCESS,
  'successResponse',
);

export const replyChatFailure = action(
  types.REPLY_CHAT_FAILURE,
  'errorResponse',
);

export const listenNewMessageRequest = action(
  types.LISTEN_NEW_MESSAGE_REQUEST,
  'reqObj',
);

export const listenNewMessageSuccess = action(
  types.LISTEN_NEW_MESSAGE_SUCCESS,
  'successResponse',
);

export const listenNewMessageFailure = action(
  types.LISTEN_NEW_MESSAGE_FAILURE,
  'errorResposne',
);

export const listenFirstMessage = action(
  types.LISTEN_FIRST_MESSAGE,
  'ticketId',
);

export const getTicketDetailByIdRequest = action(
  types.GET_TICKET_DETAIL_BY_ID_REQUEST,
  'reqObj',
);

export const getTicketDetailByIdFailure = action(
  types.GET_TICKET_DETAIL_BY_ID_FAILURE,
  'errorResponse',
);

export const getTicketDetailByIdSuccess = action(
  types.GET_TICKET_DETAIL_BY_ID_SUCCESS,
  'successResponse',
);
