import { createSelector } from 'reselect';

/**
 * Direct selector to the addressManagement state domain
 */

const selectAddressManagementDomain = state => state.get('addressManagement');

const makeSelectFetchAllDeletedAddressRequesting = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('fetchAllDeletedAddressRequesting'),
  );

const makeSelectFetchAllDeletedAddressResponse = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('fetchAllDeletedAddressResponse'),
  );

const makeSelectFetchAllDeletedAddressSuccess = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('fetchAllDeletedAddressSuccess'),
  );

const makeSelectFetchAllDeletedAddressSuccessMsg = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('fetchAllDeletedAddressSuccessMsg'),
  );

const makeSelectFetchAllDeletedAddressFailureMsg = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('fetchAllDeletedAddressFailureMsg'),
  );

const makeSelectFetchAllDeletedAddressFailure = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('fetchAllDeletedAddressFailure'),
  );

const makeSelectRecoverAddressRequesting = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('recoverAddressRequesting'),
  );

const makeSelectRecoverAddressSuccess = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('recoverAddressSuccess'),
  );

const makeSelectRecoverAddressSuccessMsg = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('recoverAddressSuccessMsg'),
  );

const makeSelectRecoverAddressFailureMsg = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('recoverAddressFailureMsg'),
  );

const makeSelectRecoverAddressFailure = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('recoverAddressFailure'),
  );

const makeSelectUpdateAddressBalanceRequesting = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('updateAddressBalanceRequesting'),
  );

const makeSelectUpdateAddressBalanceSuccess = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('updateAddressBalanceSuccess'),
  );

const makeSelectUpdateAddressBalanceSuccessMsg = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('updateAddressBalanceSuccessMsg'),
  );

const makeSelectUpdateAddressBalanceFailureMsg = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('updateAddressBalanceFailureMsg'),
  );

const makeSelectUpdateAddressBalanceFailure = () =>
  createSelector(selectAddressManagementDomain, state =>
    state.get('updateAddressBalanceFailure'),
  );

export {
  makeSelectRecoverAddressSuccess,
  makeSelectRecoverAddressFailure,
  makeSelectRecoverAddressSuccessMsg,
  makeSelectRecoverAddressFailureMsg,
  makeSelectRecoverAddressRequesting,
  makeSelectFetchAllDeletedAddressSuccess,
  makeSelectFetchAllDeletedAddressFailure,
  makeSelectFetchAllDeletedAddressResponse,
  makeSelectFetchAllDeletedAddressRequesting,
  makeSelectFetchAllDeletedAddressSuccessMsg,
  makeSelectFetchAllDeletedAddressFailureMsg,
  makeSelectUpdateAddressBalanceSuccess,
  makeSelectUpdateAddressBalanceFailure,
  makeSelectUpdateAddressBalanceSuccessMsg,
  makeSelectUpdateAddressBalanceFailureMsg,
  makeSelectUpdateAddressBalanceRequesting,
};
