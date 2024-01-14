import { createSelector } from 'reselect';

const selectHelpDeskDomain = state => state.get('helpDesk');

const makeSelectGetAllSupportTicketForUserSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getAllSupportTicketForUserSuccess'),
  );

const makeSelectGetAllSupportTicketForUserSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getAllSupportTicketForUserSuccessMsg'),
  );

const makeSelectGetAllSupportTicketForUserFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getAllSupportTicketForUserFailure'),
  );

const makeSelectGetAllSupportTicketForUserFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getAllSupportTicketForUserFailureMsg'),
  );

const makeSelectGetAllSupportTicketForUserRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getAllSupportTicketForUserRequesting'),
  );

const makeSelectGetAllSupportTicketForUserResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getAllSupportTicketForUserResponse'),
  );

const makeSelectCreateSupportTicketRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('createSupportTicketRequesting'),
  );

const makeSelectCreateSupportTicketSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('createSupportTicketSuccess'),
  );

const makeSelectCreateSupportTicketSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('createSupportTicketSuccessMsg'),
  );

const makeSelectCreateSupportTicketFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('createSupportTicketFailure'),
  );

const makeSelectCreateSupportTicketFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('createSupportTicketFailureMsg'),
  );

const makeSelectCreateSupportTicketSuccessResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('createSupportTicketSuccessResponse'),
  );

const makeSelectFetchSupportTicketCategoryResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchSupportTicketCategoryResponse'),
  );

const makeSelectFetchSupportTicketCategoryRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchSupportTicketCategoryRequesting'),
  );

const makeSelectFetchSupportTicketCategorySuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchSupportTicketCategorySuccess'),
  );

const makeSelectFetchSupportTicketCategorySuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchSupportTicketCategorySuccessMsg'),
  );

const makeSelectFetchSupportTicketCategoryFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchSupportTicketCategoryFailure'),
  );

const makeSelectFetchSupportTicketCategoryFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchSupportTicketCategoryFailureMsg'),
  );

const makeSelectFetchTicketStatusOptionResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchTicketStatusOptionResponse'),
  );

const makeSelectFetchTicketStatusOptionRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchTicketStatusOptionRequesting'),
  );

const makeSelectFetchTicketStatusOptionSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchTicketStatusOptionSuccess'),
  );

const makeSelectFetchTicketStatusOptionSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchTicketStatusOptionSuccessMsg'),
  );

const makeSelectFetchTicketStatusOptionFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchTicketStatusOptionFailure'),
  );

const makeSelectFetchTicketStatusOptionFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchTicketStatusOptionFailureMsg'),
  );

const makeSelectUpdateSupportTicketStatusRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('updateSupportTicketStatusRequesting'),
  );

const makeSelectUpdateSupportTicketStatusSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('updateSupportTicketStatusSuccess'),
  );

const makeSelectUpdateSupportTicketStatusSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('updateSupportTicketStatusSuccessMsg'),
  );

const makeSelectUpdateSupportTicketStatusFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('updateSupportTicketStatusFailure'),
  );

const makeSelectUpdateSupportTicketStatusFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('updateSupportTicketStatusFailureMsg'),
  );

const makeSelectDeleteSupportTicketRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('deleteSupportTicketRequesting'),
  );

const makeSelectDeleteSupportTicketSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('deleteSupportTicketSuccess'),
  );

const makeSelectDeleteSupportTicketSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('deleteSupportTicketSuccessMsg'),
  );

const makeSelectDeleteSupportTicketFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('deleteSupportTicketFailure'),
  );

const makeSelectDeleteSupportTicketFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('deleteSupportTicketFailureMsg'),
  );

// // /// /// /// / //

const makeSelectFetchAllSpecificTicketMessageResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchAllSpecificTicketMessageResponse'),
  );

const makeSelectFetchAllSpecificTicketMessageRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchAllSpecificTicketMessageRequesting'),
  );

const makeSelectFetchAllSpecificTicketMessageSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchAllSpecificTicketMessageSuccess'),
  );

const makeSelectFetchAllSpecificTicketMessageSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchAllSpecificTicketMessageSuccessMsg'),
  );

const makeSelectFetchAllSpecificTicketMessageFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchAllSpecificTicketMessageFailure'),
  );

const makeSelectFetchAllSpecificTicketMessageFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('fetchAllSpecificTicketMessageFailureMsg'),
  );

// / / / / / / / / /

const makeSelectReplyChatRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('replyChatRequesting'),
  );

const makeSelectReplyChatSuccess = () =>
  createSelector(selectHelpDeskDomain, state => state.get('replyChatSuccess'));

const makeSelectReplyChatSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('replyChatSuccessMsg'),
  );

const makeSelectReplyChatFailure = () =>
  createSelector(selectHelpDeskDomain, state => state.get('replyChatFailure'));

const makeSelectReplyChatFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('replyChatFailureMsg'),
  );

/// / / / / / / / /

const makeSelectListenNewMessageResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('listenNewMessageResponse'),
  );

const makeSelectListenNewMessageRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('listenNewMessageRequesting'),
  );

const makeSelectListenNewMessageSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('listenNewMessageSuccess'),
  );

const makeSelectListenNewMessageSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('listenNewMessageSuccessMsg'),
  );

const makeSelectListenNewMessageFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('listenNewMessageFailure'),
  );

const makeSelectListenNewMessageFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('listenNewMessageFailureMsg'),
  );

/// / / / / // / / /

const makeSelectGetTicketDetailByIdRequesting = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getTicketDetailByIdRequesting'),
  );

const makeSelectGetTicketDetailByIdSuccess = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getTicketDetailByIdSuccess'),
  );

const makeSelectGetTicketDetailByIdSuccessMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getTicketDetailByIdSuccessMsg'),
  );

const makeSelectGetTicketDetailByIdFailure = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getTicketDetailByIdFailure'),
  );

const makeSelectGetTicketDetailByIdFailureMsg = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getTicketDetailByIdFailureMsg'),
  );

const makeSelectGetTicketDetailByIdResponse = () =>
  createSelector(selectHelpDeskDomain, state =>
    state.get('getTicketDetailByIdResponse'),
  );

export {
  makeSelectCreateSupportTicketSuccess,
  makeSelectCreateSupportTicketFailure,
  makeSelectCreateSupportTicketSuccessMsg,
  makeSelectCreateSupportTicketFailureMsg,
  makeSelectCreateSupportTicketRequesting,
  makeSelectCreateSupportTicketSuccessResponse,
  makeSelectGetAllSupportTicketForUserSuccess,
  makeSelectGetAllSupportTicketForUserFailure,
  makeSelectGetAllSupportTicketForUserResponse,
  makeSelectGetAllSupportTicketForUserSuccessMsg,
  makeSelectGetAllSupportTicketForUserFailureMsg,
  makeSelectGetAllSupportTicketForUserRequesting,
  makeSelectFetchSupportTicketCategorySuccess,
  makeSelectFetchSupportTicketCategoryFailure,
  makeSelectFetchSupportTicketCategoryResponse,
  makeSelectFetchSupportTicketCategorySuccessMsg,
  makeSelectFetchSupportTicketCategoryFailureMsg,
  makeSelectFetchSupportTicketCategoryRequesting,
  makeSelectFetchTicketStatusOptionSuccess,
  makeSelectFetchTicketStatusOptionFailure,
  makeSelectFetchTicketStatusOptionResponse,
  makeSelectFetchTicketStatusOptionSuccessMsg,
  makeSelectFetchTicketStatusOptionFailureMsg,
  makeSelectFetchTicketStatusOptionRequesting,
  makeSelectUpdateSupportTicketStatusSuccess,
  makeSelectUpdateSupportTicketStatusFailure,
  makeSelectUpdateSupportTicketStatusSuccessMsg,
  makeSelectUpdateSupportTicketStatusFailureMsg,
  makeSelectUpdateSupportTicketStatusRequesting,
  makeSelectDeleteSupportTicketSuccess,
  makeSelectDeleteSupportTicketFailure,
  makeSelectDeleteSupportTicketSuccessMsg,
  makeSelectDeleteSupportTicketFailureMsg,
  makeSelectDeleteSupportTicketRequesting,
  makeSelectFetchAllSpecificTicketMessageResponse,
  makeSelectFetchAllSpecificTicketMessageRequesting,
  makeSelectFetchAllSpecificTicketMessageSuccess,
  makeSelectFetchAllSpecificTicketMessageSuccessMsg,
  makeSelectFetchAllSpecificTicketMessageFailure,
  makeSelectFetchAllSpecificTicketMessageFailureMsg,
  makeSelectReplyChatRequesting,
  makeSelectReplyChatSuccess,
  makeSelectReplyChatSuccessMsg,
  makeSelectReplyChatFailure,
  makeSelectReplyChatFailureMsg,
  makeSelectListenNewMessageResponse,
  makeSelectListenNewMessageRequesting,
  makeSelectListenNewMessageSuccess,
  makeSelectListenNewMessageSuccessMsg,
  makeSelectListenNewMessageFailure,
  makeSelectListenNewMessageFailureMsg,
  makeSelectGetTicketDetailByIdSuccess,
  makeSelectGetTicketDetailByIdFailure,
  makeSelectGetTicketDetailByIdResponse,
  makeSelectGetTicketDetailByIdSuccessMsg,
  makeSelectGetTicketDetailByIdFailureMsg,
  makeSelectGetTicketDetailByIdRequesting,
};
