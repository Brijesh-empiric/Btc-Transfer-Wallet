import { createSelector } from 'reselect';

const selectUpdateBasicInfo = state => state.get('updateBasicInfo');

const makeSelectSuccess = () =>
  createSelector(selectUpdateBasicInfo, state => state.get('success'));
const makeSelectResponse = () =>
  createSelector(selectUpdateBasicInfo, state => state.get('response'));
const makeSelectError = () =>
  createSelector(selectUpdateBasicInfo, state => state.get('error'));
const makeSelectRequesting = () =>
  createSelector(selectUpdateBasicInfo, state => state.get('requesting'));
const makeSelectUser = () =>
  createSelector(selectUpdateBasicInfo, state => state.get('user'));
const makeSelectGetKycInfoRequest = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('getKycInfoRequesting'),
  );
const makeSelectGetKycInfoResponse = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('getKycInfoResponse'),
  );
const makeSelectGetKycInfoSuccess = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('getKycInfoSuccess'),
  );
const makeSelectGetKycInfoFailure = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('getKycInfoFailure'),
  );
const makeSelectGetKycInfoSuccessMsg = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('getKycInfoSuccessMsg'),
  );
const makeSelectGetKycInfoFailureMsg = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('getKycInfoFailureMsg'),
  );

const makeSelectFetchDocumentTypeRequest = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('fetchDocumentTypeRequesting'),
  );

const makeSelectFetchDocumentTypeResponse = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('fetchDocumentTypeResponse'),
  );

const makeSelectFetchDocumentTypeSuccess = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('fetchDocumentTypeSuccess'),
  );

const makeSelectFetchDocumentTypeFailure = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('fetchDocumentTypeFailure'),
  );

const makeSelectFetchDocumentTypeSuccessMsg = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('fetchDocumentTypeSuccessMsg'),
  );

const makeSelectFetchDocumentTypeFailureMsg = () =>
  createSelector(selectUpdateBasicInfo, state =>
    state.get('fetchDocumentTypeFailureMsg'),
  );

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectRequesting,
  makeSelectError,
  makeSelectUser,
  makeSelectGetKycInfoRequest,
  makeSelectGetKycInfoResponse,
  makeSelectGetKycInfoSuccess,
  makeSelectGetKycInfoFailure,
  makeSelectGetKycInfoSuccessMsg,
  makeSelectGetKycInfoFailureMsg,
  makeSelectFetchDocumentTypeRequest,
  makeSelectFetchDocumentTypeResponse,
  makeSelectFetchDocumentTypeSuccess,
  makeSelectFetchDocumentTypeFailure,
  makeSelectFetchDocumentTypeSuccessMsg,
  makeSelectFetchDocumentTypeFailureMsg,
};
