import { createSelector } from 'reselect';

const selectInboxDomain = state => state.get('inbox');

const makeSelectFetchAllSupportTicketSuccess = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchAllSupportTicketSuccess'),
  );

const makeSelectFetchAllSupportTicketSuccessMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchAllSupportTicketSuccessMsg'),
  );

const makeSelectFetchAllSupportTicketFailure = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchAllSupportTicketFailure'),
  );

const makeSelectLoadMoreMessageRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('loadMoreMessageRequesting'),
  );

const makeSelectAllSupportTicketCount = () =>
  createSelector(selectInboxDomain, state =>
    state.get('allSupportTicketCount'),
  );

const makeSelectFetchAllSupportTicketFailureMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchAllSupportTicketFailureMsg'),
  );

const makeSelectFetchAllSupportTicketRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchAllSupportTicketRequesting'),
  );

const makeSelectFetchAllSupportTicketResponse = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchAllSupportTicketResponse'),
  );

const makeSelectFetchTicketStatusResponse = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchTicketStatusResponse'),
  );

const makeSelectFetchTicketStatusRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchTicketStatusRequesting'),
  );

const makeSelectFetchTicketStatusSuccess = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchTicketStatusSuccess'),
  );

const makeSelectFetchTicketStatusSuccessMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchTicketStatusSuccessMsg'),
  );

const makeSelectFetchTicketStatusFailure = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchTicketStatusFailure'),
  );

const makeSelectFetchTicketStatusFailureMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchTicketStatusFailureMsg'),
  );

const makeSelectUpdateTicketStatusRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('updateTicketStatusRequesting'),
  );

const makeSelectUpdateTicketStatusSuccess = () =>
  createSelector(selectInboxDomain, state =>
    state.get('updateTicketStatusSuccess'),
  );

const makeSelectUpdateTicketStatusSuccessMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('updateTicketStatusSuccessMsg'),
  );

const makeSelectUpdateTicketStatusFailure = () =>
  createSelector(selectInboxDomain, state =>
    state.get('updateTicketStatusFailure'),
  );

const makeSelectUpdateTicketStatusFailureMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('updateTicketStatusFailureMsg'),
  );

const makeSelectDeleteTicketRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('deleteTicketRequesting'),
  );

const makeSelectDeleteTicketSuccess = () =>
  createSelector(selectInboxDomain, state => state.get('deleteTicketSuccess'));

const makeSelectDeleteTicketSuccessMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('deleteTicketSuccessMsg'),
  );

const makeSelectDeleteTicketFailure = () =>
  createSelector(selectInboxDomain, state => state.get('deleteTicketFailure'));

const makeSelectDeleteTicketFailureMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('deleteTicketFailureMsg'),
  );

const makeSelectFetchSpecificTicketAllMessageResponse = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchSpecificTicketAllMessageResponse'),
  );

const makeSelectFetchSpecificTicketAllMessageRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchSpecificTicketAllMessageRequesting'),
  );

const makeSelectFetchSpecificTicketAllMessageSuccess = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchSpecificTicketAllMessageSuccess'),
  );

const makeSelectFetchSpecificTicketAllMessageSuccessMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchSpecificTicketAllMessageSuccessMsg'),
  );

const makeSelectFetchSpecificTicketAllMessageFailure = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchSpecificTicketAllMessageFailure'),
  );

const makeSelectFetchSpecificTicketAllMessageFailureMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('fetchSpecificTicketAllMessageFailureMsg'),
  );

////////

const makeSelectReplyMessageToSpecificTicketByAdminRequesting = () =>
  createSelector(selectInboxDomain, state =>
    state.get('replyMessageToSpecificTicketByAdminRequesting'),
  );

const makeSelectReplyMessageToSpecificTicketByAdminSuccess = () =>
  createSelector(selectInboxDomain, state =>
    state.get('replyMessageToSpecificTicketByAdminSuccess'),
  );

const makeSelectReplyMessageToSpecificTicketByAdminSuccessMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('replyMessageToSpecificTicketByAdminSuccessMsg'),
  );

const makeSelectReplyMessageToSpecificTicketByAdminFailure = () =>
  createSelector(selectInboxDomain, state =>
    state.get('replyMessageToSpecificTicketByAdminFailure'),
  );

const makeSelectReplyMessageToSpecificTicketByAdminFailureMsg = () =>
  createSelector(selectInboxDomain, state =>
    state.get('replyMessageToSpecificTicketByAdminFailureMsg'),
  );

export {
  makeSelectFetchAllSupportTicketSuccess,
  makeSelectFetchAllSupportTicketSuccessMsg,
  makeSelectFetchAllSupportTicketFailure,
  makeSelectFetchAllSupportTicketFailureMsg,
  makeSelectFetchAllSupportTicketRequesting,
  makeSelectFetchAllSupportTicketResponse,
  makeSelectLoadMoreMessageRequesting,
  makeSelectAllSupportTicketCount,
  makeSelectFetchTicketStatusResponse,
  makeSelectFetchTicketStatusRequesting,
  makeSelectFetchTicketStatusSuccess,
  makeSelectFetchTicketStatusSuccessMsg,
  makeSelectFetchTicketStatusFailure,
  makeSelectFetchTicketStatusFailureMsg,
  makeSelectUpdateTicketStatusRequesting,
  makeSelectUpdateTicketStatusSuccess,
  makeSelectUpdateTicketStatusSuccessMsg,
  makeSelectUpdateTicketStatusFailure,
  makeSelectUpdateTicketStatusFailureMsg,
  makeSelectDeleteTicketRequesting,
  makeSelectDeleteTicketSuccess,
  makeSelectDeleteTicketSuccessMsg,
  makeSelectDeleteTicketFailure,
  makeSelectDeleteTicketFailureMsg,
  makeSelectFetchSpecificTicketAllMessageResponse,
  makeSelectFetchSpecificTicketAllMessageRequesting,
  makeSelectFetchSpecificTicketAllMessageSuccess,
  makeSelectFetchSpecificTicketAllMessageSuccessMsg,
  makeSelectFetchSpecificTicketAllMessageFailure,
  makeSelectFetchSpecificTicketAllMessageFailureMsg,
  makeSelectReplyMessageToSpecificTicketByAdminRequesting,
  makeSelectReplyMessageToSpecificTicketByAdminSuccess,
  makeSelectReplyMessageToSpecificTicketByAdminSuccessMsg,
  makeSelectReplyMessageToSpecificTicketByAdminFailure,
  makeSelectReplyMessageToSpecificTicketByAdminFailureMsg,
};
