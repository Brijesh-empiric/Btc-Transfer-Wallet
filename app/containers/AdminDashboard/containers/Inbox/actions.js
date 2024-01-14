/*
 *
 * Inbox actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const fetchAllSupportTicketRequest = action(
  types.FETCH_ALL_SUPPORT_TICKET_REQUEST,
  'queryParams',
);

export const fetchAllSupportTicketSuccess = action(
  types.FETCH_ALL_SUPPORT_TICKET_SUCCESS,
  'successResponse',
);

export const fetchAllSupportTicketFailure = action(
  types.FETCH_ALL_SUPPORT_TICKET_FAILURE,
  'errorResponse',
);

export const loadMoreMessageRequest = action(
  types.LOAD_MORE_MESSAGE_REQUEST,
  'queryParams',
);

export const deleteTicketRequest = action(
  types.DELETE_TICKET_REQUEST,
  'ticketId',
);

export const deleteTicketSuccess = action(
  types.DELETE_TICKET_SUCCESS,
  'successResponse',
);

export const deleteTicketFailure = action(
  types.DELETE_TICKET_FAILURE,
  'errorResponse',
);

export const updateTicketStatusRequest = action(
  types.UPDATE_TICKET_STATUS_REQUEST,
  'reqDataObj',
);

export const updateTicketStatusSuccess = action(
  types.UPDATE_TICKET_STATUS_SUCCESS,
  'successResponse',
);

export const updateTicketStatusFailure = action(
  types.UPDATE_TICKET_STATUS_FAILURE,
  'errorResponse',
);

export const fetchTicketStatusRequest = action(
  types.FETCH_TICKET_STATUS_REQUEST,
);

export const fetchTicketStatusSuccess = action(
  types.FETCH_TICKET_STATUS_SUCCESS,
  'successResponse',
);

export const fetchTicketStatusFailure = action(
  types.FETCH_TICKET_STATUS_FAILURE,
  'errorResponse',
);

export const fetchSpecificTicketAllMessageRequest = action(
  types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_REQUEST,
  'ticketId',
);

export const fetchSpecificTicketAllMessageSuccess = action(
  types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_SUCCESS,
  'successResponse',
);

export const fetchSpecificTicketAllMessageFailure = action(
  types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_FAILURE,
  'errorResponse',
);

export const replyMessageToSpecificTicketByAdminRequest = action(
  types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_REQUEST,
  'reqObj',
);

export const replyMessageToSpecificTicketByAdminSuccess = action(
  types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_SUCCESS,
  'successResponse',
);

export const replyMessageToSpecificTicketByAdminFailure = action(
  types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_FAILURE,
  'errorResponse',
);

export const getNewMessageRequest = action(
  types.GET_NEW_MESSAGE_REQUEST,
  'reqObj',
);

export const getNewMessageSuccess = action(
  types.GET_NEW_MESSAGE_SUCCESS,
  'successResponse',
);

export const getNewMessageFailure = action(
  types.GET_NEW_MESSAGE_FAILURE,
  'errorResponse',
);

export const listenClientFirstMessage = action(
  types.LISTEN_CLIENT_FIRST_MESSAGE,
  'ticketId',
);
