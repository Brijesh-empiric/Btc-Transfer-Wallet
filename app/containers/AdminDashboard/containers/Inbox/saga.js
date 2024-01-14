import * as types from './constants';
import { takeLatest, fork } from 'redux-saga/effects';
import {
  deleteTicketSuccess,
  deleteTicketFailure,
  fetchTicketStatusSuccess,
  fetchTicketStatusFailure,
  updateTicketStatusSuccess,
  updateTicketStatusFailure,
  fetchAllSupportTicketSuccess,
  fetchAllSupportTicketFailure,
  fetchSpecificTicketAllMessageSuccess,
  fetchSpecificTicketAllMessageFailure,
  replyMessageToSpecificTicketByAdminSuccess,
  replyMessageToSpecificTicketByAdminFailure,
  getNewMessageSuccess,
  getNewMessageFailure,
} from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* fetchAllSupportTicketGenerator(action) {
  const {
    queryParams: { email, sort, perpage, currentpage, status },
  } = action;
  const token = getToken();

  yield fork(
    API.get(
      `cms/support_ticket/?email=${email}&status=${status}&sort=${sort}&perPage=${perpage}&currentPage=${currentpage}`,
      fetchAllSupportTicketSuccess,
      fetchAllSupportTicketFailure,
      token,
    ),
  );
}

function* fetchTicketStatusGenerator() {
  yield fork(
    API.get(
      `ticket_status_options`,
      fetchTicketStatusSuccess,
      fetchTicketStatusFailure,
      '',
    ),
  );
}

function* updateTicketStatusGenerator(action) {
  const token = getToken();
  const { reqDataObj } = action;
  yield fork(
    API.post(
      `change-ticket-status/`,
      updateTicketStatusSuccess,
      updateTicketStatusFailure,
      reqDataObj,
      token,
    ),
  );
}

function* deleteTicketGenerator(action) {
  const token = getToken();
  const { ticketId } = action;
  yield fork(
    API.delete(
      `change-ticket-status/${ticketId}`,
      deleteTicketSuccess,
      deleteTicketFailure,
      token,
    ),
  );
}

function* fetchSpecificTicketAllMessageGenerator(action) {
  const token = getToken();
  const { ticketId } = action;
  yield fork(
    API.get(
      `ticket-messages/${ticketId}`,
      fetchSpecificTicketAllMessageSuccess,
      fetchSpecificTicketAllMessageFailure,
      token,
    ),
  );
}

function* replyMessageToSpecificTicketByAdminGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.post(
      `ticket-messages/`,
      replyMessageToSpecificTicketByAdminSuccess,
      replyMessageToSpecificTicketByAdminFailure,
      reqObj,
      token,
    ),
  );
}

function* getNewMessageGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.get(
      `get-new-ticket-messages?message_id=${reqObj.message_id}&ticket_id=${reqObj.ticket_id}`,
      getNewMessageSuccess,
      getNewMessageFailure,
      token,
    ),
  );
}

// Individual exports for testing
export default function* inboxSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    types.FETCH_ALL_SUPPORT_TICKET_REQUEST,
    fetchAllSupportTicketGenerator,
  );
  yield takeLatest(
    types.LOAD_MORE_MESSAGE_REQUEST,
    fetchAllSupportTicketGenerator,
  );
  yield takeLatest(
    types.FETCH_TICKET_STATUS_REQUEST,
    fetchTicketStatusGenerator,
  );
  yield takeLatest(
    types.UPDATE_TICKET_STATUS_REQUEST,
    updateTicketStatusGenerator,
  );
  yield takeLatest(types.DELETE_TICKET_REQUEST, deleteTicketGenerator);
  yield takeLatest(
    types.FETCH_SPECIFIC_TICKET_ALL_MESSAGE_REQUEST,
    fetchSpecificTicketAllMessageGenerator,
  );
  yield takeLatest(
    types.REPLY_MESSAGE_TO_SPECIFIC_TICKET_BY_ADMIN_REQUEST,
    replyMessageToSpecificTicketByAdminGenerator,
  );
  yield takeLatest(types.GET_NEW_MESSAGE_REQUEST, getNewMessageGenerator);
  yield takeLatest(
    types.LISTEN_CLIENT_FIRST_MESSAGE,
    fetchSpecificTicketAllMessageGenerator,
  );
}
