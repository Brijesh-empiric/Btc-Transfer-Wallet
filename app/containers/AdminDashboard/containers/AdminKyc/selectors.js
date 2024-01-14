import { createSelector } from 'reselect';

const selectAdminKycDomain = state => state.get('adminKyc');

const makeSelectGetAllKycListSuccess = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getAllKycListSuccess'),
  );
const makeSelectGetAllKycListFailure = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getAllKycListFailure'),
  );
const makeSelectGetAllKycListSuccessMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getAllKycListSuccessMsg'),
  );
const makeSelectGetAllKycListFailureMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getAllKycListFailureMsg'),
  );
const makeSelectGetAllKycListRequesting = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getAllKycListRequesting'),
  );
const makeSelectGetAllKycListResponse = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getAllKycListResponse'),
  );

const makeSelectGetKycStatusSuccess = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycStatusSuccess'),
  );
const makeSelectGetKycStatusFailure = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycStatusFailure'),
  );
const makeSelectGetKycStatusSuccessMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycStatusSuccessMsg'),
  );
const makeSelectGetKycStatusFailureMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycStatusFailureMsg'),
  );
const makeSelectGetKycStatusRequesting = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycStatusRequesting'),
  );
const makeSelectGetKycStatusResponse = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycStatusResponse'),
  );

const makeSelectGetKycByIdSuccess = () =>
  createSelector(selectAdminKycDomain, state => state.get('getKycByIdSuccess'));
const makeSelectGetKycByIdFailure = () =>
  createSelector(selectAdminKycDomain, state => state.get('getKycByIdFailure'));
const makeSelectGetKycByIdSuccessMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycByIdSuccessMsg'),
  );
const makeSelectGetKycByIdFailureMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycByIdFailureMsg'),
  );
const makeSelectGetKycByIdRequesting = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycByIdRequesting'),
  );
const makeSelectGetKycByIdResponse = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('getKycByIdResponse'),
  );

const makeSelectChangeKycStatusSuccess = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('changeKycStatusSuccess'),
  );
const makeSelectChangeKycStatusFailure = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('changeKycStatusFailure'),
  );
const makeSelectChangeKycStatusSuccessMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('changeKycStatusSuccessMsg'),
  );
const makeSelectChangeKycStatusFailureMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('changeKycStatusFailureMsg'),
  );
const makeSelectChangeKycStatusRequesting = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('changeKycStatusRequesting'),
  );

const makeSelectDeleteKycRequesting = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('deleteKycRequesting'),
  );

const makeSelectDeleteKycSuccess = () =>
  createSelector(selectAdminKycDomain, state => state.get('deleteKycSuccess'));

const makeSelectDeleteKycSuccessMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('deleteKycSuccessMsg'),
  );

const makeSelectDeleteKycFailure = () =>
  createSelector(selectAdminKycDomain, state => state.get('deleteKycFailure'));

const makeSelectDeleteKycFailureMsg = () =>
  createSelector(selectAdminKycDomain, state =>
    state.get('deleteKycFailureMsg'),
  );

export {
  makeSelectGetAllKycListSuccess,
  makeSelectGetAllKycListFailure,
  makeSelectGetAllKycListSuccessMsg,
  makeSelectGetAllKycListFailureMsg,
  makeSelectGetAllKycListRequesting,
  makeSelectGetAllKycListResponse,
  makeSelectGetKycStatusSuccess,
  makeSelectGetKycStatusFailure,
  makeSelectGetKycStatusSuccessMsg,
  makeSelectGetKycStatusFailureMsg,
  makeSelectGetKycStatusRequesting,
  makeSelectGetKycStatusResponse,
  makeSelectGetKycByIdSuccess,
  makeSelectGetKycByIdFailure,
  makeSelectGetKycByIdSuccessMsg,
  makeSelectGetKycByIdFailureMsg,
  makeSelectGetKycByIdRequesting,
  makeSelectGetKycByIdResponse,
  makeSelectChangeKycStatusSuccess,
  makeSelectChangeKycStatusFailure,
  makeSelectChangeKycStatusSuccessMsg,
  makeSelectChangeKycStatusFailureMsg,
  makeSelectChangeKycStatusRequesting,
  makeSelectDeleteKycRequesting,
  makeSelectDeleteKycSuccess,
  makeSelectDeleteKycSuccessMsg,
  makeSelectDeleteKycFailure,
  makeSelectDeleteKycFailureMsg,
};
