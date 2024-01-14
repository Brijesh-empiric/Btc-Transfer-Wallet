import { createSelector } from 'reselect';

const selectCustomerDetailDomain = state => state.get('customerDetail');

const makeSelectGetCustomerDetailSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerDetailSuccess'),
  );

const makeSelectGetCustomerDetailFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerDetailFailure'),
  );

const makeSelectGetCustomerDetailFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerDetailFailureMsg'),
  );

const makeSelectGetCustomerDetailSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerDetailSuccessMsg'),
  );

const makeSelectGetCustomerDetailRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerDetailRequesting'),
  );

const makeSelectGetCustomerDetailResponse = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerDetailResponse'),
  );

const makeSelectGetCustomerStatusListRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerStatusListRequesting'),
  );

const makeSelectGetCustomerStatusListSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerStatusListSuccess'),
  );

const makeSelectGetCustomerStatusListSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerStatusListSuccessMsg'),
  );

const makeSelectGetCustomerStatusListFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerStatusListFailureMsg'),
  );

const makeSelectGetCustomerStatusListFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerStatusListFailure'),
  );

const makeSelectGetCustomerStatusListResponse = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('getCustomerStatusListResponse'),
  );

const makeSelectUpdateCustomerStatusRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('updateCustomerStatusRequesting'),
  );

const makeSelectUpdateCustomerStatusSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('updateCustomerStatusSuccess'),
  );

const makeSelectUpdateCustomerStatusSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('updateCustomerStatusSuccessMsg'),
  );

const makeSelectUpdateCustomerStatusFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('updateCustomerStatusFailure'),
  );

const makeSelectUpdateCustomerStatusFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('updateCustomerStatusFailureMsg'),
  );

const makeSelectImportWatchAddressSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('importWatchAddressSuccess'),
  );

const makeSelectImportWatchAddressSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('importWatchAddressSuccessMsg'),
  );

const makeSelectImportWatchAddressFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('importWatchAddressFailure'),
  );

const makeSelectImportWatchAddressFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('importWatchAddressFailureMsg'),
  );

const makeSelectImportWatchAddressRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('importWatchAddressRequesting'),
  );

const makeSelectDisable2faRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('disable2faRequesting'),
  );

const makeSelectDisable2faSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('disable2faSuccess'),
  );

const makeSelectDisable2faSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('disable2faSuccessMsg'),
  );

const makeSelectDisable2faFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('disable2faFailure'),
  );

const makeSelectDisable2faFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('disable2faFailureMsg'),
  );

const makeSelectDeleteWatchAddressRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('deleteWatchAddressRequesting'),
  );

const makeSelectDeleteWatchAddressSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('deleteWatchAddressSuccess'),
  );

const makeSelectDeleteWatchAddressSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('deleteWatchAddressSuccessMsg'),
  );

const makeSelectDeleteWatchAddressFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('deleteWatchAddressFailure'),
  );

const makeSelectDeleteWatchAddressFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('deleteWatchAddressFailureMsg'),
  );

const makeSelectFetchSupportTicketCategoryForAdminResponse = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('fetchSupportTicketCategoryForAdminResponse'),
  );

const makeSelectFetchSupportTicketCategoryForAdminRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('fetchSupportTicketCategoryForAdminRequesting'),
  );

const makeSelectFetchSupportTicketCategoryForAdminSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('fetchSupportTicketCategoryForAdminSuccess'),
  );

const makeSelectFetchSupportTicketCategoryForAdminFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('fetchSupportTicketCategoryForAdminFailure'),
  );

const makeSelectFetchSupportTicketCategoryForAdminSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('fetchSupportTicketCategoryForAdminSuccessMsg'),
  );

const makeSelectFetchSupportTicketCategoryForAdminFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('fetchSupportTicketCategoryForAdminFailureMsg'),
  );

const makeSelectCreateTicketForUserRequesting = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('createTicketForUserRequesting'),
  );

const makeSelectCreateTicketForUserSuccess = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('createTicketForUserSuccess'),
  );

const makeSelectCreateTicketForUserSuccessMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('createTicketForUserSuccessMsg'),
  );

const makeSelectCreateTicketForUserFailure = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('createTicketForUserFailure'),
  );

const makeSelectCreateTicketForUserFailureMsg = () =>
  createSelector(selectCustomerDetailDomain, state =>
    state.get('createTicketForUserFailureMsg'),
  );

export {
  makeSelectGetCustomerDetailSuccess,
  makeSelectGetCustomerDetailFailure,
  makeSelectGetCustomerDetailResponse,
  makeSelectGetCustomerDetailFailureMsg,
  makeSelectGetCustomerDetailSuccessMsg,
  makeSelectGetCustomerDetailRequesting,
  makeSelectGetCustomerStatusListSuccess,
  makeSelectGetCustomerStatusListFailure,
  makeSelectGetCustomerStatusListResponse,
  makeSelectGetCustomerStatusListSuccessMsg,
  makeSelectGetCustomerStatusListFailureMsg,
  makeSelectGetCustomerStatusListRequesting,
  makeSelectUpdateCustomerStatusSuccess,
  makeSelectUpdateCustomerStatusFailure,
  makeSelectUpdateCustomerStatusSuccessMsg,
  makeSelectUpdateCustomerStatusFailureMsg,
  makeSelectUpdateCustomerStatusRequesting,
  makeSelectImportWatchAddressSuccess,
  makeSelectImportWatchAddressFailure,
  makeSelectImportWatchAddressSuccessMsg,
  makeSelectImportWatchAddressFailureMsg,
  makeSelectImportWatchAddressRequesting,
  makeSelectDisable2faSuccess,
  makeSelectDisable2faFailure,
  makeSelectDisable2faSuccessMsg,
  makeSelectDisable2faFailureMsg,
  makeSelectDisable2faRequesting,
  makeSelectDeleteWatchAddressSuccess,
  makeSelectDeleteWatchAddressFailure,
  makeSelectDeleteWatchAddressSuccessMsg,
  makeSelectDeleteWatchAddressFailureMsg,
  makeSelectDeleteWatchAddressRequesting,
  makeSelectFetchSupportTicketCategoryForAdminSuccess,
  makeSelectFetchSupportTicketCategoryForAdminFailure,
  makeSelectFetchSupportTicketCategoryForAdminResponse,
  makeSelectFetchSupportTicketCategoryForAdminSuccessMsg,
  makeSelectFetchSupportTicketCategoryForAdminFailureMsg,
  makeSelectFetchSupportTicketCategoryForAdminRequesting,
  makeSelectCreateTicketForUserSuccess,
  makeSelectCreateTicketForUserFailure,
  makeSelectCreateTicketForUserSuccessMsg,
  makeSelectCreateTicketForUserFailureMsg,
  makeSelectCreateTicketForUserRequesting,
};
