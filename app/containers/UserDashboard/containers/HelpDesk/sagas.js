import * as types from './constants';
import { takeLatest, fork } from 'redux-saga/effects';
import {
  replyChatFailure,
  replyChatSuccess,
  listenNewMessageFailure,
  listenNewMessageSuccess,
  getTicketDetailByIdSuccess,
  getTicketDetailByIdFailure,
  createSupportTicketSuccess,
  createSupportTicketFailure,
  deleteSupportTicketSuccess,
  deleteSupportTicketFailure,
  fetchTicketStatusOptionSuccess,
  fetchTicketStatusOptionFailure,
  updateSupportTicketStatusSuccess,
  updateSupportTicketStatusFailure,
  fetchSupportTicketCategorySuccess,
  fetchSupportTicketCategoryFailure,
  getAllSupportTicketForUserSuccess,
  getAllSupportTicketForUserFailure,
  fetchAllSpecificTicketMessageSuccess,
  fetchAllSpecificTicketMessageFailure,
} from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';

function* getAllSupportTicketForUserGenerator(action) {
  const {
    queryParams: { status, perpage, currentpage },
  } = action;
  const token = getToken();

  yield fork(
    API.get(
      `support_ticket/?status=${status}&perPage=${perpage}&currentPage=${currentpage}`,
      getAllSupportTicketForUserSuccess,
      getAllSupportTicketForUserFailure,
      token,
    ),
  );
}

function* createSupportTicketGenerator(action) {
  const token = getToken();
  const { dataObj, userId } = action;

  yield fork(
    API.post(
      `support_ticket/${userId}`,
      createSupportTicketSuccess,
      createSupportTicketFailure,
      dataObj,
      token,
    ),
  );
}

function* fetchSupportTicketCategoryGenerator() {
  const token = getToken();

  yield fork(
    API.get(
      `support_ticket_category`,
      fetchSupportTicketCategorySuccess,
      fetchSupportTicketCategoryFailure,
      token,
    ),
  );
}

function* fetchTicketStatusOptionGenerator() {
  yield fork(
    API.get(
      `ticket_status_options`,
      fetchTicketStatusOptionSuccess,
      fetchTicketStatusOptionFailure,
      '',
    ),
  );
}

function* updateSupportTicketStatusGenerator(action) {
  const token = getToken();
  const { reqDataObj } = action;
  yield fork(
    API.post(
      `change-ticket-status/`,
      updateSupportTicketStatusSuccess,
      updateSupportTicketStatusFailure,
      reqDataObj,
      token,
    ),
  );
}

function* deleteSupportTicketGenerator(action) {
  const token = getToken();
  const { ticketId } = action;
  yield fork(
    API.delete(
      `change-ticket-status/${ticketId}`,
      deleteSupportTicketSuccess,
      deleteSupportTicketFailure,
      token,
    ),
  );
}

function* fetchAllSpecificTicketMessageGenerator(action) {
  const token = getToken();
  const { ticketId } = action;
  yield fork(
    API.get(
      `ticket-messages/${ticketId}`,
      fetchAllSpecificTicketMessageSuccess,
      fetchAllSpecificTicketMessageFailure,
      token,
    ),
  );
}

function* replyChatGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.post(
      `ticket-messages/`,
      replyChatSuccess,
      replyChatFailure,
      reqObj,
      token,
    ),
  );
}

function* listenNewMessageGenerator(action) {
  const token = getToken();
  const { reqObj } = action;
  yield fork(
    API.get(
      `get-new-ticket-messages?message_id=${reqObj.message_id}&ticket_id=${reqObj.ticket_id}`,
      listenNewMessageSuccess,
      listenNewMessageFailure,
      token,
    ),
  );
}

function* getTicketDetailByIdGenerator(action) {
  const token = getToken();
  const { ticketId } = action.reqObj;
  yield fork(
    API.get(
      `cms/support_ticket/?status=&email=&id=${ticketId}`,
      getTicketDetailByIdSuccess,
      getTicketDetailByIdFailure,
      token,
    ),
  );
}

export default function* helpDeskSaga() {
  yield takeLatest(
    types.FETCH_SUPPORT_TICKET_CATEGORY_REQUEST,
    fetchSupportTicketCategoryGenerator,
  );
  yield takeLatest(
    types.GET_ALL_SUPPORT_TICKET_FOR_USER_REQUEST,
    getAllSupportTicketForUserGenerator,
  );
  yield takeLatest(
    types.CREATE_SUPPORT_TICKET_REQUEST,
    createSupportTicketGenerator,
  );
  yield takeLatest(
    types.FETCH_TICKET_STATUS_OPTION_REQUEST,
    fetchTicketStatusOptionGenerator,
  );
  yield takeLatest(
    types.UPDATE_SUPPORT_TICKET_STATUS_REQUEST,
    updateSupportTicketStatusGenerator,
  );
  yield takeLatest(
    types.DELETE_SUPPORT_TICKET_REQUEST,
    deleteSupportTicketGenerator,
  );
  yield takeLatest(
    types.FETCH_ALL_SPECIFIC_TICKET_MESSAGE_REQUEST,
    fetchAllSpecificTicketMessageGenerator,
  );
  yield takeLatest(types.REPLY_CHAT_REQUEST, replyChatGenerator);
  yield takeLatest(types.LISTEN_NEW_MESSAGE_REQUEST, listenNewMessageGenerator);
  yield takeLatest(
    types.LISTEN_FIRST_MESSAGE,
    fetchAllSpecificTicketMessageGenerator,
  );
  yield takeLatest(
    types.GET_TICKET_DETAIL_BY_ID_REQUEST,
    getTicketDetailByIdGenerator,
  );
}
